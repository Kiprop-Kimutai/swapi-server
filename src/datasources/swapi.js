const { RESTDataSource } = require('apollo-datasource-rest');

class SWAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://swapi.dev/api/';
    }

    async getAllPeople({pageNumber}) {
        const response = await this.get(`people/?page=${pageNumber}`);
        const {count, results, previous, next} = response;
        const pageSize = 10;
        const people =  Array.isArray(results) ? results.map(person => this.reducePerson(person)) : [];
        const nextPage = !next ? null : next.split('=')[1];
        const previousPage = ! previous ? null : previous.split('=')[1];
        const hasMore = count > (10 * pageNumber);
        const pageCount = Math.floor(count / pageSize) + (count % pageSize ? 1 : 0);
        return { People: people, Pagination :{ hasMore, nextPage, previousPage, pageCount}};
    }
    async getPersonByName({name}) {
        const response = await this.get(`people?search=${name}`);
        const {results} = response;
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