import mongoose from "mongoose";

const defensiveSchema = new mongoose.Schema({
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

const defensive = mongoose.model('defensive',defensiveSchema);

export default defensive;  //export the model