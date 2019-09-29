const SeleniumInfra = require("../Infra/SeleniumInfra");
const moment = require('moment');

class HomePage {
    constructor(url) {
        this.url = url;
        this.infra = new SeleniumInfra();
    }

    async visitHomePage() {
        await this.infra.getUrl(this.url);
    }

    async closeHomePage(){
        await this.infra.close();
    }

    async search(input) {
        try {
            await this.infra.write(input, "inputSearch");
            await this.infra.clickElement("inputSearchSubmit");
            return await this.infra.URLvalidation(input.toLowerCase()+".html");
        } catch (error) {
            console.error(error);
        }
    }

    async advancedSearch(cakeTypes, cakeRates, date, searchWords, fullMatch = false) {
        try {

            // await this.infra.driver.manage.setTimeout(() => {
                
            // }, timeout);
            // ! Regular search button interfears the click

            await this.infra.clickElement("myBtn", undefined, undefined, undefined);

            await this.infra.write(date, 'input[type="date"]', "css");

            if (fullMatch) {
                await this.infra.write(searchWords, "input2");
            } else {
                await this.infra.write(searchWords, "input1")
            }


            await this.infra.clickElement("myBtnForm", undefined, undefined, undefined);



            // !  div.searchItem interfeares click on cheese & mousse
            for (let cakeType of cakeTypes) {

                await this.infra.clickElement(`.cakeTypes[value="${cakeType}"]`, "css");
                console.log(`checked cakeType: ${cakeType}`)

            }

            for (let cakeRate of cakeRates) {
                await this.infra.clickElement(`.cakeRates[value="${cakeRate}"]`, "css");
                console.log(`checked cakeRate: ${cakeRate}`)

            }

            //results
            const results = await this.infra.getTextFromElement(".searchedItem", "css");


            // validate 

            for (let cakeType of cakeTypes) {
                if (results.search(cakeType) < 0) {
                    console.error(`Output not contains , ${cakeType}`);
                    return false;
                }
            }

            for (let cakeRate of cakeRates) {
                if (results.search(cakeRate) < 0) {
                    console.error(`Output not contains , ${cakeRate}`);
                    return false;
                }
            }

            if (results.search(searchWords) < 0) {
                return false;
            }


            console.log("Test pass");
            return true;


        } catch (error) {
            console.error(error);
        }
    }

    async validateDay(){
        const currentDay = moment().format('dddd');
        console.log(currentDay);
        try {
            const colorE = await this.infra.findElementBy(`//th[contains(text(),'${currentDay}')]`,"xpath");
            const text = await this.infra.getTextFromElement(undefined,undefined,colorE);
            console.log(text);
            const color = await colorE.getCssValue('color');
            if(color === "rgba(33, 37, 41, 1)"){
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
       

    //    dayShouldBeSelected.ge
    }

    async visitUsToday(){
        try{
            await this.infra.clickElement("//button[contains(text(),'Visit Us Today!')]","xpath");
            const isStorPage = await this.infra.URLvalidation("store.html");

            if(!isStorPage){
                return Promise.reject("Clicked on 'Visit Us',but didnot get to store page");
            }

            const isValidDay = await this.validateDay();

            console.log("isValidDay : "+isValidDay);

        }catch(e){
            console.error(e);
        }
        
    }
}

module.exports = HomePage;


