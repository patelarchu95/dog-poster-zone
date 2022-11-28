import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { RootState } from "./reducers";
import Container from '@mui/material/Container';
import { DogForm } from './components/DogForm';
import { fetchDogsData, fetchDogsSubBreed } from "./lib/api";
import Loader from "./components/Loader";

function App() {

  const [breedList, setBreedList] = useState(null);
  const [subBreedList, setSubBreedList] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dogStore = useSelector((state: RootState) => state.app);

  const breedState = dogStore?.breed;

  const fetchData = useCallback(async () => {
    await fetchDogsData()
      .then((data) => {
        setBreedList(data?.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    if (breedState !== "all") {
      await fetchDogsSubBreed(breedState)
        .then((data) => {
          setSubBreedList(data?.message);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [breedState]);

  useEffect(() => {
    fetchData();
  }, [breedState, fetchData]);

  if (isLoading) return <Loader />;
  if (!breedList) return <p>No Dogs Found</p>;


  return (

    <React.Fragment>
      <CssBaseline />
      <Container>
        <DogForm
          breedList={breedList}
          setBreedList={setBreedList}
          subBreedList={subBreedList}
          images={images}
          setImages={setImages}
          setIsLoading={setIsLoading} />
      </Container>
    </React.Fragment>

  );
}

export default App;
