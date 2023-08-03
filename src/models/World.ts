import Region from "@/models/Region";

export default class World {

    regions: Array<Region>;

    visitedNumber: number;
    totalNumber: number;
    visitedArea: number;
    totalArea: number;

    percentageVisitedByNumber: number;
    percentageVisitedByArea: number;

    constructor(regions: Array<Region>) {
        this.regions = regions;

        this.visitedNumber = 0;
        this.visitedArea = 0;
        this.totalNumber = 0;
        this.totalArea = 0;
        this.regions.forEach((region: Region) => {
            this.visitedNumber += region.visitedNumber;
            this.visitedArea += region.visitedArea;
            this.totalNumber += region.totalNumber;
            this.totalArea += region.totalArea;
        });

        this.percentageVisitedByNumber = (this.visitedNumber / this.totalNumber) * 100;
        this.percentageVisitedByArea = (this.visitedArea / this.totalArea) * 100;
    }
}
