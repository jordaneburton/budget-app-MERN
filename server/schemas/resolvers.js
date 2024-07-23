const { query } = require('express');
const { User, Transaction, Budget, Category } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

module.exports = {
    Query: {
        // Dev Query for testing purposes
        devUsers: async () => {
            try {
                return await User.find({}).populate('budgets');
            } catch (error) {
                throw AuthenticationError;
            }
        },

        // user Query only grabs the current user's budgets
        user: async (parent, args) => {
            try {
                const user = await User.findById(args.userID).populate({
                    path: 'budgets',

                    // MIGHT NOT BE NECESSARY WITH 
                    // STRUCTURE OF USER INTERFACE
                    //
                    // populate: {
                    //     path: 'categories',
                    //     populate: {
                    //         path: 'transactions'
                    //     }
                    // }

                });
                if (!user) {
                    throw new Error('User not found');
                }

                return user;

            } catch (error) {
                console.error(error);
                throw new Error(`Error finding user`);
            }
        },

        // budget Query designed to grab all necessary info
        budget: async (parent, args, context) => {
            try {
                if (!context.user) throw AuthenticationError;
                
                const budget = await Budget.findById(args.budgetID).populate({
                    path: 'categories',
                    populate: {
                        path: 'transactions'
                    }
                })
                if (!budget) {
                    throw new Error('Budget not found');
                }

                return budget;

            } catch (error) {
                console.error(error);
                throw new Error(`Error finding budget`);
            }
        }

        // NO QUERIES FOR CATEGORIES OR INDIVIDUAL TRANSACTIONS
        // UNNECESSARY AT THE MOMENT
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
    
            if (!user) {
                throw AuthenticationError;
            }
    
            const correctPw = await user.isCorrectPassword(password);
    
            if (!correctPw) {
                throw AuthenticationError;
            }
    
            const token = signToken(user);
    
            return { token, user };
        },

        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);
                const token = signToken(user);
        
                return { token, user };
        
            } catch (error) {
                throw new Error('Error creating user');
            }
        },
        addBudget: async (parent, args) => {
            try {
                const budget = await Budget.create(args);
                await User.findByIdAndUpdate(args.userID, { $push: { budgets: budget._id } });
        
                return budget;
        
            } catch (error) {
                console.error(error);
                throw new Error('Error creating budget');
            }
        },
        addCategory: async (parent, args) => {
            try {
                const category = await Category.create(args);
                await Budget.findByIdAndUpdate(args.budgetID, { $push: { categories: category._id } });

                return category;

            } catch (error) {
                console.error(error);
                throw new Error('Error creating category');
            }
        },
        addTransaction: async (parent, args) => {
            try {
                const transaction = await Transaction.create(args);
                await Category.findByIdAndUpdate(args.categoryID, { $push: { transactions: transaction._id } });
        
                return transaction;
        
            } catch (error) {
                console.error(error);
                throw new Error('Error creating transaction');
            }
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });  
            }
            
            throw AuthenticationError;
        },
        updateBudget: async (parent, { name, limit }) => {
            return await Budget.findByIdAndUpdate(budgetID, { 
                name: name, 
                limit: limit 
            });
        },
        updateCategory: async (parent, { name, limit }) => {
            return await Category.findByIdAndUpdate(categoryID, { 
                name: name, 
                limit: limit 
            });
        },
        updateTransaction: async (parent, { amount, description, date }) => {
            return await Transaction.findByIdAndUpdate(transactionID, { 
                amount: amount, 
                description: description, 
                date: date 
            });
        },

        deleteUser: async(parent, { userID }) => {
            return await User.findByIdAndDelete(userID, { new: true })
        },
        deleteBudget: async(parent, { budgetID }) => {
            return await Budget.findByIdAndDelete(budgetID, { new: true })
        },
        deleteCategory: async(parent, { categoryID }) => {
            return await Category.findByIdAndDelete(categoryID, { new: true })
        },
        deleteTransaction: async(parent, { transactionID }) => {
            return await Transaction.findByIdAndDelete(transactionID, { new: true })
        }
    }
}