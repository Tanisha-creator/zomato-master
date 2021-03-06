import express from "express";
import { FoodModel } from "../../database/Food";
const Router = express.Router();

/* 
Route         /
Descrip       GET all foods based on particular restaurants
Params        _id
Access        Public 
Method        GET
*/
Router.get("/:_id", async(req,res) =>{
try {
    const {_id} = req.params;
    const foods = await FoodModel.find({ restaurant: _id});

    return res.json({foods});
} catch (error) {
    return res.status(500).json({error: error.message});
}
});

/* 
Route         /r
Descrip       GET all foods based on particular category
Params        category
Access        Public 
Method        GET
*/
Router.get("/r/:category", async(req,res) =>{
    try {
        const {category} = req.params;
        const foods = await FoodModel.find({
        category: {$regex: category, $options:"i"}
});
return res.json({foods});
}
   catch (error) {
   return res.status(500).json({error: error.message});
    }
});

export default Router;