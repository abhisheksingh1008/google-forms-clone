"use client";

import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

const ResponseItem = ({ formId, response }) => {
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography>Submitted by : </Typography>
        <Typography fontWeight={"bold"}>{response.submittedBy}</Typography>
      </Box>
      <Link href={`/forms/${formId}/${response._id}`}>
        <Button variant="outlined">See details</Button>
      </Link>
    </Box>
  );
};

export default ResponseItem;
