"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  if (session && session.user) {
    // router.replace('/froms')
  }

  return (
    <>
      <Header />
      <Container sx={{ textAlign: "center", paddingBlock: "3rem" }}>
        <Typography fontSize={"3.5rem"} fontWeight={"bold"}>
          Get insights quickly, with Google Forms
        </Typography>
        <Typography fontSize={"1.5rem"} my={0} color={"#858282"}>
          Easily create and share online forms and surveys, and analyze
          responses in real-time.
        </Typography>
        {!session?.user && (
          <Typography fontSize={"1.25rem"} my={4}>
            Create your first form, sign in to continue
          </Typography>
        )}
        <Box my={4}>
          {session?.user ? (
            <Link href={"/forms"}>
              <Button variant="outlined">Go to forms</Button>
            </Link>
          ) : (
            <Button variant="contained" onClick={signIn}>
              Sign In
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
}
