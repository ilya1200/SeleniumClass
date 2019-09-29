const SeleniumInfra = require("../Infra/SeleniumInfra");
const infra = new SeleniumInfra();

const Direction = {
    Up: "up",
    Down: "down"
}

class Products {

    constructor(url) {
        this.url = url;        
    }

    async visitProductsPage() {
        await infra.getUrl(this.url);
    }

    async closeProductsPage() {
        await infra.close();
    }

    async selectRow(rowNum) {
        let tabelRow = await infra.findElementBy(`.productsTableRow:nth-child(${rowNum})`, "css");
        let leftCake = await infra.getTextFromElement(".productsTableData:first-child .ItemContainerHeadline", "css", undefined, tabelRow);
        let rightCake = await infra.getTextFromElement(".productsTableData:last-child .ItemContainerHeadline", "css", undefined, tabelRow);
        return {
            leftCake: leftCake,
            rightCake: rightCake
        }
    }

    async click(direction = Direction.Up) {
        try {
            let index = 1;
            if (direction === Direction.Up) {
                index = 2;
            }
            const afterRow = await this.selectRow(index);

            await infra.clickElement(`arrow-${direction}`);

            const validatorRow = await this.selectRow((index % 2) + 1);

            if (!(validatorRow.leftCake === afterRow.leftCake && validatorRow.rightCake === afterRow.rightCake)) {
                console.error("afterCakes dont match");
            }

        } catch (e) {
            console.error(e)
        } finally {
            //infra.close();
        }
    }


}



module.exports = Products;

