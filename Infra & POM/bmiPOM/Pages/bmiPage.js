const SeleniumInfra = require("../Infra/SeleniumInfra");

class BmiPage {
    constructor() {
        this.url = "https://www.calculator.net/bmi-calculator.html";
        this.infraDriver = new SeleniumInfra();
        this.locators = {
            ageInput: {
                locator: "cage",
                locatorType: "id"
            },
            genderRadioBtns: {
                male: {
                    locator: "//input[@value='m']",
                    locatorType: "xpath"
                },
                female: {
                    locator: "//input[@value='f']",
                    locatorType: "xpath"
                }
            },
            heightInput: {
                locator: "cheightmeter",
                locatorType: "id"
            },
            weightInput: {
                locator: 'ckg',
                locatorType: "id"
            },
            calculateBtn: {
                locator: "//input[@value='Calculate']",
                locatorType: "xpath"
            },
            result: {
                locator: "//div[@class='rightresult']",
                locatorType: "xpath"
            }
        };
    }

    async setAge(age) {
        try {
            const ageInput = await this.infraDriver.findElementBy(this.locators.ageInput.locator, this.locators.ageInput.locatorType);
            await this.infraDriver.clearElementField(undefined, undefined, ageInput);
            await this.infraDriver.write(age, undefined, undefined, ageInput);
        } catch (error) {
            console.error(new Error(`BmiPage > setAge(${age}) FAIL:`));
            console.error(error);
        }
    }

    async setGender(gender = "male") {
        try {
            gender = gender.toLowerCase();
            await this.infraDriver.clickElement(this.locators.genderRadioBtns[gender].locator,
                this.locators.genderRadioBtns[gender].locatorType);
        } catch (error) {
            console.error(new Error(`BmiPage > setGender(${gender}) FAIL:`));
            console.error(error);
        }
    }

    async setHeight(height) {
        try {
            const heightInput = await this.infraDriver.findElementBy(this.locators.heightInput.locator, this.locators.heightInput.locatorType);
            await this.infraDriver.clearElementField(undefined, undefined, heightInput);
            await this.infraDriver.write(height, undefined, undefined, heightInput);
        } catch (error) {
            console.error(new Error(`BmiPage > setHeight(${height}) FAIL:`));
            console.error(error);
        }
    }

    async setWeight(weight) {
        try {
            const weightInput = await this.infraDriver.findElementBy(this.locators.weightInput.locator, this.locators.weightInput.locatorType);
            await this.infraDriver.clearElementField(undefined, undefined, weightInput);
            await this.infraDriver.write(weight, undefined, undefined, weightInput);
        } catch (error) {
            console.error(new Error(`BmiPage > setHeight(${weight}) FAIL:`));
            console.error(error);
        }
    }

    async clickCalculate() {
        try {
            await this.infraDriver.clickElement(this.locators.calculateBtn.locator, this.locators.calculateBtn.locatorType);
        } catch (error) {
            console.error(new Error(`BmiPage > clickCalculate() FAIL:`));
            console.error(error);
        }
    }

    async visitBmiPage() {
        try {
            await this.infraDriver.getURL(this.url);
        } catch (error) {
            console.error(new Error(`BmiPage > visitBmiPage() FAIL:`));
            console.error(error);
        }
    }

    async closeBmiPage() {
        try {
            await this.infraDriver.close();
        } catch (error) {
            console.error(new Error(`BmiPage > closeBmiPage() FAIL:`));
            console.error(error);
        }
    }

    async validateURL(age, gender = "male", height, weight) {
        const validatonStrs = [
            `cage=${age}`,
            `csex=${gender === "male" ? "m" : "f"}`,
            `cheightmeter=${height}`,
            `ckg=${weight}`
        ]
        for (let vStr of validatonStrs) {
            const isPresent = await this.infraDriver.URLvalidation(vStr);
            if (!isPresent) {
                console.log("URL is INVALID");
                return;
            }
        }
        console.log("URL is VALID");
    }

    async printResult() {
        try {
            const resultText = await this.infraDriver.getTextFromElement(this.locators.result.locator, this.locators.result.locatorType);
            console.log(`${resultText}`);
        } catch (error) {
            console.error(new Error(`BmiPage > printResult() FAIL:`));
            console.error(error);
        }
    }
}

module.exports = BmiPage;