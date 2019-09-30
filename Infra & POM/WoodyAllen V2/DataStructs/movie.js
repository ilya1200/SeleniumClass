class Movie {
    constructor() {
        this._name = "---",
            this._year = "---",
            this._country = "---",
            this._time = "---"
    }

    set name(name) {
        this._name = name;
    }

    set year(year) {
        this._year = year;
    }

    set country(country) {
        this._country = country;
    }

    set time(time) {
        this._time = time;
    }

    get name() {
        return this._name;
    }

    get year() {
        return this._year;
    }

    get country() {
        return this._country;
    }

    get time() {
        return this._time;
    }
}

module.exports = Movie;