import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {selectSearchString} from "@/slices/searchSlice";
import MoviesGrid from "@/components/moviesGrid/MoviesGrid";

import styles from "./search.module.scss";

export default function SearchComponent(props) {
    const searchString = useSelector(selectSearchString);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`/api/movies?searchString=${searchString}`)
            .then(response => response.json())
            .then(data => {
                const {movies} = data;
                setMovies(movies)
            })
            .catch((err) => {
                console.log('err => ', err);
            })
    }, [searchString]);

    function fetchMore(){

    }

    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                {movies.length === 0 ?
                    <div>
                        <h2> No results found</h2>
                    </div> :
                    <div>
                        <h2>Search results for: {searchString}</h2>
                    </div>
                }
                <CloseIcon className={styles.closeIcon}/>
            </div>
            <MoviesGrid movies={movies} totalCount={movies.length} fetchData={fetchMore}/>
        </div>
    )
}
