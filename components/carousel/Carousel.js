import React from "react";
import Slider from "react-slick";
import ItemPopover from "@/components/itemPopover/ItemPopover";

import styles from "./carousel.module.scss";

export default function Carousel({movies, settings, hasPlayer= true, hasName = false}) {
    function displayMovies() {
        return movies.map(movie => {
            return (
                <ItemPopover
                    key={movie._id}
                    item={movie}
                    hasPlayer={hasPlayer}
                    hasName={hasName}
                />
            )
        });
    }

    return (
        <div className={styles.slider}>
            <Slider {...settings}>
                {displayMovies()}
            </Slider>
        </div>
    );

}