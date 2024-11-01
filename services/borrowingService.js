const db = require("../models");
const ValidationError = require("../errors/validationError");
const InstanceNotFoundError = require("../errors/instanceNotFoundError");
const {Op} = require("sequelize");
const booksService = require("./booksService");
const borrowerService = require("./borrowersService");
const utils = require("../utils/utils");
const {getBookById} = require("./booksService");
const borrowingService = require("./booksService");

exports.checkoutBook = async (borrowerID, bookID, body) => {
    let currentDate = utils.formatDateToDB(new Date());

    if(body.due_date < currentDate) {
        throw new ValidationError('Due date can not be in the past')
    }

    const borrower = await borrowerService.getBorrowerById(borrowerID);

    if(!borrower) {
        throw new ValidationError('Borrower not found');
    }

    const book = await booksService.getBookById(bookID);

    if(!book) {
        throw new ValidationError('Book not found');
    }

    if(book.available_quantity === 0) {
        throw new ValidationError('There are no available copies of this book');
    }

    const overdueBooks = await this.getBorrowerBorrowedBooks(borrowerID, true);

    if(overdueBooks.length) {
        throw new ValidationError('Borrower currently has overdue books');
    }

    const transaction = await db.sequelize.transaction();

    try {
        const borrowedBookRecord = await db.BookBorrower.create({
            borrower_id: borrowerID,
            book_id: bookID,
            due_date: body.due_date,
        }, { transaction });

        let newBookQuantity = book.available_quantity - 1

        await book.update({
            available_quantity: newBookQuantity,
        }, { transaction });

        await transaction.commit();

        let bookData = {
            title: book.title,
            isbn: book.isbn,
            available_quantity: book.available_quantity
        }

        let borrowerData = {
            name: borrower.name,
            email: borrower.email
        }

        return {
            ...borrowedBookRecord.get(),
            book: bookData,
            borrower: borrowerData,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

exports.returnBook = async (borrowerID, bookID) => {
    const borrower = await borrowerService.getBorrowerById(borrowerID);

    if(!borrower) {
        throw new ValidationError('Borrower not found');
    }

    const book = await booksService.getBookById(bookID);

    if(!book) {
        throw new ValidationError('Book not found');
    }

    const borrowedBookRecord = await db.BookBorrower.findOne({
       where: {
           borrower_id: borrowerID,
           book_id: bookID,
           is_returned: false
       }
    });

    if(!borrowedBookRecord) {
        throw new ValidationError('Borrower does not have this book borrowed');
    }

    const transaction = await db.sequelize.transaction();

    try {
        await borrowedBookRecord.update({
            is_returned: true
        }, { transaction });

        await book.update({
            available_quantity: book.available_quantity + 1,
        }, { transaction });

        await transaction.commit();

        let bookData = {
            title: book.title,
            isbn: book.isbn,
            available_quantity: book.available_quantity
        }

        let borrowerData = {
            name: borrower.name,
            email: borrower.email
        }

        return {
            ...borrowedBookRecord.get(),
            book: bookData,
            borrower: borrowerData,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

exports.getBorrowerBorrowedBooks = async (borrowerID = 0, onlyOverdue = false, includeBook = true, includeBorrower = false) => {
    if(!borrowerID) {
        return null;
    }

    let includes = _getBorrowedBooksQueryIncludes(includeBook, includeBorrower);
    let conditions = _getBorrowedBooksQueryConditions(borrowerID, onlyOverdue);

    return await db.BookBorrower.findAll({
        where: conditions,
        include: includes
    });
};

_getBorrowedBooksQueryConditions = (borrowerID, onlyOverdue) => {
    let conditions = {
        borrower_id: borrowerID,
        is_returned: false,
    }

    if(onlyOverdue) {
        let currentDate = utils.formatDateToDB(new Date());
        conditions.due_date = {
            [Op.lte]: currentDate
        };
    }

    return conditions;
}

_getBorrowedBooksQueryIncludes = (includeBook = false, includeBorrower = false) => {
    let includes = [];

    if(includeBook) {
        includes.push({
            model: db.Book,
            as: "book",
            attributes: [
                'title',
                'isbn'
            ]
        });
    }

    if(includeBorrower) {
        includes.push({
            model: db.Borrower,
            as: "borrower",
            attributes: [
                'name',
                'email'
            ]
        });
    }

    return includes;
}