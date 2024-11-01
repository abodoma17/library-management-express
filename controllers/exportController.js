const exportService = require("../services/exportService");
const { Parser } = require('json2csv');

exports.exportLastMonthOverdueBooks = async (req, res) => {
        let data = await exportService.getLastMonthOverdueBorrowedBooks();
        const fields = ['title', 'isbn', 'name', 'email', 'due_date', 'borrowed_at'];
        const json2csvParser = new Parser({ fields });

        const csv = json2csvParser.parse(data);

        res.header('Content-Type', 'text/csv');
        res.attachment('last_month_overdue_books.csv');

        return res.send(csv);
};

exports.exportLastMonthBorrowedBooks = async (req, res) => {
        let data = await exportService.exportLastMonthBorrowedBooks();
        const fields = ['title', 'isbn', 'name', 'email', 'due_date', 'borrowed_at'];
        const json2csvParser = new Parser({ fields });

        const csv = json2csvParser.parse(data);

        res.header('Content-Type', 'text/csv');
        res.attachment('last_month_overdue_books.csv');

        return res.send(csv);
};