const faker = require('faker');
const { Builder, By, Key } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);


async function startDriver(url) {
    const driver = new Builder().forBrowser("chrome").build();
    await driver.get(url);
    return driver;
}



async function testBMI() {
    const bmiURL = "https://www.calculator.net/bmi-calculator.html";
    const driver = await startDriver(bmiURL);

    //Locators
    const ageLoc = await driver.findElement(By.id("cage"));
    const gendersLoc = await driver.findElements(By.css('input[name = "csex"]'));
    const heightLoc = await driver.findElement(By.id("cheightmeter"));
    const weightLoc = await driver.findElement(By.id("ckg"));
    const calcBtn = await driver.findElement(By.xpath('//input[@value ="Calculate"]'));

    //Clear
    await ageLoc.clear();
    await heightLoc.clear();
    await weightLoc.clear();

    //Prep Test Data
    const age = getRandom(2, 120);
    const gender = getRandom(0, 1);
    const height = getRandom(60, 200);
    const weight = getRandom(4, 200);

    console.log(`Test Data:\nage: ${age}\ngender: ${gender}\nheight: ${height}\nweight: ${weight}\n`);

    //Load Test Data
    await ageLoc.sendKeys(age);
    await gendersLoc[gender].click();
    await heightLoc.sendKeys(height);
    await weightLoc.sendKeys(weight)

    //Test
    await calcBtn.click();

    //Results
    const resultLoc = await driver.findElement(By.className("rightresult"));
    const result = await resultLoc.getText();
    console.log(result)


    setTimeout(() => {
        driver.quit();
    }, 7000);
}

function getRandom(min, max) {
    return faker.random.number({ min, max });
}

testBMI();