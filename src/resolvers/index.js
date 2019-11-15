const ClientResolver = require('./ClientResolvers');
const TransactionResolver = require('./TransactionResolver');
const {
    EmailAddressResolver,
    URLResolver,
    
} = require('graphql-scalars');

module.exports = {
    EmailAddress: EmailAddressResolver,
    URL: URLResolver,
    Query:{
        ...ClientResolver.Query,
        ...TransactionResolver.Query
    },
    Mutation:{
        ...ClientResolver.Mutation,
        ...TransactionResolver.Mutation
    }
};
