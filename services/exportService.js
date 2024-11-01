const { sequelize } = require('../models');

exports.getLastMonthOverdueBorrowedBooks = async () => {
    const today = new Date();
    const lastMonth = today.getMonth() === 0 ? 12 : today.getMonth();
    const year = lastMonth === 12 ? today.getFullYear() - 1 : today.getFullYear();

    const query = `
        SELECT 
            books.title,
            books.isbn,
            borrowers.name,
            borrowers.email,
            book_borrowers.due_date,
            book_borrowers.borrowed_at
        FROM book_borrowers
        INNER JOIN books ON books.id = book_borrowers.book_id
        INNER JOIN borrowers ON borrowers.id = book_borrowers.borrower_id
        WHERE 
            MONTH(due_date) = :lastMonth
            AND YEAR(due_date) = :year
            AND is_returned = 0
    `;

    return await sequelize.query(query, {
        replacements: {lastMonth, year},
        type: sequelize.QueryTypes.SELECT,
    });
};

exports.exportLastMonthBorrowedBooks = async () => {
    const today = new Date();
    const lastMonth = today.getMonth() === 0 ? 12 : today.getMonth();
    const year = lastMonth === 12 ? today.getFullYear() - 1 : today.getFullYear();

    const query = `
        SELECT 
            books.title,
            books.isbn,
            borrowers.name,
            borrowers.email,
            book_borrowers.due_date,
            book_borrowers.borrowed_at
        FROM book_borrowers
        INNER JOIN books ON books.id = book_borrowers.book_id
        INNER JOIN borrowers ON borrowers.id = book_borrowers.borrower_id
        WHERE 
            MONTH(borrowed_at) = :lastMonth
            AND YEAR(borrowed_at) = :year
    `;

    return await sequelize.query(query, {
        replacements: {lastMonth, year},
        type: sequelize.QueryTypes.SELECT,
    });
};
