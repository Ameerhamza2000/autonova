const mongoose=require('mongoose');


const vehicleSchema=new mongoose.Schema({
    brand:String,
    model:String,
    fuelCapacity:String,
    owner:String
});

const Vehicle=mongoose.model('vehicle',vehicleSchema);

module.exports=Vehicle;