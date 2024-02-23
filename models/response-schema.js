import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
  submittedBy: {
    type: String,
    required: true,
  },
  response: [
    {
      questionId: {
        type: String,
        required: true,
      },
      optionId: {
        type: String,
        default: "",
      },
    },
  ],
});

export default mongoose.models.Response ||
  mongoose.model("Response", responseSchema);
