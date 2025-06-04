import mongoose from "mongoose";

const quizBattleground = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps: true
});

const Admin = mongoose.Schema("Admin" , quizBattleground);
export default Admin;