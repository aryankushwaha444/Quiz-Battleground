import mongoose from "mongoose";

const reverseEngineeringSchema = new mongoose.Schema(
    {
        question: {
          type: String,
          required: true,
          unique: true,
        },
        difficulty: {
          type: String,
          require: true,
        },
        answer: {
          type: String,
          required: true,
        },
        option: [
          {
            type: String,
            required: true,
          },
        ],
      },
{
    timeseries:true
})


const reverseEngineering = mongoose.model('reverseEngineering',reverseEngineeringSchema);

export default reverseEngineering;  //export the model