import React from "react";
import { ImageList,ImageListItem } from "@mui/material";

interface Props {
  images: string[];
}

function Images({ images }: Props) {
  return (
    <ImageList role="Images" sx={{
      overflow: "auto",
      justifyContent: "center",
      display: "flex",
      flexWrap: "wrap",
      objectFit: "cover",
      cursor: "pointer"
    }} 
    >
      {images?.map((image, index) => (
        <ImageListItem key={index}sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        width: 150,
        padding: 1,
        cursor: "pointer",
        gap: 1
      }}>
          <img src={image} alt="Dog" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default Images;
