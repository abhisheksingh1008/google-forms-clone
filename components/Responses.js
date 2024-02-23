"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import ResponseItem from "./ResponseItem";

const Responses = ({ formId }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      setError("");
      setLoading(true);
      await axios
        .get(`/api/forms/responses?formId=${formId}`)
        .then((res) => {
          // console.log(res.data);
          setResponses(res?.data?.responses);
        })
        .then((err) => {
          console.log(err);
          setError(err?.response?.data?.message);
          toast.error(err?.response?.data?.message);
        });
      setLoading(false);
    };

    fetchForm();
  }, [formId]);

  return (
    <>
      <Box sx={{ margin: "1rem auto", padding: "0 0.5rem", maxWidth: "35rem" }}>
        {responses.map((r) => (
          <>
            <ResponseItem key={r._id} formId={formId} response={r} />
            <Divider />
          </>
        ))}
        {!loading && !error && !responses.length && (
          <Typography>No responses yet</Typography>
        )}
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

export default Responses;
