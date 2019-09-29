const Products = require("./Pages/products");
const Direction = {
    Up: "up",
    Down: "down"
}

async function pTest(){
    const p = new Products("https://cakes-automation-course.herokuapp.com/products.html");
    await p.visitProductsPage();
    await p.click(Direction.Up);
    await p.closeProductsPage();
}

pTest()
