const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const Book = require("./book");
const BookList = require("./bookList");

class GoodReadsPage {
    constructor() {
        this.url = "https://www.goodreads.com/review/recent_reviews",
            this.driver = new Builder().forBrowser("chrome").build();
        this.locators = {
            searchBooks: By.xpath("//input[@placeholder='Search books']"),
            booksRows: By.xpath("//tr[contains(@itemtype,'Book')]/td[2]"),
            authorsNames: By.css("a.authorName"),
            booksNames: By.css("a.bookTitle"),
            popupCloseBtn: By.xpath("//img[@src='//s.gr-assets.com/assets/gr/icons/icon_close-63734f04e7baaa77fbad796225e5724c.svg']")
        };
    }

    async findListOfBooks(searchKeyWord) {
        try {
            await this.open(this.url);

            await this.driver.findElement(this.locators.searchBooks).sendKeys(searchKeyWord, Key.RETURN);
            await this.driver.wait(until.urlContains(searchKeyWord));

            await this.driver.wait(until.elementLocated(this.locators.popupCloseBtn));
            await this.driver.findElement(this.locators.popupCloseBtn).click();
            await this.driver.wait(until.elementLocated(this.locators.booksRows));

            await this.getBookList();

            console.log("Test Pass");
        } catch (e) {
            console.error("findListOfBooks Fail:\n" + e);
        } finally {
            await this.quit();
        }
    }

    async getBookList() {
        const bookList = new BookList();
        const booksElements = await this.driver.findElements(this.locators.booksRows);
        for (let bookElement of booksElements) {
            const bookName = await bookElement.findElement(this.locators.booksNames).getText();
            const book = new Book(bookName);

            const authorsNamesElements = await bookElement.findElements(this.locators.authorsNames);
            for (let authorElement of authorsNamesElements) {
                const authorName = await authorElement.getText();
                book.addAuthor(authorName);
            }
            bookList.addBookToList(book);
        }

        bookList.printBookList();
    }

    async open(url) {
        await this.driver.get(url);
        await this.driver.manage().window().maximize();
        await this.driver.manage().setTimeouts({ pageLoad: 3000 });
    }

    async quit() {
        await this.driver.quit();
    }
}

module.exports = GoodReadsPage;