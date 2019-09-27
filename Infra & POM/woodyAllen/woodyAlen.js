const SeleniumInfra = require('./seleniumInfra');
const woodyAllenURL = "https://film.list.co.uk/listings/woody-allen/";

async function woodyAllen_seleniumInfra(searchBy) {
    console.log("woodyAllen_seleniumInfra");
    console.log("::::::::::::::::::::::::::::");
    const seleniumInfra = new SeleniumInfra();
    const moviesArr = [];

    try {
        await seleniumInfra.getUrl(woodyAllenURL);
        let currentPage = 1;
        let shouldReadNext = true;

        while (shouldReadNext) {
            console.log(`Reading Page: ${currentPage}`);

            const moviesDIVs = await seleniumInfra.findElementListBy(".main > div.clearfix", "css");
            for (let movie of moviesDIVs) {
                const name = await seleniumInfra.getTextFromElement(".head", "css", undefined, movie);
                const movieUL = await seleniumInfra.findElementBy("ul.info", "css", movie);

                let startLI = 1;
                const isMovieRatingExists = await seleniumInfra.isElementExists("img.rating", "css", movieUL);
                if (isMovieRatingExists) {
                    startLI += 1;
                }

                const year = await seleniumInfra.getTextFromElement(`li:nth-child(${startLI})`, "css", undefined, movieUL);



                let country = "---";
                const isCountryExists = await seleniumInfra.isElementExists(`li:nth-child(${(startLI + 1)})`, "css", movieUL)
                if (isCountryExists) {
                    country = await seleniumInfra.getTextFromElement(`li:nth-child(${(startLI + 1)})`, "css", undefined, movieUL);
                    for (let letter of country) {
                        if (letter >= '0' && letter <= '9') {
                            country = "---";
                            break;
                        }
                    }
                }

                let time = "---";
                const isMovieDurationExists = await seleniumInfra.isElementExists("li[title]", "css", movieUL);
                if (isMovieDurationExists) {
                    time = await seleniumInfra.getTextFromElement("li[title]", "css", undefined, movieUL);
                }


                const movieObj = {
                    name,
                    year,
                    country,
                    time
                }

                console.log(movieObj);
                moviesArr.push(movieObj);
            }


            //Switch To Next Page
            isNextPage = await seleniumInfra.isElementExists("a.next", "css");
            if (isNextPage) {
                await seleniumInfra.clickElement("a.next", "css");
                currentPage++;
            } else {
                shouldReadNext = false;
            }
        }

        console.table(moviesArr);
        console.log(":::::::::::::::::::::");
        console.log("TEST PASS");

    } catch (error) {
        console.error(error);
    } finally {
        await seleniumInfra.close();
    }
}

const searchBy = "wonder wheel";
woodyAllen_seleniumInfra(searchBy);