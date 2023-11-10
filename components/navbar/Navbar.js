import {useRouter} from "next/router";
import Link from "next/link";
import GenresDropdown from "@/components/genres/GenresDropdown";
import SearchBar from "@/components/searchBar/SearchBar";
import {ANIME, MOVIE, SERIE} from "@/constants/moviesTypes";

import styles from "./navbar.module.scss";


export default function Navbar() {
    const router = useRouter();
    const {type} = router.query;

    const moviesURI = `/movies?type=${MOVIE}`
    const seriesURI = `/movies?type=${SERIE}`
    const animesURI = `/movies?type=${ANIME}`

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <Link href="/" style={{margin: 0}}>
                        <img src={"/popflix-nobg-logo.png"} alt="alt nav" width={100} height={100}/>
                    </Link>
                    <Link href={moviesURI} className={type === MOVIE ? styles.activeLink : ''}>Movies</Link>
                    <Link href={seriesURI} className={type === SERIE ? styles.activeLink : ''}>Series</Link>
                    <Link href={animesURI} className={type === ANIME ? styles.activeLink : ''}>Animes</Link>
                </div>
                <div className={styles.dropDown}>
                    <GenresDropdown/>
                </div>
                <div>
                    <SearchBar/>
                </div>
            </div>
        </div>
    )
}
