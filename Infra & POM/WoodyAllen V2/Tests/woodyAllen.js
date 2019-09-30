const FilmsPage = require("../Pages/filmsPage");

class WoodyAllen {
    constructor() {
        this.filmsPage = new FilmsPage();
    }

    async generateFilmTabel() {
        await this.filmsPage.openPage();
        await this.filmsPage.printFilmTabel();
        await this.filmsPage.closePage();
    }
}

module.exports = WoodyAllen;