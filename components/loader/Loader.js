import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from "./loader.module.scss";

export default function Loader() {
    return (
        <div className={styles.container}>
            <Box>
                <CircularProgress className={styles.progress}/>
            </Box>
        </div>

    );
}