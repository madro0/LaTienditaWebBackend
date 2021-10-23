
const parseMessageError = (error=>{
    try {
        const errObj = {};
            error.errors.map(err=>{
               errObj[err.path] = err.message;
            //    errObj.push(er.message);
        })
        return  errObj;
    } catch (e) {
        return error;
    }
});

module.exports = {
    parseMessageError
}