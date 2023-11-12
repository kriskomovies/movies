import {useRef, useState} from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

import styles from "./seriesDropdown.module.scss";


export default function SeriesDropdown({seasons, currentSeason, handleSeasonSelect}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const ref = useRef();

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleSeasonClick(season) {
        handleSeasonSelect(season)
    }

    function displaySeasons() {
        return seasons
            .filter((season) => season !== currentSeason)
            .map((season, idx) => {
                return (
                    <Button
                        key={idx}
                        className={styles.season}
                        onClick={() => handleSeasonClick(season)}
                    >
                        <span>Season: {season}</span>
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
                <span>Seasons : {currentSeason}</span>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <div
                    className={styles.seasonContainer}
                    onMouseLeave={handleClose}
                    ref={ref}
                >
                    {displaySeasons()}
                </div>
            </Popover>
        </div>
    );
}