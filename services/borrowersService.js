const db = require("../models");
const ValidationError = require("../errors/validationError");
const InstanceNotFoundError = require("../errors/instanceNotFoundError");
const {Op} = require("sequelize");

exports.getBorrowerById = async (borrowerID = 0) => {
    if (!borrowerID) {
        return null;
    }

    return await db.Borrower.findOne({
        where: {
            id: borrowerID
        }
    });
};

exports.createBorrower = async (body) => {
    const {name, email} = body;

    if (await isDuplicateEmail(email)) {
        throw new ValidationError('Email already exists');
    }

    return await db.Borrower.create({
        name,
        email
    });
};

exports.updateBorrower = async (borrowerID, body) => {
    const { email } = body;
    let borrower = await this.getBorrowerById(borrowerID);

    if (!borrower) {
        throw new InstanceNotFoundError();
    }

    if (email && await isDuplicateEmail(email, borrowerID)) {
        throw new ValidationError('Email already exists');
    }

    borrower.set(body);
    await borrower.save();

    return borrower;
}

async function isDuplicateEmail(email, borrowerID = 0) {
    if(!email) {
        return false;
    }

    const borrower = await db.Borrower.findOne({
        where: {
            email,
            [Op.not]: {
                id: borrowerID
            }
        }
    });

    return !!borrower;
}