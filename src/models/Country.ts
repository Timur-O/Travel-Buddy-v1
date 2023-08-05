export default class Country {

    code: String;
    type: String;
    name: String;
    flag: String;
    area: number;
    visited: Boolean;

    constructor(code: String, type: String, name: String, flag: String, area: number, visited: Boolean) {
        this.code = code;
        this.type = type;
        this.name = name;
        this.flag = flag;
        this.area = area;
        this.visited = visited;
    }
}
