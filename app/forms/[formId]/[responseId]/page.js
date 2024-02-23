"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
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

const page = ({ params }) => {
  const responseId = params.responseId;

  const [form, setForm] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResponse = async () => {
      setError("");
      setLoading(true);
      await axios
        .get(`/api/forms/responses/${responseId}`)
        .then((res) => {
          // console.log(res.data);
          setForm(res?.data?.form);
          setResponse(res?.data?.response);
        })
        .then((err) => {
          console.log(err);
          setError(err?.response?.data?.message);
          toast.error(err?.response?.data?.message);
        });
      setLoading(false);
    };

    fetchResponse();
  }, [responseId]);

  return (
    <>
      <Box
        sx={{
          margin: "1rem auto",
          padding: "0 0.5rem",
          maxWidth: "35rem",
        }}
      >
        {form && response && (
          <form>
            <Paper
              elevation={0}
              sx={{
                marginBlock: "1rem",
                border: "1px solid #ccc",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  padding: { xs: "1rem", md: "1rem 1.5rem" },
                }}
              >
                {form.title}
              </Typography>
              <Divider />
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  padding: { xs: "1rem", md: "0.5rem 1.5rem" },
                }}
              >
                {form.description}
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
              <FormLabel
                htmlFor="name"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                Submitted By
              </FormLabel>
              <Typography>{response.submittedBy}</Typography>
            </Paper>
            {form.questions.map((q) => {
              const questionResponse = response.response.find(
                (r) => q?._id === r?.questionId
              );

              const selectedOption = q.options.find(
                (o) => o?._id === questionResponse?.optionId
              );

              return (
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
                    <RadioGroup value={selectedOption?.optionText || ""}>
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
              );
            })}
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

export default page;
