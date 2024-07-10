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
        devUsers: [User]

        user(userID: ID): User
        budget(budgetID: ID): Budget
    }

    type Mutation {
        login(email: String!, password: String!): Auth

        addUser(email: String!, password: String!, budgets: [String]): Auth
        addBudget(name: String!, limit: Int!): Budget
        addCategory(name: String!, limit: Int!): Category
        addTransaction(amount: Int!, description: String!, date: String): Transaction
    }
`;

module.exports = typeDefs;