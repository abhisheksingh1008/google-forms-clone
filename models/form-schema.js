import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  formType: {
    type: String,
    default: "anonymous",
  },
  questions: [
    {
      open: {
        type: Boolean,
        default: false,
      },
      questionText: {
        type: String,
        default: "",
      },
      questionImage: {
        type: String,
        default: "",
      },
      isRequired: {
        type: Boolean,
        default: true,
      },
      options: [
        {
          optionText: {
            type: String,
            default: "",
          },
          optionImage: { type: String, default: "" },
        },
      ],
    },
  ],
});

export default mongoose.models.Form || mongoose.model("Form", formSchema);
