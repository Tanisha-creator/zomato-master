import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: {type=String, required= true},
    decription: {type= String, required= true},
    isveg:{type= Boolean, required=true},
    iscontainegg:{type= Boolean,required= true},
    categoty:{type=String, required= true},
    Photos:{
        type: mongoose.Types.ObjectId,
        ref: "Images"
    },
    price: {type: Number, default: 150, required: true},
    addOns: [{
        type: mongoose.Types.ObjectId,
        ref: "Foods"
    }],
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants"
    }

},
{
    timestamps: true
});

export const FoodModel = mongoose.model("Foods", FoodSchema);