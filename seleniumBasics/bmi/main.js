const faker = require('faker');
const { Builder, By, Key } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

async function bmiTest(bmiUrl, testData) {
    console.log(testData);
    const driver = new Builder().forBrowser("chrome").build();
    try {
        await driver.get(bmiUrl);
        await driver.manage().window().maximize();
        await driver.sleep(1000);

        const locators = {
            age: By.id("cage"),
            gender: {
                male: By.xpath("//label[contains(text(),'Male')]"),
                female: By.xpath("//label[contains(text(),'Female')]")
            },
            height: By.id("cheightmeter"),
            weight: By.id("ckg"),
            clearBtn: By.xpath("//img[@class='clearbtn']"),
            calculateBtn: By.xpath("//input[@value='Calculate']")
        }


        const age = await driver.findElement(locators.age)
        const height = await driver.findElement(locators.height)
        const weight = await driver.findElement(locators.weight)

        await driver.findElement(locators.clearBtn).click();
        await age.sendKeys(testData.age);
        await driver.findElement(locators.gender[testData.gender]).click();
        await height.sendKeys(testData.height);
        await weight.sendKeys(testData.weight);
        await driver.findElement(locators.calculateBtn).click();

        const currentUrl = await driver.getCurrentUrl();

        const validatonStrs = [
            `cage=${testData.age}`,
            `csex=${testData.gender === "male" ? "m" : "f"}`,
            `cheightmeter=${testData.height}`,
            `ckg=${testData.weight}`
        ]

        console.log(currentUrl);
        const isValidUrl = !validatonStrs.some(validatonStr => currentUrl.search(validatonStr) < -1);
        if (isValidUrl) {
            console.log("Url Valid");
        } else {
            console.log("Url is not valid");
        }

        console.log("Test finish");
    } catch (e) {
        console.log("Test Fail");
        console.error(e);
    } finally {
        driver.quit();
    }
}

const testData = {
    age: faker.random.number({ min: 2, max: 100 }),
    gender: (faker.random.number({ min: 0, max: 1 }) === 0) ? "male" : "female",
    height: faker.random.number({ min: 40, max: 200 }),
    weight: faker.random.number({ min: 10, max: 300 })
}
const url = "https://www.calculator.net/bmi-calculator.html";
bmiTest(url, testData);