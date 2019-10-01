const ProductsPage = require("../Pages/products");
class ProductsTest {
    constructor() { }

    compareCakesRows(beforeRow, afterRow) {
        if (beforeRow.length !== afterRow.length) {
            return false;
        }

        for (let i in beforeRow) {
            if (beforeRow[i] !== afterRow[i]) {
                return false;
            }
        }

        return true;
    }

    async testRotation(direction = "up") {
        const productsPage = new ProductsPage();
        await productsPage.openProductsPage();

        try {
            direction = direction.toLowerCase();
            if (direction !== "up" && direction !== "down") {
                throw new Error(`Illegal Argument`);
            }

            const beforeRow = (direction === "down") ? 1 : 2;
            const cakesBefore = await productsPage.getCakesFromRow(beforeRow);
            await productsPage.clickArrow(direction);
            const afterRow = ((beforeRow) % 2 + 1);
            const cakesAfter = await productsPage.getCakesFromRow(afterRow);
            const isValid = this.compareCakesRows(cakesBefore, cakesAfter)
            if (isValid) {
                console.log(`ProductsTest > testRotation(${direction}) -- TEST PASS`);
            } else {
                console.log(`ProductsTest > testRotation(${direction}) -- TEST FAIL`);
            }
        } catch (error) {
            console.error(new Error(`ProductsTest > testRotation(${direction}) -- TEST FAIL`));
            console.error(error);
        }

        await productsPage.closeProductsPage();
    }
}

module.exports = ProductsTest;