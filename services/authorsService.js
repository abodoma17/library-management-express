const db = require("../models");
const ValidationError = require("../errors/validationError");
const InstanceNotFoundError = require("../errors/instanceNotFoundError");
const {Op} = require("sequelize");

exports.createAuthor = async (body) => {
    const {name} = body;

    if (await isNameExists(name)) {
        throw new ValidationError('Author with this name already exists');
    }

    return await db.Author.create({
        name
    });
};

exports.getAuthorById = async (authorID, includeBooks = true) => {
    if (!authorID) {
        return null;
    }

    let includes = [];

    if(includeBooks) {
        includes.push({
            model: db.Book,
            as: "books",
            attributes: [
                'title',
                'isbn'
            ]
        });
    }

    return await db.Author.findOne({
        where: {
            id: authorID
        },
        include: includes
    });
}

exports.updateAuthor = async (authorID, body) => {
    const { name } = body;
    let author = await this.getAuthorById(authorID, false);

    if (!author) {
        throw new InstanceNotFoundError();
    }

    if (name && await isNameExists(name, authorID)) {
        throw new ValidationError('Author with this name already exists');
    }

    author.set(body);

    await author.save();

    return author;
}

async function isNameExists(name, authorID = 0) {
    const existingAuthor = await db.Author.findOne({
        where: {
            name,
            [Op.not]: {
                id: authorID
            }
        }
    });

    return !!existingAuthor;
}