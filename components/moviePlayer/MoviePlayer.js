import styles from './moviePlayer.module.scss';

export const MoviePlayer = ({ playerNumber }) => {
  return(<div className={styles.moviePlayerWrapper}>
    <i className="fa-solid fa-circle-play"></i>
    Player #{playerNumber}
  </div>)
};