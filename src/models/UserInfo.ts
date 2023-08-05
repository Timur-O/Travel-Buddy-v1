export interface ThreeCountryTypes {
    un: Array<any>,
    nonUn: Array<any>,
    nonSovereign: Array<any>
}
export default class UserInfo {
    name: string;
    email: string;
    includeNonSovereign: boolean;
    countries: ThreeCountryTypes;

    constructor(name: string, email: string, includeNonSovereign: boolean, countries: ThreeCountryTypes) {
        this.name = name;
        this.email = email;
        this.includeNonSovereign = includeNonSovereign;
        this.countries = countries;
    }
}