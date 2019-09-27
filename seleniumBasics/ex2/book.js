class Book {
    constructor(author, title) {
        this._author = author;
        this._title = title;
    }

    get author() {
        return this._author;
    }

    get title() {
        return this._title;
    }

    printInfo() {
        console.log(`Book: ${this.title} BY ${this.author}`);
    }
}

module.exports = Book;