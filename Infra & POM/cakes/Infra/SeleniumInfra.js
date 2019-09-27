const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

class SeleniumInfra {

    constructor() {
        this.driver = new Builder().forBrowser("chrome").build();
    }


    async getUrl(URL = "") {
        try {
            await this.driver.manage().window().maximize();
            await this.driver.get(URL);

        } catch (error) {
            const reason = `Failed to GET the URL: ${URL} `;
            error = new Error(reason);
            return Promise.reject(error);
        }
    }

    async close() {
        try {
            await this.driver.quit();
        } catch (error) {
            const reason = `Failed to close driver.`;
            error = new Error(reason);
            return Promise.reject(error);
        }
    }


    /* 
    Click on web element
    Either provide an element or a combination of locator and locator_type
    */
    async clickElement(locator = "", locatorType = "id", element = null, fromElement = null) {
        try {
            if (!element) {
                element = await this.findElementBy(locator, locatorType, fromElement);
            }

            await element.click();
            await this.driver.sleep(2000);
        }
        catch (error) {
            console.error(error)
        }
    }

    async write(data, locator = "", locatorType = "id", element = null, fromElement = null) {
        try {
            if (!element) {
                element = await this.findElementBy(locator, locatorType, fromElement);
            }
            await element.sendKeys(data)
                .catch(() => {
                    throw new Error(`Found the element, but COULD NOT WRITE into it the data :(${data}).`);
                });

        } catch (error) {
            console.error(error);
        }
    }

    async getTextFromElement(locator = "", locatorType = "id", element = null, fromElement = null) {
        try {
            if (!element) {
                element = await this.findElementBy(locator, locatorType, fromElement);
            }
            const elementText = await element.getText().catch(() => {
                throw new Error("Found the element, but could NOT get text from it")
            });
            return elementText;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async clearElementField(locator = "", locatorType = "id", element = null, fromElement = null) {
        try {
            if (!element) {
                element = await this.findElementBy(locator, locatorType, fromElement);
            }
            await element.clear().catch(() => {
                throw new Error("Found the element, but could NOT clear it")
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async isElementExists(locator = "", locatorType = "id", fromElement = null) {
        try {
            await this.findElementBy(locator, locatorType, fromElement);
            return true;
        } catch{
            return false;
        }
    }


    async findElementBy(locator = "", locatorType = "id", fromElement = null) {
        try {
            if (!fromElement) {
                fromElement = this.driver;
            }

            const element = await fromElement.findElement(By[locatorType](locator));
            return element;
        } catch (error) {
            const reason = `Could not find an element with : locator (${locator}), locatorType (${locatorType})`;
            error = new Error(reason);
            return Promise.reject(error);
        }
    }

    async findElementListBy(locator = "", locatorType = "id", fromElement = null) {
        try {
            if (!fromElement) {
                fromElement = this.driver;
            }

            const elementList = await fromElement.findElements(By[locatorType](locator));
            return elementList;
        } catch (error) {
            const reason = `Could not find a list of elements BY: locator (${locator}) ,locatorType (${locatorType})`;
            error = new Error(reason);
            return Promise.reject(error);
        }
    }

    async URLvalidation(pageName) {
        try {
            const isValid = await this.driver.wait(until.urlContains(pageName), 8000);
            return isValid;
        } catch (error) {
            return false;
        }
    }
}

module.exports = SeleniumInfra;

