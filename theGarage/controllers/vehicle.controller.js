const router = require('express').Router();
const { Vehicle } = require('../models');
const { error, success, incomplete } = require('../helpers');

//! CREATE
router.post('/', async (req, res) => {
    try {
        
        // console.log(potato)
        const {
            make, model, year, color
        } = req.body;

        if(!make) throw new Error('Please input a vehicle make.');

        const vehicle = new Vehicle({
            make, model, year, color
        });

        const newVehicle = await vehicle.save();

        newVehicle ?
            success(res, newVehicle) :
            incomplete(res);

    } catch (err) {
        // res.status(500).json({
        //     Error: err.message
        // })
        error(res, err);
    }
});

//! GET All
router.get('/', async (req, res) => {
    try {
        
        const vehicles = await Vehicle.find();

        vehicles ? success(res, vehicles) : incomplete(res);

    } catch (err) {
        error(res,err);
    }
});

module.exports = router;