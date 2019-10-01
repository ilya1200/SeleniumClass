const SeleniumInfra = require("../Infra/SeleniumInfra");

class HomePage {
    constructor() {
        this.url = "https://cakes-automation-course.herokuapp.com/index.html";
        this.infraDriver = new SeleniumInfra();
        this.locators = {
            visitUs: {
                locator: "//button[contains(text(),'Visit')]",
                locatorType: "xpath"
            },
            searchBox: {
                locator: "inputSearch",
                locatorType: "id"
            },
            searchButton: {
                locator: "inputSearchSubmit",
                locatorType: "id"
            },
            advSearchBtn: {
                locator: "myBtn",
                locatorType: "id"
            },
            cakeTypesCheckBox: {
                locator: cakeType => `input.cakeTypes[value='${cakeType}']`,
                locatorType: "css"
            },
            cakeRatesCheckBox: {
                locator: cakeRate => `input.cakeRates[value='${cakeRate}']`,
                locatorType: "css"
            },
            dateOfUpload: {
                locator: "input.inputDate",
                locatorType: "css"
            },
            allTheseWords: {
                locator: "input1",
                locatorType: "id"
            },
            exactWords: {
                locator: "input2",
                locatorType: "id"
            },
            formBtnSearch: {
                locator: "myBtnForm",
                locatorType: "id"
            },
            advancedSearchResults: {
                locator: "div.searchedItem",
                locatorType: "css"
            }

        }
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async fillTheFormWith(cakeTypes = [], cakeRates = [], dateOfUpload = "", allTheseWords = "", exactWords = "") {
        for (let cakeType of cakeTypes) {
            const cakeTypesCheckBox = this.locators.cakeTypesCheckBox;
            const cakeTypeCap = this.capitalize(cakeType);
            await this.infraDriver.clickElement(cakeTypesCheckBox.locator(cakeTypeCap), cakeTypesCheckBox.locatorType);
        }

        for (let cakeRate of cakeRates) {
            const cakeRatesCheckBox = this.locators.cakeRatesCheckBox;
            await this.infraDriver.clickElement(cakeRatesCheckBox.locator(cakeRate), cakeRatesCheckBox.locatorType);
        }

        await this.infraDriver.write(dateOfUpload, this.locators.dateOfUpload.locator, this.locators.dateOfUpload.locatorType);
        await this.infraDriver.write(allTheseWords, this.locators.allTheseWords.locator, this.locators.allTheseWords.locatorType);
        await this.infraDriver.write(exactWords, this.locators.exactWords.locator, this.locators.exactWords.locatorType);
    }

    async getAdvancedSearchResults() {
        return this.infraDriver.getTextFromElement(this.locators.advancedSearchResults.locator, this.locators.advancedSearchResults.locatorType)
    }

    async clickFormBtnSearch() {
        await this.infraDriver.clickElement(this.locators.formBtnSearch.locator, this.locators.formBtnSearch.locatorType);
    }

    async clickAdvancedSearch() {
        await this.infraDriver.clickElement(this.locators.advSearchBtn.locator, this.locators.advSearchBtn.locatorType);
    }

    async clickSearch() {
        await this.infraDriver.clickElement(this.locators.searchButton.locator, this.locators.searchButton.locatorType);
    }

    async fillSearchBox(input) {
        await this.infraDriver.write(input, this.locators.searchBox.locator, this.locators.searchBox.locatorType);
    }

    async clickVisitUs() {
        await this.infraDriver.clickElement(this.locators.visitUs.locator, this.locators.visitUs.locatorType);
    }

    async isClickResultUrlContains(expectedPage) {
        expectedPage = expectedPage.toLowerCase();
        try {
            return await this.infraDriver.URLvalidation(expectedPage);
        } catch (error) {
            console.error(`HomePage > openHomePage(${expectedPage}) FAIL:`);
            console.error(error);
        }
    }

    async openHomePage() {
        try {
            await this.infraDriver.getURL(this.url);
        } catch (error) {
            console.error("HomePage > openHomePage() FAIL:");
            console.error(error);
        }
    }

    async closeHomePage() {
        try {
            await this.infraDriver.close();
        } catch (error) {
            console.error("HomePage > closeHomePage() FAIL:");
            console.error(error);
        }
    }
}

module.exports = HomePage;