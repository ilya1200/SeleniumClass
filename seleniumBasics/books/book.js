class Book {
    constructor(name) {
        this.name = name;
        this.authors = [];
    }

    addAuthor(authorName) {
        this.authors.push(authorName);
    }

    printDetails() {
        console.log(`Book Added: ${this.name} by ${this.authors}`);
    }
}

module.exports = Book;