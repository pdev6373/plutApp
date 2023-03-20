import { IonImg } from "@ionic/react";
import styles from "./Splash.module.css";

export default function Splash() {
  return (
    <div className={styles.wrapper}>
      <IonImg alt="logo" src="/assets/logo.png" className={styles.logo} />
    </div>
  );
}
