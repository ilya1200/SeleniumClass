const StoreTest = require("./Tests/storeTest");
const HomeTest = require("./Tests/homeTest");
const ProductsTest = require("./Tests/productsTest");

async function runStorePageTests() {
    const storeTest = new StoreTest();
    await storeTest.testCorrectDayMarked();
    await storeTest.testOpenHours();
}

async function runHomePageTests() {
    const homeTest = new HomeTest();
    await homeTest.testVisitUs();
    await homeTest.testSearch("About");
    await homeTest.testSearch("cOntact");

    homeTest.testAdvancedSearch();
}

async function runProductsPageTests() {
    const productsTest = new ProductsTest();
    productsTest.testRotation("down");
}

async function myTests() {
    await runStorePageTests();
    // await runHomePageTests();
    // await runProductsPageTests();
}

myTests()