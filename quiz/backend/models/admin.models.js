import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique:true,
        length:5
     },
    password:{
        type:String,
        required:true,
        length:5
    }
},
{
    timestamps: true
});

const Admin = mongoose.Schema("Admin" , adminSchema);
export default Admin;