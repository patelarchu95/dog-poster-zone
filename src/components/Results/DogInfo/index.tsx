import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { Container } from "@mui/material";

function DogInfo() {
  const dogStore = useSelector((state: RootState) => state.app);
  const breedState = dogStore?.breed;
  const subBreedState = dogStore?.subBreed;
  const imageResultsState = dogStore?.imageResults;

  function capitalizeBreed(string: string) {
    return string.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }
  const renderTitle = () => {
    if (
      breedState !== "all" &&
      subBreedState !== "all" &&
      imageResultsState > 0
    )
      return (
        <span>
          {capitalizeBreed(breedState)} - {capitalizeBreed(subBreedState)}
        </span>
      );
    if (
      breedState !== "all" &&
      subBreedState === "all" &&
      imageResultsState > 0
    )
      return <span>{capitalizeBreed(breedState)}</span>;
    return null;
  };

  return (
    <Container role="DogInfo" sx={{
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: "bold"
    }}>
      <>
        {renderTitle()}
        <p>{imageResultsState} results</p>
      </>
    </Container>
  );
}

export default DogInfo;
