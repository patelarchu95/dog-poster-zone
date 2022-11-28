import { Typography } from "@mui/material";
import React from "react";
import { Container } from "@mui/material";
import grey from "@mui/material/colors/grey";

interface Props {
  showError?: boolean;
  title: string;
  children: React.ReactNode;
}

function Dropdown(props:Props) {
  const{ showError, title, children } = props
  return (
    <Container role="Dropdown">
      <h5>{title}</h5>
      <Container sx={
        {
          display: "flex",
          flexDirection: "column",
          color: grey[900]
        }}>{children}</Container>
      {showError && <Typography>Please choose a breed above</Typography>}
    </Container>
  );
}

export default Dropdown;
