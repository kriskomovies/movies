import React from 'react';
import styles from './moviesButton.module.scss';

const MoviesButton = (props) => {
    const {text, iconName, onClick} = props;

    return(<button className={styles.buttonWrapper} onClick={onClick}>
        { iconName && <i className={iconName}/>}
        <div>{text}</div>
    </button>)
}

export default MoviesButton;