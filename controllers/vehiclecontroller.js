const Vehicle=require('../models/vehicle');

const vehicleController=async(req,res)=>{
    try{
        console.log("vehicle route hit");
        let vehicle=new Vehicle({
            brand:req.body.brand,
            model:req.body.model,
            fuelCapacity:req.body.fuelCapacity,
            owner:req.user._id
        })

        vehicle= await vehicle.save();
        res.status(201).json({vehicle:vehicle,message:"vehicle added"})
        

    }
    catch(error){
        res.status(500).json({message:"Error while adding vehicle ", error});
    }
}

module.exports=vehicleController;