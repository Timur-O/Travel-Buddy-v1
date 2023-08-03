import Country from "@/models/Country";

export default class Region {

    name: String;
    countries: Array<Country>;

    visitedNumber: number;
    visitedArea: number;
    totalNumber: number;
    totalArea: number;

    percentageVisitedByNumber: number;
    percentageVisitedByArea: number;

    constructor(name: String, countries: Array<Country>) {
        this.name = name;
        this.countries = countries;

        this.visitedNumber = 0;
        this.visitedArea = 0;
        this.totalArea = 0;
        this.totalNumber = this.countries.length;

        this.countries.forEach((country: Country) => {
            if (country.visited) {
                this.visitedNumber += 1;
                this.visitedArea += country.area;
            }
            this.totalArea += country.area;
        });

        this.percentageVisitedByNumber = (this.visitedNumber / this.totalNumber) * 100;
        this.percentageVisitedByArea = (this.visitedArea / this.totalArea) * 100;
    }
}
