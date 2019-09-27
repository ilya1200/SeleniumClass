const Book = require("./book");
const BookList = require("./bookList");

const { Builder, By, Key } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

async function startDriver(url) {
    const driver = await new Builder().forBrowser("chrome").build();
    await driver.get(url);
    return driver;
}

async function quitDriver(driver, time = 0) {
    const quit = async () => {
        await driver.quit();
    }

    if (time > 0) {
        setTimeout(quit, time);
    } else {
        quit();
    }
}

async function myTest(search) {
    const testURL = "https://www.goodreads.com/review/recent_reviews";
    const driver = await startDriver(testURL);

    //Locators
    const searchBox = await driver.findElement(By.name("q"));
    await searchBox.sendKeys(search, Key.RETURN);
    try{
        await driver.findElement(By.xpath("//img[@src='//s.gr-assets.com/assets/gr/icons/icon_close-63734f04e7baaa77fbad796225e5724c.svg']")).click();
    }catch(e){

    }
    const booksRows = await driver.findElements(By.css("tr[itemscope]"));
    const books = new BookList();

    for (let webElem of booksRows) {
        try{
            await driver.findElement(By.xpath("//img[@src='//s.gr-assets.com/assets/gr/icons/icon_close-63734f04e7baaa77fbad796225e5724c.svg']")).click();
        }catch(e){
            
        }
        const title = await webElem.findElement(By.css("span[role='heading']")).getText();
        const author = await webElem.findElement(By.css("a.authorName")).getText();
        const book = new Book(author, title);
        books.addBook(book);
    }

    books.printBooks();

    await quitDriver(driver);
}

const searchStr = "Art";
myTest(searchStr, 19000)
