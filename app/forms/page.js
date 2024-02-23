"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import Header from "@/components/Header";
import FormItem from "@/components/FormItem";
import Link from "next/link";

const page = () => {
  const [forms, setForms] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchForms = async () => {
    if (hasMore) {
      setLoading(true);
      await axios
        .get(`/api/forms?page=${page}`)
        .then((res) => {
          // console.log(res.data);
          setForms(res.data.forms);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: { xs: "0.25rem", sm: "0.5rem", md: "1rem" },
          gap: 1,
        }}
      >
        <NewFormButton />
        {forms.map((f) => (
          <FormItem
            id={f._id}
            key={f?._id}
            formTitle={f?.title}
            formDescription={f?.formDescription}
          />
        ))}
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

const NewFormButton = ({ onClick }) => {
  return (
    <Link href={"/forms/new"}>
      <Box
        sx={{
          borderRadius: "6px",
          border: "1px solid #ccc",
          padding: "1.25rem 1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "black",
        }}
      >
        <Typography fontSize="3rem">+</Typography>
        <Typography fontWeight="semi-bold">Create New</Typography>
      </Box>
    </Link>
  );
};
