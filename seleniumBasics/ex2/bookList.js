const Book = require("./book");
class BookList {
    constructor() {
        this.list = [];
    }

    addBook(book) {
        this.list.push(book);
    }

    printBooks() {
        console.log(`A list of ${this.list.length} Books:`);
        console.log(`========================================`);
        this.list.forEach(book => book.printInfo());
    }
}

module.exports = BookList;