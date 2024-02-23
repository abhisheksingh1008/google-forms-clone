"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Tabs,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabPanel from "@/components/TabPanel";
import toast from "react-hot-toast";
import EditForm from "@/components/EditForm";
import Responses from "@/components/Responses";
import CreateFormHeader from "@/components/CreateFormHeader";

const page = ({ params }) => {
  const formId = params.formId;

  const [value, setValue] = useState(0);
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          toast.error(err?.response?.data?.message);
        });
      setLoading(false);
    };

    fetchForm();
  }, [formId]);

  return (
    <>
      <CreateFormHeader title={form?.title || "Untitled form"} />
      <Box sx={{ margin: "1rem auto", padding: "0 0.5rem", maxWidth: "35rem" }}>
        {form && (
          <Box>
            <Tabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              aria-label="disabled tabs example"
              centered
            >
              <Tab label="Questions" {...a11yProps(0)} />
              <Tab label="Responses" {...a11yProps(1)} />
            </Tabs>
            <TabPanel index={0} value={value}>
              <EditForm form={form} />
            </TabPanel>
            <TabPanel index={1} value={value}>
              <Responses formId={formId} />
            </TabPanel>
          </Box>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
