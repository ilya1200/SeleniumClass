const faker = require("faker");
const SeleniumInfra = require('./seleniumInfra');
const bmiURL = "https://www.calculator.net/bmi-calculator.html";

async function testBMI_seleniumInfra(testData) {
    console.log("testBMI_seleniumInfra");
    console.log("testData:");
    console.log(testData);
    console.log("::::::::::::::::::::::::::::");

    const seleniumInfra = new SeleniumInfra();
    try {
        await seleniumInfra.getUrl(bmiURL);

        //Locators
        const ageLoc = await seleniumInfra.findElementBy("cage");
        const gendersLoc = await seleniumInfra.findElementListBy('input[name = "csex"]', "css");
        const heightLoc = await seleniumInfra.findElementBy("cheightmeter");
        const weightLoc = await seleniumInfra.findElementBy("ckg");
        const calcBtn = await seleniumInfra.findElementBy('//input[@value ="Calculate"]', "xpath");

        //Clear
        await seleniumInfra.clearElementField(undefined, undefined, ageLoc, undefined);
        await seleniumInfra.clearElementField(undefined, undefined, heightLoc, undefined);
        await seleniumInfra.clearElementField(undefined, undefined, weightLoc, undefined);

        //Send keys
        await seleniumInfra.write(testData.age, undefined, undefined, ageLoc, undefined);
        await seleniumInfra.clickElement(undefined, undefined, gendersLoc[testData.gender], undefined);
        await seleniumInfra.write(testData.height, undefined, undefined, heightLoc, undefined);
        await seleniumInfra.write(testData.weight, undefined, undefined, weightLoc, undefined);

        //Test
        await seleniumInfra.clickElement(undefined, undefined, calcBtn, undefined);

        //Collect Results
        const resultLoc = await seleniumInfra.findElementBy("rightresult", "className");
        const result = await seleniumInfra.getTextFromElement(undefined, undefined, resultLoc, undefined);
        console.log(result);

        console.log(":::::::::::::::::::::");
        console.log("TEST PASS");
    } catch (error) {
        console.error(error);
    } finally {
        await seleniumInfra.close();
    }

}


//Prep Test Data
const testData = {
    age: getRandom(2, 120),
    gender: getRandom(0, 1),
    height: getRandom(60, 200),
    weight: getRandom(4, 200)
}

function getRandom(min, max) {
    return faker.random.number({ min, max });
}

testBMI_seleniumInfra(testData);