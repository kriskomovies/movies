import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setSearchString} from "@/slices/searchSlice";
import {Button, Popover} from "@mui/material";
import axios from 'axios';

import styles from "./genresDropdown.module.scss";

export default function GenresDropdown(props) {
    const router = useRouter();
    const [genres, setGenres] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const ref = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`/api/genres`, {})
            .then((res) => {
                const {genres} = res.data;
                setGenres(genres)
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    async function handleGenreClick({_id}) {
        await dispatch(setSearchString(''));
        await router.push(`/genres/${_id}`);
    }

    function displayGenres() {
        return genres.map((genre, idx) => {
            const {name} = genre;
            return (
                <Button
                    key={idx}
                    className={styles.genre}
                    onClick={() => handleGenreClick(genre)}
                >
                    {name}
                </Button>
            )
        })
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-itemPopover' : undefined;


    return (
        <div className={styles.container}>
            <Button
                className={styles.button}
                onClick={handleClick}>
                <span>Genres</span>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center'
                }}
            >
                <div className={styles.genreContainer} onMouseLeave={handleClose} ref={ref}>
                    {displayGenres()}
                </div>
            </Popover>
        </div>
    );
}