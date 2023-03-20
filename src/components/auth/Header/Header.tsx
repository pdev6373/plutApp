import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonImg,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header({ title }: { title: string }) {
  const history = useHistory();

  return (
    <IonHeader class="ion-no-border">
      <IonToolbar mode="ios" className={styles.ionToolBar}>
        <IonButtons slot="start">
          <IonBackButton
            mode="ios"
            className={styles.backButton}
          ></IonBackButton>
        </IonButtons>
        <IonTitle class={`ion-text-center ${styles.headerTitle}`}>
          {title}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
