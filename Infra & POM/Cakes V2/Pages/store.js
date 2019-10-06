const SeleniumInfra = require("../Infra/SeleniumInfra");
const moment = require('moment');

class StorePage {
    constructor() {
        this.url = "https://cakes-automation-course.herokuapp.com/store.html";
        this.infraDriver = new SeleniumInfra();
        this.locators = {
            today: {
                locator: currentDay => `//th[contains(text(),'${currentDay}')]`,
                locatorType: "xpath"
            },
            todayInfo: {
                locator: currentDay => `//th[contains(text(),'${currentDay}')]/../th[@class='todayInfo']`,
                locatorType: "xpath"
            }
        }
    }

    async validateMarkedDay() {
        const expectedColor = "rgba(212, 126, 21, 1)";
        const currentDay = moment().format('dddd');
        console.log("Today is " + currentDay);

        try {
            const todayElem = await this.infraDriver.findElementBy(this.locators.today.locator(currentDay), this.locators.today.locatorType);
            const todayInfoElem = await this.infraDriver.findElementBy(this.locators.todayInfo.locator(currentDay), this.locators.todayInfo.locatorType);
            const todayColor = await todayElem.getCssValue("color");
            const todayInfoColor = await todayInfoElem.getCssValue("color");

            if ((todayColor === todayInfoColor) && (todayColor === expectedColor)) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("StorePage>validateMarkedDay() FAIL:");
            console.error(error);
        }
    }

    getOpenHours(currentDay) {
        let openHour = "7:00";
        let closeHour = "8:00";


        if (currentDay === "Saturday") {
            openHour = "9:00";
            closeHour = "5:00";
        }

        return {
            openHour,
            closeHour
        }
    }

    async validateOpenTime() {
        const currentDay = moment().format('dddd');
        const { openHour, closeHour } = this.getOpenHours(currentDay);
        const expectedText = (currentDay === "Sunday") ? "Closed" : `${openHour} AM to ${closeHour} PM`;

        try {
            const todayInfoHours = await this.infraDriver.getTextFromElement(this.locators.todayInfo.locator(currentDay), this.locators.todayInfo.locatorType);
            return (todayInfoHours === expectedText);
        } catch (error) {
            console.error("StorePage>validateOpenTime() FAIL:");
            console.error(error);
        }
    }

    async openStorePage() {
        try {
            await this.infraDriver.getURL(this.url);
        } catch (error) {
            console.error("StorePage>openStorePage() FAIL:");
            console.error(error);
        }
    }

    async closeStorePage() {
        try {
            await this.infraDriver.close();
        } catch (error) {
            console.error("StorePage>openStorePage() FAIL:");
            console.error(error);
        }
    }
}

module.exports = StorePage;