const HomePage = require("./Pages/homePage");

async function searchTestHomePage() {
    console.log("searchTestHomePage")
    const home = new HomePage("https://cakes-automation-course.herokuapp.com/")
    await home.visitHomePage();
    console.log("result: ", await home.search("about"));
    await home.closeHomePage();
}

async function advancedsearchTest() {
    console.log("advancedsearchTest");
    const home = new HomePage("https://cakes-automation-course.herokuapp.com/");
    await home.visitHomePage();

    const cakeTypes = ["Chocolate", "Cheese"];
    const cakeRates = ["0-3", "4"];

    const searchWord = "amazing cake";
    const date = "26/09/2019";
    await home.advancedSearch(cakeTypes, cakeRates, date, searchWord, true);
    await home.closeHomePage();
}

async function visitUsTest(){
    const home = new HomePage("https://cakes-automation-course.herokuapp.com/");
    await home.visitHomePage();
    await home.visitUsToday()
    await home.closeHomePage();
}
// searchTestHomePage()
// advancedsearchTest()
visitUsTest()