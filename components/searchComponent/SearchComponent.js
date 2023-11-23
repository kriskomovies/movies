import {useDispatch, useSelector} from "react-redux";
import {selectSearchString, setSearchString} from "@/slices/searchSlice";
import MoviesGrid from "@/components/moviesGrid/MoviesGrid";
import {useGetMoviesBySearchQuery} from "@/slices/moviesGridApi";
import Loader from "@/components/loader/Loader";
import CloseIcon from "@mui/icons-material/Close";
import {EMPTY_STRING} from "@/lib/helpers";

import styles from "./search.module.scss";
export default function SearchComponent(props) {
    const searchString = useSelector(selectSearchString);
    const dispatch = useDispatch();
    const {data, error, isLoading} = useGetMoviesBySearchQuery(searchString, {skip: searchString === EMPTY_STRING});

    if (isLoading) {
        return <Loader/>
    }

    const {movies} = data;

    const fetchMore = () => {

    }

    const handleClose = () => {
        setTimeout(() => {
            dispatch(setSearchString(""));
        }, 500)
    }

    const moviesFound = movies.length === 0;
    return (
        <div className={styles.container}>
            <div className={styles.containerHeader}>
                {
                    moviesFound ?
                        <div>
                            <h2> No results found</h2>
                        </div> :
                        <div>
                            <h2>Search results for: {searchString}</h2>
                        </div>
                }
                <CloseIcon className={styles.closeIcon} onClick={handleClose}/>
            </div>
            <MoviesGrid
                movies={movies}
                totalCount={movies.length}
                fetchData={fetchMore}
            />
        </div>
    )
}
