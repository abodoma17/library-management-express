const db = require("../models");
const ValidationError = require("../errors/validationError");
const InstanceNotFoundError = require("../errors/instanceNotFoundError");
const {Op} = require("sequelize");

exports.getAllBorrowers = async (queryParams) => {
    const conditions = _getBorrowerQueryConditions(queryParams);
    return await db.Borrower.findAll({
        where: conditions
    });
};

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

_getBorrowerQueryConditions = (queryParams = {}) => {
    let conditions = {};

    if(!queryParams) {
        return conditions;
    }

    if (queryParams.name) {
        conditions.name = {
           [Op.like]: `%${queryParams.name}%`
        }
    }

    if (queryParams.email) {
        conditions.email = {
            [Op.like]: `%${queryParams.email}%`
        }
    }

    return conditions;
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