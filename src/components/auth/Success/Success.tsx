import { IonContent, IonImg } from "@ionic/react";
import { Button, Footer } from "../../../components";
import styles from "./Success.module.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Success({
  type,
  setValue,
  value,
}: {
  type: "reset" | "create";
  setValue: any;
  value: string;
}) {
  const history = useHistory();
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    if (first) setFirst(false);
    else history.replace("/auth");
  }, [value]);

  return (
    <>
      <IonContent className="ion-padding">
        <div className={styles.contentWrapper}>
          <IonImg
            alt="top image"
            src="/assets/success.svg"
            className={styles.successImg}
          />
          <h3 className={styles.title}>
            {type === "reset"
              ? "You’ve successfully reset your password"
              : "You’ve successfully created your account"}
          </h3>
          <p className={styles.text}>
            {type === "reset"
              ? "You can now use your new password to login to your plut account."
              : "You can now login to your plut account."}
          </p>
        </div>
      </IonContent>

      <Footer
        buttonType="button"
        errorMessage=""
        setErrorMessage={() => {}}
        type="primary"
        text="Login"
        onClick={() => {
          value === "login" ? history.replace("/auth") : setValue("login");
        }}
      />
    </>
  );
}
