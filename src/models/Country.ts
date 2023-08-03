export default class Country {

    name: String;
    flag: String;
    area: number;
    visited: Boolean;

    constructor(name: String, flag: String, area: number, visited: Boolean) {
        this.name = name;
        this.flag = flag;
        this.area = area;
        this.visited = visited;
    }
}
