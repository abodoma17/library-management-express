const db = require("../models");
const ValidationError = require("../errors/validationError");

exports.createAuthor = async (body) => {
    const { name } = body;

    if(await isNameExists(name)) {
        throw new ValidationError('Author with this name already exists');
    }

    return await db.Author.create({
        name
    });
};

async function isNameExists (name) {
    const existingAuthor = await db.Author.findOne({
        where: {
            name
        }
    });

    return !!existingAuthor;
}