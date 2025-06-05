import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        
        required: true
     },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps: true
});

const Admin = mongoose.Schema("Admin" , adminSchema);
export default Admin;