"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

const NewForm = ({ params }) => {
  const formId = params.formId;
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      setError("");
      setLoading(true);
      await axios
        .get(`/api/forms/${formId}`)
        .then((res) => {
          // console.log(res.data);
          setForm(res?.data?.form);
        })
        .then((err) => {
          console.log(err);
          setError(err?.response?.data?.message);
          // toast.error(err?.response?.data?.message);
        });
      setLoading(false);
    };

    fetchForm();
  }, [formId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(answers);
    if (userName.trim() === "") {
      toast.error("Name is required");
      return;
    }
    for (let i = 0; i < form?.questions?.length; i++) {
      const q = form?.questions[i];
      const ans = answers[i];
      if (q.isRequired && !ans) {
        toast.error("Please answer all the required questions");
        return;
      }
    }
    setLoading(true);
    await axios
      .post("/api/forms/responses", {
        response: {
          formId: formId,
          submittedBy: userName,
          response: answers,
        },
      })
      .then((res) => {
        // console.log(res.data);
        toast.success(res?.data?.message);
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      });
    setLoading(false);
  };

  return (
    <>
      <Box sx={{ margin: "1rem auto", padding: "0 0.5rem", maxWidth: "35rem" }}>
        {form && (
          <form onSubmit={onSubmit}>
            <Paper
              elevation={0}
              sx={{
                marginBlock: "1rem",
                border: "1px solid #ccc",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  padding: { xs: "1rem", md: "1rem 1.5rem" },
                }}
              >
                {form.title}
              </Typography>
              <Divider />
              <Typography
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  padding: { xs: "1rem", md: "0 1.5rem" },
                }}
              >
                {form.description}
              </Typography>
              <Typography
                sx={{
                  mb: "1rem",
                  fontWeight: "bold",
                  padding: { xs: "1rem", md: "0 1.5rem" },
                  textDecoration: "underline",
                }}
              >
                Questions marked as * are required.
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                padding: { xs: "1rem", md: "2rem" },
                marginBlock: "1rem",
                border: "1px solid #ccc",
              }}
            >
              <FormControl required>
                <FormLabel
                  htmlFor="name"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  Name
                </FormLabel>
                <TextField
                  id="name"
                  placeholder={"Enter your name"}
                  variant="filled"
                  size="medium"
                  fullWidth
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>
            </Paper>
            {form.questions.map((q, i) => (
              <Paper
                key={q?._id}
                elevation={0}
                sx={{
                  padding: { xs: "1rem", md: "2rem" },
                  marginBlock: "1rem",
                  border: "1px solid #ccc",
                }}
              >
                <FormControl required={q?.isRequired}>
                  <FormLabel
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                    }}
                  >
                    {q.questionText}
                  </FormLabel>
                  <RadioGroup
                    onChange={(e) => {
                      setAnswers((prev) => {
                        prev[i] = {
                          questionId: q._id,
                          optionId: e.target.id,
                        };
                        return [...prev];
                      });
                    }}
                  >
                    {q.options.map((o) => (
                      <FormControlLabel
                        key={o?._id}
                        value={o.optionText}
                        label={o.optionText}
                        control={<Radio id={o?._id} />}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
            ))}
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "0.5rem", width: "100%" }}
            >
              Submit
            </Button>
          </form>
        )}
        {error && <Typography>{error}</Typography>}
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

export default NewForm;
