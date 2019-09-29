const BmiPage = require("../Pages/bmiPage");
const faker = require("faker");

class BmiTest {
    constructor() {
        this.bmiPage = new BmiPage();
    }

    async testMetricUnits(age, gender = "male", height, weight) {
        console.log(`Start testMetricUnits with values:\nage=(${age})\ngender=(${gender})\nheight=(${height})\nweight=(${weight})`)
        await this.bmiPage.visitBmiPage();
        await this.bmiPage.setAge(age);
        await this.bmiPage.setGender(gender);
        await this.bmiPage.setHeight(height);
        await this.bmiPage.setWeight(weight);
        await this.bmiPage.clickCalculate();
        await this.bmiPage.validateURL(age, gender, height, weight);
        await this.bmiPage.printResult();
        await this.bmiPage.closeBmiPage();
    }
}

const testData = {
    age: faker.random.number({ min: 2, max: 100 }),
    gender: (faker.random.number({ min: 0, max: 1 }) === 0) ? "male" : "female",
    height: faker.random.number({ min: 40, max: 200 }),
    weight: faker.random.number({ min: 10, max: 300 })
}
const bmiTest = new BmiTest();
bmiTest.testMetricUnits(testData.age, testData.gender, testData.height, testData.weight);
