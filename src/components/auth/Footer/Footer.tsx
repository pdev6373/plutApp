import { IonFooter, IonToolbar } from "@ionic/react";
import Button from "../../Button/Button";
import styles from "./Footer.module.css";

export default function Footer({
  onClick,
  text,
  type,
  isDisabled = false,
  errorMessage,
  setErrorMessage,
  buttonType,
}: {
  onClick: any;
  text: string;
  type: "primary" | "secondary";
  isDisabled?: boolean;
  errorMessage: string;
  setErrorMessage: any;
  buttonType: "submit" | "reset" | "button";
}) {
  return (
    <IonFooter className="ion-no-border">
      <IonToolbar className={`${styles.footer} ion-padding`}>
        <p
          className={
            errorMessage ? styles.errorMesssage : styles.noErrorMesssage
          }
        >
          {errorMessage ? errorMessage : "No error"}
        </p>
        <Button
          onClick={() => {
            setErrorMessage("");
            onClick();
          }}
          text={text}
          type={type}
          isDisabled={isDisabled}
          buttonType={buttonType}
        />
      </IonToolbar>
    </IonFooter>
  );
}
