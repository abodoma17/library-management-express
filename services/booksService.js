const db = require("../models");
const ValidationError = require("../errors/validationError");
const InstanceNotFoundError = require("../errors/instanceNotFoundError");
const { Op } = require("sequelize");

exports.createBook = async (body) => {
    const { title, isbn, shelf_location, available_quantity, author_id } = body;

    if (await isISBNExists(isbn)) {
        throw new ValidationError("Book with this ISBN already exists");
    }

    if (!(await isAuthorExists(author_id))) {
        throw new ValidationError("Invalid Author ID");
    }

    return await db.Book.create({
        title,
        isbn,
        author_id,
        shelf_location,
        available_quantity
    });
};

exports.getBooksQueryFilters = (queryParams) => {
    let conditions = {};

    if(!queryParams) {
        return conditions;
    }

    if(queryParams.title) {
        conditions.title = {
            [Op.like]: `%${queryParams.title}%`
        };
    }

    if(queryParams.isbn) {
        conditions.isbn = {
            [Op.like]: `%${queryParams.isbn}%`
        }
    }

    return conditions;
};

exports.getAuthorsAssocQueryFilters = (queryParams) => {
    let conditions = {};

    if(!queryParams) {
        return conditions;
    }

    if(queryParams.author_name) {
        conditions.name = {
            [Op.like]: `%${queryParams.author_name}%`
        }
    }

    return conditions;
};

exports.getBookById = async (bookID) => {
    if(!bookID) {
        return null;
    }

    return await db.Book.findOne({
        include: [
            {
                model: db.Author,
                as: 'author',
                attributes: ['name'],
            }
        ],
        where: {
            id: bookID
        }
    });
};

exports.updateBook = async (bookID, body) => {
    let book = await this.getBookById(bookID);

    if(!book) {
        throw new InstanceNotFoundError();
    }

    if (body.isbn && await isISBNExists(body.isbn, bookID)) {
        throw new ValidationError("Book with this ISBN already exists");
    }

    if (body.author_id && !(await isAuthorExists(body.author_id))) {
        throw new ValidationError("Invalid Author ID");
    }

    book.set(body);

    await book.save();

    return book;
}

async function isISBNExists(isbn, bookID=0) {
    if(!isbn) {
        return false;
    }
    const existingBook = await db.Book.findOne({
        where: {
            isbn,
            [Op.not]: {
                id: bookID
            }
        }
    });
    return !!existingBook;
}

async function isAuthorExists(authorId) {
    if(!authorId) {
        return false;
    }
    const author = await db.Author.findOne({ where: { id: authorId } });
    return !!author;
}