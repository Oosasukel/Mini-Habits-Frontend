import styles from './styles.module.scss';
import Lottie from 'react-lottie';
import logoAnimation from '../../assets/lotties/Logo.json';
import { useRouter } from 'next/dist/client/router';

const GenericError = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.animationContainer}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: logoAnimation,
          }}
          isClickToPauseDisabled={true}
        />
      </div>

      <h1>{router.query.message}</h1>
    </div>
  );
};

export default GenericError;
