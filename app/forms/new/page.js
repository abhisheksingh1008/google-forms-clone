"use client";

import * as React from "react";
import { Divider } from "@mui/material";
import NewForm from "@/components/NewForm";
import CreateFormHeader from "@/components/CreateFormHeader";

const page = () => {
  return (
    <>
      <CreateFormHeader title={"Untitled form"} />
      <Divider />
      <NewForm />
    </>
  );
};

export default page;
