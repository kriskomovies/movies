import styles from './movieTag.module.scss';

export const MovieTag = ( {tagName} ) => {
  return(<div className={styles.movieTag}>{tagName}</div>)
};