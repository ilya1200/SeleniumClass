const Book = require("./book");
class BookList {
    constructor() {
        this.bookList = [];
    }

    addBookToList(book) {
        this.bookList.push(book);
        book.printDetails();
    }

    printBookList() {
        console.table(this.bookList);
    }
}

module.exports = BookList;