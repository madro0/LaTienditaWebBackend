const jwt = require('jsonwebtoken');
const { response } = require('../controllers');


let verifyToken =async (req, res = response, next) => {
    let token =await req.get('Authorization');
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxNzRkNjYtMWUzMS00ODFiLThmYTAtOWJlNWI1YmVhNzhmIiwibmFtZSI6IkRhbmllbCIsImVtYWlsIjoiZGFhbmlpMjAxM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ0cUJVV3IzT1F4ZTFMQkVUUFJvM3FPckxHMFlzbVFmdkxMVXlIbC9LVDcxbkF3ZlpleDQwNiIsInJvbGUiOiJVU0VSX0FETUlOIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIxLTEwLTExVDAxOjUxOjU1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTEwLTExVDAxOjUxOjU1LjAwMFoifSwiaWF0IjoxNjM0Nzg4OTQxLCJleHAiOjE2MzQ3OTYxNDF9.i2cl5mW2K5e5JHK1Y7_YTtFKu0tkUS0VMUASz_f0bVw";
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        jwt.verify(token, process.env.SEED, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    err: {
                        massage: err.message || "Autorization (token) invalid"
                    }
                });
            }
            req.user = decode.user;
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    
    next();
}


module.exports = {
    verifyToken
}