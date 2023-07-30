const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    title: String,
    date: Date,
    details: String,
    resolved: Boolean,
    vehicle_id: {
        type: mongoose.Types.ObjectId,
        ref: "vehicle"
    },
    // owner_id: // user Object id
});

module.exports = mongoose.model('task', Task);

/* 
    - vehicle_id is using an OBjectId type as its data.
    - In this case, referencing another collection (Vehicle)
*/