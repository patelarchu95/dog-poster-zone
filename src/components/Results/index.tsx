import React from "react";
import DogInfo from "./DogInfo";
import Images from "./Images";
import { Container } from "@mui/material";

interface Props {
  images: string[];
}

function Results({ images }: Props) {
  return (
    <Container>
      <DogInfo />
      <Images images={images} />
    </Container>
  );
}

export default Results;
