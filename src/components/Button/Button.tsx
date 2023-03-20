import { IonButton } from "@ionic/react";
import styles from "./Button.module.css";

export default function Button({
  text,
  type,
  onClick,
  isDisabled = false,
  buttonType,
}: {
  text: string;
  type: "primary" | "secondary";
  onClick: any;
  isDisabled?: boolean;
  buttonType: "submit" | "button" | "reset";
}) {
  return (
    <IonButton
      disabled={isDisabled}
      color={type === "primary" ? "primary" : "light"}
      className={styles.button}
      expand="block"
      shape="round"
      size="large"
      onClick={onClick}
      type={buttonType}
    >
      <span
        className={
          type === "primary" ? styles.textPrimary : styles.textSecondary
        }
      >
        {text}
      </span>
    </IonButton>
  );
}
