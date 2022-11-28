import React, { useState } from "react";
import Container from '@mui/material/Container';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dropdown from './Dropdown';
import { RootState } from '../reducers';
import { renderBreed, renderNumber, renderSubBreed } from '../helpers';
import { BreedsType } from '../types/breed';
import Modal from '@mui/material/Modal';
import Results from "./Results";
import { ActionType } from "../types/reducer";
import { fetchBreedImages, fetchSubBreedImages } from "../lib/api";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
interface Props {
    breedList: BreedsType;
    subBreedList: string[];
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<never[]>>;
    setBreedList: React.Dispatch<React.SetStateAction<null>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function HOC(Props: any) {
    const Cmp = Props.cmp
    return (<Cmp hocData={"Dog Poster Generator"} />)
}
function Heading(p: any) {
    return <h1>{p.hocData}</h1>
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const DogForm = ({ breedList, subBreedList, images, setImages, setIsLoading, setBreedList }: Props) => {

    const dispatch = useDispatch();

    const dogStore = useSelector((state: RootState) => state.app);
    const imageResultState = dogStore?.imageResults;
    const breedState = dogStore?.breed;
    const subBreedState = dogStore?.subBreed;
    const numberState = dogStore?.number;
    const errorState = dogStore?.error;
    const ArraySTate = dogStore?.items;

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const addcomponent = async () => {
       
        const obj = {
            breedState,
            subBreedState,
            numberState,
        }
        if (obj.breedState !== "all") {
            dispatch({
                type: ActionType.items,
                payload: { ...obj },
            });
        }
    }


    const currentImageIndex = async (item:any) => {
        if (item.breedState !== "all") {
            setOpen(true);
        }
        if (item.breedState === "all") {
            dispatch({
                type: ActionType.ERROR,
                payload: true,
            });
        }
      
        if (item.breedState !== "all" && item.subBreedState === "all") {
            await fetchBreedImages(item.breedState, item.numberState)
                .then((data) => {
                    console.log(data,'data')
                    if (data?.status === "success" && data?.message?.length) {
                        setImages(data?.message);
                        setIsLoading(false);
                        dispatch({
                            type: ActionType.IMAGE_RESULTS,
                            payload: data?.message.length,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (item.breedState !== "all" && item.subBreedState !== "all") {
            await fetchSubBreedImages(item.breedState, item.subBreedState, item.numberState)
                .then((data) => {
                    if (data?.status === "success" && data?.message?.length) {
                        setImages(data?.message);
                        setIsLoading(false);
                        dispatch({
                            type: ActionType.IMAGE_RESULTS,
                            payload: data?.message.length,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        renderBreed(item.breedState, dispatch)
        renderSubBreed(item.subBreedState, dispatch)
        renderNumber(item.numberState, dispatch);
    }

    const handleImagesFetch = async () => {
        
        if (breedState !== "all") {
            setOpen(true);
        }
        if (breedState === "all") {
            dispatch({
                type: ActionType.ERROR,
                payload: true,
            });
        }
        if (breedState !== "all" && subBreedState === "all") {
            await fetchBreedImages(breedState, numberState)
                .then((data) => {
                    console.log(data,'data')
                    if (data?.status === "success" && data?.message?.length) {
                        setImages(data?.message);
                        setIsLoading(false);
                        dispatch({
                            type: ActionType.IMAGE_RESULTS,
                            payload: data?.message.length,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (breedState !== "all" && subBreedState !== "all") {
            await fetchSubBreedImages(breedState, subBreedState, numberState)
                .then((data) => {
                    if (data?.status === "success" && data?.message?.length) {
                        setImages(data?.message);
                        setIsLoading(false);
                        dispatch({
                            type: ActionType.IMAGE_RESULTS,
                            payload: data?.message.length,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <Container role="DogForm"
            sx={{
                minHeight: "50vh",
                minWidth: "50vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
                backgroundColor: "#D1D1D1",
                borderRadius: 10,
                py: 2,
                my: 2,
            }}
        >
            <Box sx={{ width: '100%',padding:'5',textAlign:'center',backgroundColor:'#1abc9c',color:'white' }}>
                <HOC cmp={Heading} />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2.5}>
                        <Item>
                            <Dropdown title="Select a Breed" showError={errorState}>
                                <select
                                    onChange={(e) => renderBreed(e.target.value, dispatch)}
                                    value={breedState}
                                >
                                    <option value="all">Select Breeds</option>

                                    {breedList &&
                                        Object.keys(breedList)?.map((breed, index) => (
                                            <option value={breed} key={index}>
                                                {breed}
                                            </option>
                                        ))}
                                </select>{" "}
                            </Dropdown>

                        </Item>
                    </Grid>
                    <Grid item>
                        {subBreedList?.length ? (
                            <Item>
                                <Dropdown title="Select a Sub Breed">
                                    <select
                                        onChange={(e) => renderSubBreed(e.target.value, dispatch)}
                                        value={subBreedState}
                                    >
                                        <option value="all">Select Sub Breed</option>
                                        {subBreedList?.length &&
                                            subBreedList?.map((subBreed: string, index: number) => (
                                                <option value={subBreed} key={index}>
                                                    {subBreed}
                                                </option>
                                            ))}
                                    </select>{" "}
                                </Dropdown>
                            </Item>
                        ) : null}
                    </Grid>
                    <Grid item xs={2.5}>
                        <Item>
                            <Dropdown title="Images Count">
                                <select
                                    onChange={(e) => renderNumber(e.target.value, dispatch)}
                                    value={numberState}
                                >
                                    <option value="all">Select Sub Breed</option>
                                    {Array.from({ length: 50 }, (_, index) => (
                                        <option value={index + 1} key={index}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>{" "}

                            </Dropdown>
                        </Item>
                    </Grid>
                    <Grid item xs={1}>
                        <Item><Button onClick={() => addcomponent()}>+</Button></Item>
                    </Grid>
                    <Grid item xs={1.5}>
                        <Item>
                            <Button onClick={() => handleImagesFetch()}>Generate</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    {imageResultState > 0 && <Results images={images} />}
                                </Box>
                            </Modal>
                        </Item>
                    </Grid>
                </Grid>
            </Box>


            <Box sx={{ width: '100%' }}>             
                    {
                        ArraySTate.map((item: any, index: any) => {
                            return (
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} key={index} marginTop={1}>
                                    {item.breedState?.length && item.breedState != "all" ? (
                                    <Grid item xs={2.5}>
                                        <Item>
                                            {item.breedState}
                                        </Item>
                                    </Grid>
                                     ) : null}
                                    {item.subBreedState?.length && item.subBreedState != "all" ? (
                                    <Grid item xs={2.5}>
                                        <Item>
                                            {item.subBreedState}
                                        </Item>
                                    </Grid>
                                    ) : null}
                                    {item.numberState?.length && item.numberState != "1"? (
                                    <Grid item xs={2.5}>
                                        <Item>
                                            {item.numberState}
                                        </Item>
                                    </Grid>
                                    ) : null}
                                    {item.breedState?.length && item.breedState != "all"? (
                                    <Grid item xs={2.5} >
                                        <Item >
                                            <Button onClick={() => currentImageIndex(item)} sx={{ padding: 0 }}>Generate</Button>
                                        </Item>
                                    </Grid>
                                    ) : null}
                                </Grid>
                            )
                        })
                    }
            </Box>
        </Container>

    )
}