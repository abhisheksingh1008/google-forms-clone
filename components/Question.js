"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Question = ({ questionNumber, ques, onChange, onDeleteQuestion }) => {
  const [isRequired, setIsRequired] = useState(ques?.isRequired || true);
  const [questionText, setQuestionText] = useState(ques?.questionText || "");
  const [options, setOptions] = useState(
    ques?.options || [
      {
        optionText: "",
      },
    ]
  );

  const updateOption = (i, e) => {
    setOptions((prev) => {
      prev[i] = {
        optionText: e.target.value,
      };
      return [...prev];
    });
  };

  useEffect(() => {
    onChange(questionNumber, questionText, options, isRequired);
  }, [questionText, options, isRequired]);

  return (
    <Paper elevation={3} sx={{ padding: "1rem", marginBlock: "0.75rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        <TextField
          label="Question"
          variant="filled"
          size="large"
          fullWidth
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <FormControlLabel
          label="Required"
          control={
            <Checkbox
              defaultChecked
              value={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
          }
        />
      </Box>
      {options.map((o, i) => (
        <Box
          key={`question${questionNumber}option${i + 1}`}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBlock: "0.25rem",
            gap: 1,
          }}
        >
          <IconButton>
            <LensOutlinedIcon fontSize="small" />
          </IconButton>
          <TextField
            placeholder={`Option ${i + 1}`}
            variant="standard"
            size="large"
            fullWidth
            value={o.optionText}
            onChange={(e) => updateOption(i, e)}
          />
          <IconButton
            onClick={() =>
              setOptions((prev) => prev.filter((_, ind) => ind !== i))
            }
          >
            <ClearRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Box
        sx={{
          marginTop: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            setOptions((prev) => [
              ...prev,
              {
                optionText: "",
              },
            ])
          }
        >
          Add option
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => onDeleteQuestion(questionNumber)}
        >
          Delete question
        </Button>
      </Box>
    </Paper>
  );
};

export default Question;
