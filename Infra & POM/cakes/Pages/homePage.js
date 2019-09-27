const SeleniumInfra = require("../Infra/SeleniumInfra");


class HomePage {
    constructor(url) {
        this.url = url;
        this.infra = new SeleniumInfra();
    }

    async visitHomePage() {
        await this.infra.getUrl(this.url);
    }

    async search(input) {
        try {
            await this.infra.write(input, "inputSearch");
            await this.infra.clickElement("inputSearchSubmit");
            return await this.infra.URLvalidation(input.toLowerCase());
        } catch (error) {
            console.error(error);
        } finally {
            await this.infra.close();
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
        } finally {
            await this.infra.close();
        }
    }
}

module.exports = HomePage;


