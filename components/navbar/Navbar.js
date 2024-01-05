import {useRouter} from "next/router";
import Link from "next/link";
import GenresDropdown from "@/components/genres/GenresDropdown";
import SearchBar from "@/components/searchBar/SearchBar";
import {ANIME, MOVIE, SERIE} from "@/constants/moviesTypes";
import {setSearchString} from "@/slices/searchSlice";
import {useDispatch} from "react-redux";

import styles from "./navbar.module.scss";

export default function Navbar() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {type} = router.query;

    const moviesURI = '/movies'
    const seriesURI = '/series'
    const animesURI = '/animes'

    const resetSearch = async () => {
        await dispatch(setSearchString(''))
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Link href="/" style={{margin: 0}} >
                        <img src={"/popflix-nobg-logo.png"} alt="alt nav" width={100} height={100}/>
                    </Link>
                    <Link
                        onClick={resetSearch} href={moviesURI} className={type === MOVIE ? styles.activeLink : '' }>Movies
                    </Link>
                    <Link
                        onClick={resetSearch} href={seriesURI} className={type === SERIE ? styles.activeLink : ''}>Series
                    </Link>
                    <Link
                        onClick={resetSearch} href={animesURI} className={type === ANIME ? styles.activeLink : ''}>Animes
                    </Link>
                </div>
                <div className={styles.dropDown}>
                    <GenresDropdown/>
                </div>
                <SearchBar/>
            </div>
        </div>
    )
}
