const faker = require('faker');
const GoodReadsPage = require("./goodReadsPage")
const readsPage = new GoodReadsPage();

const testKeyWord = faker.random.word();
console.log(`Test search books with the random keyword: ${testKeyWord}`);
readsPage.findListOfBooks(testKeyWord);