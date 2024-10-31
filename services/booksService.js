const db = require("../models");
const ValidationError = require("../errors/validationError");
const { Op } = require("sequelize");

exports.createBook = async (body) => {
    const { title, isbn, shelfLocation, availableQuantity, author_id } = body;

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
        'shelf_location': shelfLocation,
        'available_quantity': availableQuantity
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


async function isISBNExists(isbn) {
    const existingBook = await db.Book.findOne({ where: { isbn } });
    return !!existingBook;
}

async function isAuthorExists(authorId) {
    const author = await db.Author.findOne({ where: { id: authorId } });
    return !!author;
}