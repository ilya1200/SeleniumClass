const StorePage = require("../Pages/store");

class StoreTest {
    constructor() {
        // this.storePage = new StorePage();
    }

    async testCorrectDayMarked() {
        const storePage = new StorePage();

        console.log("StoreTest > testCorrectDayMarked()")
        await storePage.openStorePage();
        const isValid = await storePage.validateMarkedDay();
        if (isValid) {
            console.log("TEST PASS");
        } else {
            console.log("TEST FAIL");
        }
        await storePage.closeStorePage();
    }

    async testOpenHours() {
        const storePage = new StorePage();

        console.log("StoreTest > testOpenHours()")
        await storePage.openStorePage();
        const isValid = await storePage.validateOpenTime();
        if (isValid) {
            console.log("TEST PASS");
        } else {
            console.log("TEST FAIL");
        }
        await storePage.closeStorePage();
    }
}

module.exports = StoreTest;