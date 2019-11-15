const bcrypt = require('bcrypt');
const { getClientByEmail } = require('../services/ClientService');
const createToken = require('./createToken');

const authenticate = ({email, password}) => {
    return new Promise((resolve,reject) => {
        getClientByEmail(email).then( user => {
            if(!user) reject(new Error('Client not Exist'));
            bcrypt.compare(password, user.password, (err,isValid)=> {
                if(err) reject(new Error('Error to compare'));
                isValid ? resolve(createToken(user)) 
                    : reject(new Error('Incorrect Password'));
            });
        });
    });
};

module.exports = authenticate;