const SeleniumInfra = require("../Infra/SeleniumInfra");
const Movie = require("../DataStructs/movie");
const MovieList = require("../DataStructs/movieList");

class FilmsPage {
    constructor() {
        this.url = "https://film.list.co.uk/listings/woody-allen/";
        this.infraDriver = new SeleniumInfra();
        this.locators = {
            nextPage: {
                locator: "//a[contains(@title,'Next')]",
                locatorType: "xpath"
            },
            movieDivs: {
                locator: "div.eventSummary",
                locatorType: "css"
            },
            movieName: {
                locator: "h2.head",
                locatorType: "css"
            },
            movieYear: {
                // locator: "//li[starts-with(text(),'19')] | //li[starts-with(text(),'20')]",  - IT ALWAYS SEARCH THE ENTIRE DOCUMENT
                locator: "./ul[@class='info']/li[starts-with(text(),'19')] | ./ul[@class='info']/li[starts-with(text(),'20')]",
                locatorType: "xpath"
            },
            movieTime: {
                locator: "ul.info>li[title]",
                locatorType: "css"
            },
            movieRating: {
                locator: "img.rating",
                locatorType: "css"
            }
        };
    }

    async extractMovieYear(movieElem) {
        try {
            return await this.infraDriver.getTextFromElement(this.locators.movieYear.locator, this.locators.movieYear.locatorType, null, movieElem);
        } catch (error) {
            return "---";
        }
    }


    async extractMoviePropByLocator(movieElem, locatorObj) {
        try {
            return await this.infraDriver.getTextFromElement(locatorObj.locator, locatorObj.locatorType, null, movieElem);
        } catch (error) {
            return "---";
        }
    }

    async extractMovieName(movieElem) {
        try {
            return await this.infraDriver.getTextFromElement(this.locators.movieName.locator, this.locators.movieName.locatorType, null, movieElem);
        } catch (error) {
            return "---";
        }
    }

    async extractMovieTime(movieElem) {
        try {
            return await this.infraDriver.getTextFromElement(this.locators.movieTime.locator, this.locators.movieTime.locatorType, null, movieElem);
        } catch (error) {
            return "---";
        }
    }

    async extractMovieCountry(movieElem) {
        let countryLI = 1;
        const isMovieRatingExists = await this.infraDriver.isElementExists(this.locators.movieRating.locator, this.locators.movieRating.locatorType, movieElem);
        if (isMovieRatingExists) {
            countryLI += 1;
        }

        let country = "---";
        const isCountryExists = await this.infraDriver.isElementExists(`li:nth-child(${(countryLI + 1)})`, "css", movieElem)
        if (isCountryExists) {
            country = await this.infraDriver.getTextFromElement(`li:nth-child(${(countryLI + 1)})`, "css", undefined, movieElem);
            for (let letter of country) {
                if ((letter >= '0' && letter <= '9') || letter === ':') {
                    country = "---";
                    break;
                }
            }
        }

        return country;
    }

    async mapMoviesElemsToList(movieList) {
        try {
            const currentPageMovieElems = await this.infraDriver.findElementListBy(this.locators.movieDivs.locator, this.locators.movieDivs.locatorType);

            for (let movieElem of currentPageMovieElems) {
                const newMovie = new Movie();
                newMovie.name = await this.extractMoviePropByLocator(movieElem, this.locators.movieName);
                newMovie.year = await this.extractMoviePropByLocator(movieElem, this.locators.movieYear);
                newMovie.time = await this.extractMoviePropByLocator(movieElem, this.locators.movieTime);
                newMovie.country = await this.extractMovieCountry(movieElem);
                movieList.addMovie(newMovie);
            }
        } catch (error) {
            console.error(new Error("FilmsPage>mapMoviesElemsToList() FAIL:"));
            console.error(error);
        }

    }

    async printFilmTabel() {
        const movieList = new MovieList();
        do {
            await this.mapMoviesElemsToList(movieList);

            if (!(await this.isThereNextPage())) {
                break;
            }
            await this.nextPage();
        } while (true);
        movieList.printMovies();
    }

    async isThereNextPage() {
        return await this.infraDriver.isElementExists(this.locators.nextPage.locator, this.locators.nextPage.locatorType);
    }

    async nextPage() {
        try {
            await this.infraDriver.clickElement(this.locators.nextPage.locator, this.locators.nextPage.locatorType);
        } catch (error) {
            console.error(new Error("FilmsPage>nextPage() FAIL:"));
            console.error(error);
        }
    }

    async openPage() {
        try {
            await this.infraDriver.getURL(this.url);
        } catch (error) {
            console.error(new Error("FilmsPage>openPage() FAIL:"));
            console.error(error);
        }
    }

    async closePage() {
        try {
            await this.infraDriver.close();
        } catch (error) {
            console.error(new Error("FilmsPage>closePage() FAIL:"));
            console.error(error);
        }
    }
}

module.exports = FilmsPage;