const SeleniumInfra = require("../Infra/SeleniumInfra");

class ProductsPage {
    constructor() {
        this.url = "https://cakes-automation-course.herokuapp.com/products.html";
        this.infraDriver = new SeleniumInfra();
        this.locators = {
            rowCakesHeadlines: {
                locator: (rowNumber) => `#productsTable tr.productsTableRow:nth-child(${rowNumber}) > th.productsTableData h3.ItemContainerHeadline`,
                locatorType: "css"
            },
            arrowButton: {
                locator: (direction) => `arrow-${direction}`,
                locatorType: "id"
            }
        };
    }

    async clickArrow(direction = "up") {
        direction = direction.toLowerCase();
        const locator = this.locators.arrowButton.locator(direction);
        const locatorType = this.locators.arrowButton.locatorType;
        await this.infraDriver.clickElement(locator, locatorType);
    }

    async getCakesFromRow(rowNumber) {
        const locator = this.locators.rowCakesHeadlines.locator(rowNumber);
        const locatorType = this.locators.rowCakesHeadlines.locatorType;
        const cakesFromRow = [];

        try {
            const rowCakesHeadlinesElems = await this.infraDriver.findElementListBy(locator, locatorType);
            for (let rowCakeHeadline of rowCakesHeadlinesElems) {
                const cakeTitle = await this.infraDriver.getTextFromElement(undefined, undefined, rowCakeHeadline);
                console.log(`ProductsPage > getCakesFromRow(${rowNumber}): Added Cake : (${cakeTitle})`)
                cakesFromRow.push(cakeTitle);
            }

            return cakesFromRow;
        } catch (error) {
            console.error(`ProductsPage > getCakesFromRow(${rowNumber}) FAIL`);
            console.error(error);
            return Promise.reject();
        }
    }

    async openProductsPage() {
        try {
            await this.infraDriver.getURL(this.url);
        } catch (error) {
            console.error("ProductsPage > openHomePage() FAIL:");
            console.error(error);
        }
    }

    async closeProductsPage() {
        try {
            await this.infraDriver.close();
        } catch (error) {
            console.error("ProductsPage > closeHomePage() FAIL:");
            console.error(error);
        }
    }
}

module.exports = ProductsPage;