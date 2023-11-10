import {useRef, useState} from "react";
import {Popover} from "@mui/material";
import CarouselItem from "@/components/carousel/item/CarouselItem";
import HoveredMovie from "@/components/hoveredMovie/HoveredMovie";

import styles from "./itemPopover.module.scss";

export default function ItemPopover({item, hasPlayer = true, hasName = false}) {
    const ref = useRef();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleHover = (event) => {
        setAnchorEl(event.target);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-itemPopover' : undefined;

    return (
        <div
            className={styles.container}
        >
            <div
                className={styles.carouselWrapper}
                onClick={handleHover}
            >
                <CarouselItem item={item}/>
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
                        item={item}
                        hasPlayer={hasPlayer}
                        hasName={hasName}
                        handleClose={handleClose}>
                    </HoveredMovie>
                </div>
            </Popover>
        </div>
    );
}