const SeleniumInfra = require("../Infra/SeleniumInfra");
const infra = new SeleniumInfra();

class Products {
    constructor(url) {
        this.url = url;
    }

    async clickUp(beforeCakes, afterCakes) {
        try {
            await infra.getUrl(this.url);
            let tabelRow = await infra.findElementBy(".productsTableRow:first-child", "css");
            let leftCake = await infra.getTextFromElement(".productsTableData:first-child .ItemContainerHeadline", "css", undefined, tabelRow);
            let rightCake = await infra.getTextFromElement(".productsTableData:last-child .ItemContainerHeadline", "css", undefined, tabelRow);

            //check before match
            if (!(beforeCakes[0] === leftCake && beforeCakes[1] === rightCake)) {
                console.error("beforeCakes dont match");
            }
            //click up arrow
            await infra.clickElement("arrow-up");

            //check after match
            tabelRow = await infra.findElementBy(".productsTableRow:first-child", "css");
            leftCake = await infra.getTextFromElement(".productsTableData:first-child .ItemContainerHeadline", "css", undefined, tabelRow);
            rightCake = await infra.getTextFromElement(".productsTableData:last-child .ItemContainerHeadline", "css", undefined, tabelRow);

            if (!(afterCakes[0] === leftCake && afterCakes[1] === rightCake)) {
                console.error("afterCakes dont match");
            }

            console.log("test pass");
        } catch (error) {

        } finally {
            infra.close()
        }

    }

    async clickDown(beforeCakes, afterCakes) {
        try {
            await infra.getUrl(this.url);
            //1. select the first row 
            const productsTable = await infra.findElementBy("productsTable");
            const firstRowCakes = await infra.findElementListBy("h3.ItemContainerHeadline", "css", undefined, productsTable);

            //check before cakes match
            for (let cakeIndex of beforeCakes) {
                const beforeCakeExpectedTitle = beforeCakes[cakeIndex];
                const actualTitle = await infra.getTextFromElement(undefined, undefined, firstRowCakes[i], undefined);
                if(beforeCakeExpectedTitle!=actualTitle){
                    console.error("beforeCakes dont match");
                    return false;
                }
            }


        } catch (error) {
            console.error(error);
        } finally {
            infra.close();
        }
    }
}

const p = new Products("https://cakes-automation-course.herokuapp.com/products.html");
p.clickUp(["Chocolate Cake", "Apple Pie"], ["Vanilla Cake", "Red Valvet Cake"])
p.clickDown(["Chocolate Cake", "Apple Pie"], ["Vanilla Cake", "Red Valvet Cake"])