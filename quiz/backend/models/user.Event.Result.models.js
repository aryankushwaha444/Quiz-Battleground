import mongoose from "mongoose";

const userEvent = mongoose.Schema({
    nameName:{
        type:String,
        required:true
    },
    nameUser:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
    },
    correct:{
        type:Number,
    },
    score:{
        type:Number,
        required:true
    },
    wins:{
        type:Number,
    },
    prize:{
        type:Number,
    },
    prizeName:String,
    prizeImage:String,

},
{
    timestamps:true
});

const UserEvent = mongoose.model("UserEvent", userEvent);

export default UserEvent;