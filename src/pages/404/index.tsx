import styles from './styles.module.scss';
import Lottie from 'react-lottie';
import errorAnimation from '../../assets/lotties/404.json';

const GenericError = () => {
  return (
    <div className={styles.container}>
      <div className={styles.animationContainer}>
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: errorAnimation,
          }}
          isClickToPauseDisabled={true}
        />
      </div>

      <h1>Página não encontrada.</h1>
    </div>
  );
};

export default GenericError;
