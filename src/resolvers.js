module.exports = {
    Query: {
        People : async (__, {pageNumber}, {dataSources}) => dataSources.swAPI.getAllPeople({pageNumber}),
        Person : async (__, {name}, {dataSources}) => dataSources.swAPI.getPersonByName({name})
    }
}