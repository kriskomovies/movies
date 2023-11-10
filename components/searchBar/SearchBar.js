import {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector,} from "react-redux";
import {debounce} from "lodash";
import {selectSearchString, setSearchString} from "@/slices/searchSlice";
import SearchIcon from "@mui/icons-material/Search";
import { useOnClickOutside } from 'usehooks-ts'
import {EMPTY_STRING} from "@/lib/helpers";

import styles from "./searchBar.module.scss";
export default function SearchBar() {
    const sliceSearchTerm = useSelector(selectSearchString);
    const dispatch = useDispatch();
    const [focusedSearch, setFocusedSearch] = useState(false);
    const [searchValue, setSearchValue] = useState(EMPTY_STRING);
    const ref = useRef(null);

    useEffect(() => {
        if (sliceSearchTerm === EMPTY_STRING) setSearchValue(EMPTY_STRING);
    }, [sliceSearchTerm])

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    }, []);

    function handleClickOutside(){
        setFocusedSearch(false);
    }

    useOnClickOutside(ref, handleClickOutside);

    function onSearchIconClick(e) {
        e.stopPropagation();
        const searchInputEl = document.getElementById("search-input");
        searchInputEl && searchInputEl.focus();
        setFocusedSearch(!focusedSearch);
    }

    function handleInputChange(event) {
        const {value} = event.target;
        setSearchValue(value);
        debouncedResults(value);
    }

    function setSearchResult(value) {
        dispatch(setSearchString(value))
    }

    const debouncedResults = useMemo(() => {
        return debounce(setSearchResult, 500);
    }, []);

    return (
        <div className={styles.searchBar} ref={ref}>
            <input
                autoFocus
                id="search-input"
                className={focusedSearch ? styles.activeInput : ''}
                placeholder="I am looking for..."
                onChange={handleInputChange}
                value={searchValue}
            />
            <div className={styles.searchIcon}
                 onClick={(e) => onSearchIconClick(e)}
            >
                <span id="search-icon-wrapper">
                <SearchIcon id="search-icon"/>
            </span>
            </div>
        </div>
    )
}