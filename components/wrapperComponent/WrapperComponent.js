import Navbar from "@/components/navbar/Navbar";
import {Fragment} from "react";
import {useSelector} from "react-redux";
import {selectSearchString} from "@/slices/searchSlice";
import SearchComponent from "@/components/searchComponent/SearchComponent";
import styles from "./wrapperComponent.module.scss"

export default function WrapperComponent({Component, pageProps}) {
    const searchString = useSelector(selectSearchString);
    return (
        <Fragment>
            <Navbar/>
            <div className={styles.backgroundImage}></div>
            <div className={styles.container}>
                {searchString ?
                    <SearchComponent/> :
                    <Component {...pageProps} />}
            </div>
        </Fragment>
    )
}