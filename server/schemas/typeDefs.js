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

        updateUser(userID: ID, email: String, username: String): User
        updateBudget(budgetID: ID, name: String, limit: Int): Budget
        updateCategory(categoryID: ID, name: String, limit: Int): Category
        updateTransaction(transactionID: ID, amount: Int, description: String, date: String): Transaction

        deleteUser(userID: ID): User
        deleteBudget(budgetID: ID): Budget
        deleteCategory(categoryID: ID): Category
        deleteTransaction(transactionID: ID): Transaction
    }
`;

module.exports = typeDefs;