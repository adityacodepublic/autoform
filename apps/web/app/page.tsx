"use client";
import { Card, CardContent, Container, Typography } from "@mui/material";
// import Ant from "../components/Ant";
// import Chakra from "components/Chakra";
// import Mantine from "components/Mantine";
// import Array from "components/Array";
// import Basics from "../components/Basics";
import TestForm from "components/Hook-TestForm";

export default function Home() {
  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Auto Form demo
            </Typography>
            {/* <Basics /> */}
            {/* <Array /> */}
            {/* <Mantine /> */}
            {/* <Shadcn /> */}
            {/* <Ant /> */}
            {/* <Chakra /> */}
            <TestForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
