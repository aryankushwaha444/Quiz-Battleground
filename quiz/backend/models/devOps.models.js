import mongoose from "mongoose";

const devOpsSchema = new mongoose.Schema(
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

const devOps = mongoose.model('devOps',devOpsSchema);

export default devOps;  //export the model