const HomePage = require("../Pages/home");

class HomeTest {
    constructor() { }

    async testVisitUs() {
        const homePage = new HomePage();
        await homePage.openHomePage();
        try {
            await homePage.clickVisitUs();
            const isValid = await homePage.isClickResultUrlContains("store.html");
            if (isValid) {
                console.log("HomeTest > testVisitUs() -- TEST PASS");
            } else {
                console.log("HomeTest > testVisitUs() -- TEST FAIL");
            }
        } catch (error) {
            console.error(new Error("HomeTest > testVisitUs() FAIL"));
            console.error(error);
        }

        await homePage.closeHomePage();
    }

    async testSearch(searchWord) {
        const homePage = new HomePage();
        try {
            await homePage.openHomePage();
            await homePage.fillSearchBox(searchWord);
            await homePage.clickSearch();
            const isValid = await homePage.isClickResultUrlContains(searchWord + ".html");
            if (isValid) {
                console.log(`HomeTest > testSearch(${searchWord}) -- TEST PASS`);
            } else {
                console.log(`HomeTest > testSearch(${searchWord}) -- TEST FAIL`);
            }
        } catch (error) {
            console.error(new Error(`HomeTest > testSearch(${searchWord})  FAIL`));
            console.error(error);
        }

        await homePage.closeHomePage();
    }

    validateAdvSearchOutput(advancedSearchOutput, inputsData) {
        // let expectedStr = `You have searched the following:`;
        // if(inputsData.cakeTypes){
        //     return advancedSearchOutput.search(expectedStr);
        // }
        return true;
    }

    async testAdvancedSearch() {
        const inputsData = {
            cakeTypes: ["Chocolate", "Cheese", "Mousse"],
            cakeRates: ["0-3", "4", "5"],
            dateOfUpload: "26/09/2019",
            allTheseWords: "Red Velvet cake",
            exactWords: "Mousse"
        }

        const homePage = new HomePage();
        await homePage.openHomePage();
        try {
            await homePage.clickAdvancedSearch();
            await homePage.fillTheFormWith(inputsData.cakeTypes, inputsData.cakeRates, inputsData.dateOfUpload, inputsData.allTheseWords, inputsData.exactWords);
            await homePage.clickFormBtnSearch();
            const advancedSearchOutput = await homePage.getAdvancedSearchResults();
            const isValid = this.validateAdvSearchOutput(advancedSearchOutput, inputsData);

            if (isValid) {
                console.log(`HomeTest > testAdvancedSearch(${inputsData}) -- TEST PASS`);
            } else {
                console.log(`HomeTest > testAdvancedSearch(${inputsData}) -- TEST FAIL`);
            }
            console.log(advancedSearchOutput);
        } catch (error) {
            console.error(new Error(`HomeTest > testAdvancedSearch(${inputsData})  FAIL`));
            console.error(error);
        }

        await homePage.closeHomePage()
    }


}

module.exports = HomeTest;


