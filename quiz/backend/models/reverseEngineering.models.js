import mongoose from "mongoose";

const reverseEngineeringSchema = new mongoose.Schema({
    question:
    {
        type: String,
        required: true,
       unique:true
    },
   answer:
   {
    type: String,
    required: true,
   },
        option1:
        {
            type: String,
            required: true
        },
        option2:
        {
            type: String,
            required: true
        },
        option3:
        {
            type: String,
            required: true
        },
        option4:
        {
            type: String,
            required: true
        },


},
{
    timeseries:true
})


const reverseEngineering = mongoose.model('reverseEngineering',reverseEngineeringSchema);

export default reverseEngineering;  //export the model