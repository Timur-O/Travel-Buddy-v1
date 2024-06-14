export default async function updateCountries() {
    let wikipediaSovereignCountries: string;
    let unCountries: Array<any> = [];
    let nonUnSovereignCountries: Array<any> = [];
    let nonUnNonSovereignCountries: Array<any> = [];

    await fetch("https://en.wikipedia.org/wiki/List_of_sovereign_states")
        .then(response => {
            response.text().then(data => {
                wikipediaSovereignCountries = data;
            });
        }).catch(error => {
            console.error("Error updating countries:", error);
        });

    await fetch("https://raw.githubusercontent.com/mledoze/countries/master/countries.json")
        .then(response => {
            response.json().then(data => {
                data.forEach((country: any) => {
                    if (country.unMember) {
                        unCountries.push(country);
                    } else {
                        const formattedName: string = country.name.common.replaceAll(" ", "_");
                        if (wikipediaSovereignCountries.indexOf(
                            '<span id="' + formattedName + '"></span>'
                        ) != -1) {
                            nonUnSovereignCountries.push(country);
                        } else {
                            nonUnNonSovereignCountries.push(country);
                        }
                    }
                });

                unCountries = unCountries.reduce((acc, country) => {
                    const region = country.region;
                    if (!acc[region]) {
                        acc[region] = [];
                    }
                    acc[region].push(country);
                    return acc;
                }, {});

                nonUnSovereignCountries = nonUnSovereignCountries.reduce((acc, country) => {
                    const region = country.region;
                    if (!acc[region]) {
                        acc[region] = [];
                    }
                    acc[region].push(country);
                    return acc;
                }, {});

                nonUnNonSovereignCountries = nonUnNonSovereignCountries.reduce((acc, country) => {
                    const region = country.region;
                    if (!acc[region]) {
                        acc[region] = [];
                    }
                    acc[region].push(country);
                    return acc;
                }, {});

                // Print the data
                console.log("UN Members:", JSON.stringify(unCountries));
                console.log("Non-UN Sovereigns:", JSON.stringify(nonUnSovereignCountries));
                console.log("Non-UN Non-Sovereigns:", JSON.stringify(nonUnNonSovereignCountries));
            });
        }).catch(error => {
            console.error("Error updating countries:", error)
        });
}