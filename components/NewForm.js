"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/providers/AuthProvider";
import Question from "./Question";

const NewForm = () => {
  const router = useRouter();
  const { userName, email } = useAuth();

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      isRequired: true,
      questionText: "",
      options: [],
    },
  ]);

  const handleUpdate = (
    questionNumber,
    questionText,
    updatedOptions,
    isRequired
  ) => {
    setQuestions((prev) => {
      prev[questionNumber] = {
        isRequired,
        questionText,
        options: updatedOptions,
      };
      return [...prev];
    });
  };

  const onSave = async () => {
    if (!userName && !email) {
      toast.error("Please login to create new form.");
      return;
    }

    for (let i = 0; i < questions?.length; i++) {
      const q = questions[i];
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

    await axios
      .post("/api/forms", {
        formData: {
          createdBy: email,
          title: formTitle,
          description: formDescription,
          questions,
        },
      })
      .then((res) => {
        // console.log(res.data);
        toast.success(res?.data?.message);
        router.replace("/forms");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteQuestion = (questionNumber) => {
    console.log(questionNumber);
    setQuestions((prev) => prev.filter((_, i) => i !== questionNumber));
  };

  return (
    <Box sx={{ margin: "1rem auto", padding: "0 0.5rem", maxWidth: "35rem" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "1rem",
          marginBlock: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" sx={{ width: "100%" }} onClick={onSave}>
          Create
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: "0.75rem", width: "100%" }}
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
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Form description"
          variant="standard"
          size="large"
          fullWidth
          value={formDescription}
          sx={{ marginTop: "1rem" }}
          onChange={(e) => setFormDescription(e.target.value)}
        />
      </Paper>
      {questions.map((_, i) => (
        <Question
          key={`question${i + 1}`}
          onChange={handleUpdate}
          questionNumber={i}
          onDeleteQuestion={onDeleteQuestion}
        ></Question>
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            setQuestions((prev) => [
              ...prev,
              {
                isRequired: true,
                questionText: "",
                options: [],
              },
            ])
          }
          sx={{ marginTop: "0.5rem" }}
        >
          New question
        </Button>
      </Box>
    </Box>
  );
};

export default NewForm;
