const jwt= require('jsonwebtoken');

const generateJWT = (user)=>{
    return new Promise((resolve, rejact)=>{
        jwt.sign(user, process.env.SEED,{expiresIn:'2h'}, (err, token)=>{
            if(err){
                console.log(err)
                rejact('cannot generate the new token');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}