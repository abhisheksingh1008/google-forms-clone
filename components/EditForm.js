"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import Question from "./Question";
import { useAuth } from "@/providers/AuthProvider";

const EditForm = ({ form }) => {
  const router = useRouter();
  const { userName, email } = useAuth();

  const [updatedForm, setUpdatedForm] = useState(form);
  const [loading, setLoading] = useState(false);

  const onSave = async (e) => {
    e.preventDefault();
    if (!userName && !email) {
      toast.error("Please login to create new form.");
      return;
    }

    for (let i = 0; i < updatedForm.questions?.length; i++) {
      const q = updatedForm.questions[i];
      if (q?.questionText?.trim() === "") {
        toast.error("Questions cannot be empty.");
        return;
      }
      for (let j = 0; j < q?.options?.length; j++) {
        const ot = q?.options[j]?.optionText;
        if (ot?.trim() === "") {
          toast.error("Options cannot be empty.");
          return;
        }
      }
    }

    setLoading(true);
    await axios
      .put("/api/forms", {
        formId: form._id,
        formData: updatedForm,
      })
      .then((res) => {
        // console.log(res.data);
        toast.success(res?.data?.message);
        router.back();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);
    await axios
      .delete(`/api/forms/${form?._id}`)
      .then((res) => {
        // console.log(res.data);
        toast.success(res?.data?.message);
        router.back();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
    setLoading(false);
  };

  const handleUpdate = (
    questionNumber,
    questionText,
    updatedOptions,
    isRequired
  ) => {
    setUpdatedForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) => {
        if (questionNumber === i) {
          return {
            ...q,
            isRequired,
            questionText,
            options: updatedOptions,
          };
        } else return q;
      }),
    }));
  };

  const onDeleteQuestion = (questionNumber) => {
    setUpdatedForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q, i) => i !== questionNumber),
    }));
  };

  return (
    <>
      <Box sx={{ margin: "1rem auto", padding: "0 0.5rem", maxWidth: "35rem" }}>
        <form onSubmit={onSave}>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              marginBlock: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              Save
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ width: "100%" }}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Paper>
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <TextField
              id="standard-basic"
              label="Form title"
              variant="standard"
              size="large"
              fullWidth
              value={updatedForm.title}
              onChange={(e) => {
                setUpdatedForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
            <TextField
              id="standard-basic"
              label="Form description"
              variant="standard"
              size="large"
              fullWidth
              value={updatedForm.description}
              sx={{ marginTop: "1rem" }}
              onChange={(e) => {
                setUpdatedForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </Paper>
          {updatedForm.questions.map((q, i) => (
            <Question
              key={`question${i + 1}`}
              ques={q}
              questionNumber={i}
              onChange={handleUpdate}
              onDeleteQuestion={onDeleteQuestion}
            ></Question>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              startIcon={<AddIcon />}
              onClick={() =>
                setUpdatedForm((prev) => ({
                  ...prev,
                  questions: [
                    ...prev.questions,
                    {
                      isRequired: true,
                      questionText: "",
                      options: [],
                    },
                  ],
                }))
              }
              sx={{ marginTop: "0.5rem" }}
            >
              New question
            </Button>
          </Box>
        </form>
      </Box>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default EditForm;
