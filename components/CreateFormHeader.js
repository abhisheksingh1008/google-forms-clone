"use client";

import Link from "next/link";
import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "@/providers/AuthProvider";
import AppIcon from "./AppIcon";

const CreateFormHeader = ({ title }) => {
  const { name, image } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: "0.25rem", sm: "0.5rem", md: "1rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Link href={"/forms"}>
          <AppIcon width={"48"} height={"50"} />
        </Link>
        <Typography variant="h6" fontWeight={"bolder"}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Avatar alt={name} src={image} />
      </Box>
    </Box>
  );
};

export default CreateFormHeader;
