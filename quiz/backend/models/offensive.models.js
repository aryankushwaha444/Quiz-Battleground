import mongoose from "mongoose";

const offensiveSchema = new mongoose.Schema({
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

const Offensive = mongoose.model('Offensive',offensiveSchema);

export default Offensive;  //export the model