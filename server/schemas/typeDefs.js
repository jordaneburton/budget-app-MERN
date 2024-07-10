const typeDefs = `
    type User {
        _id: ID
        email: String
        budgets: [Budget]
    }

    type Budget {
        _id: ID
        name: String
        limit: Int
        categories: [Category]
    }

    type Category {
        _id: ID
        name: String
        budgetAmount: Int
        transactions: [Transaction]
    }

    type Transaction {
        _id: ID
        amount: Int
        description: String
        date: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
    }

    type Mutation {
    }
`;

module.exports = typeDefs;