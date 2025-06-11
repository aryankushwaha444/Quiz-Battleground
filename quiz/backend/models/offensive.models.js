import mongoose from "mongoose";

const offensiveSchema = new mongoose.Schema(
    {
        question: {
          type: String,
          required: true,
          unique: true,
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

const Offensive = mongoose.model('Offensive',offensiveSchema);

export default Offensive;  //export the model