import mongoose from "mongoose";

const devOpsSchema = new mongoose.Schema({
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

const devOps = mongoose.model('devOps',devOpsSchema);

export default devOps;  //export the model