import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {setSearchString} from "@/slices/searchSlice";
import Popover from "@mui/material/Popover";
import CarouselItem from "@/components/carousel/item/CarouselItem";
import HoveredMovie from "@/components/hoveredMovie/HoveredMovie";

import styles from "./itemPopover.module.scss";

export default function ItemPopover({movie, hasPlayer = true, hasName = false}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const ref = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const {_id} = movie;
    const onMovieClick = async (event) => {
        if(hasName){
            await handleClick();
            return;
        }
        setAnchorEl(event.target);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleClick() {
        await dispatch(setSearchString(''))
        handleClose();
        await router.push(`/movie/${_id}`);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-itemPopover' : undefined;

    return (
        <div
            className={styles.container}
        >
            <div
                className={styles.carouselWrapper}
                onClick={onMovieClick}
            >
                <CarouselItem
                    movie={movie}
                    hasName={hasName}
                />
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center'
                }}
            >
                <div className={styles.box} onMouseLeave={handleClose} ref={ref}>
                    <HoveredMovie
                        movie={movie}
                        hasPlayer={hasPlayer}
                        hasName={hasName}
                        handleClick={handleClick}>
                    </HoveredMovie>
                </div>
            </Popover>
        </div>
    );
}