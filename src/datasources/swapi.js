const { RESTDataSource } = require('apollo-datasource-rest');

class SWAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://swapi.dev/api/';
    }

    async getAllPeople({pageNumber}) {
        console.log("********", pageNumber);
        const response = await this.get(`people/?page=${pageNumber}`);
        console.log(response);
        const {count, results, previous, next} = response;
        const pageSize = 10;
        const people =  Array.isArray(results) ? results.map(person => this.reducePerson(person)) : [];
        let nextPage = !next ? null : next.split('=')[1];
        let previousPage = ! previous ? null : previous.split('=')[1];
        let hasMore = count > (10 * pageNumber);
        let pageCount = Math.floor(count / pageSize) + (count % pageSize ? 1 : 0);
        return { People: people, Pagination :{ hasMore, nextPage, previousPage, pageCount}};
    }
    async getPersonByName({name}) {
        const response = await this.get(`people?search=${name}`);
        const {count, results, previous, next} = response;
        return Array.isArray(results) ? results.map(person => this.reducePerson(person)) : [];
    }
    reducePerson(person) {
        return {
            name: person.name,
            height: person.height,
            mass: person.mass,
            gender: person.gender,
            homeworld: person.homeworld
        }
    }
}

module.exports = SWAPI;