const { Builder, By, Key } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

class SeleniumInfra {

    constructor() {
        this.driver = new Builder().forBrowser("chrome").build();
        console.log("Driver created");
    }

    
    async getUrl(URL = "") {
        try {
            await this.driver.get(URL);
            console.log(`Driver set to url: ${URL}`);
        } catch (error) {
            const reason = `Failed to GET the URL: ${URL} `;
            error = new Error(reason);
            return Promise.reject(error);
        }
    }

    async close() {
        try {
            await this.driver.quit();
            console.log("Driver Closed");
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
            await element.click()
                .catch(() => {
                    throw new Error(`Found but Could NOT click on element with locator (${locator}) and locator type (${locatorType})`)
                });

            console.log(`Clicked on element with locator (${locator}) and locator type (${locatorType}).`)
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

            console.log(`Write (${data}) to element.`);
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

            console.log(`Cleared element with locator (${locator}) and locator type (${locatorType})`)
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async isElementExists(locator = "", locatorType = "id", fromElement = null) {
        try {
            await this.findElementBy(locator, locatorType ,fromElement);
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
            console.log(`Found an element with locator (${locator}) and locator type (${locatorType})`)
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
            console.log(`Found list of elements with locator (${locator}) ,locator type (${locatorType})`)
            return elementList;
        } catch (error) {
            const reason = `Could not find a list of elements BY: locator (${locator}) ,locatorType (${locatorType})`;
            error = new Error(reason);
            return Promise.reject(error);
        }
    }
}

module.exports = SeleniumInfra;