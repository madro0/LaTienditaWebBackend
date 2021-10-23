const { parseMessageError } = require('../helpers/errorsHelper');
const ProviderModel = require('../models/providerModel');

const createProvider= async(req, res)=>{
    let body = req.body;

    const provider ={
        name: body.name,
        phone: body.phone,
        address: body.address
    };

    try {
        const providerDB = await ProviderModel.create(provider);
        if(providerDB){
            res.json({
                ok: true,
                provider: providerDB
            });
        }
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || 'Some error occurred while creating the provider'
        })
    }
};
const getAllProviders = async(req, res)=>{
    try {
        const providersDb = await ProviderModel.findAll();
        if(providersDb){
            res.json({
                ok:true,
                providers: providersDb
            })
        }
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || 'Some error occurred while creating the provider'
        })
    }
}

module.exports = {
    createProvider,
    getAllProviders
}