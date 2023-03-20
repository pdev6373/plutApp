import { IonContent, IonImg } from "@ionic/react";
import { Button, Footer, Header } from "../../../components";
import styles from "./CheckMail.module.css";
import { Link, useHistory } from "react-router-dom";
import useStorage from "../../../hooks/useStorage";

export default function CheckMail() {
  const history = useHistory();
  const { appData } = useStorage();

  return (
    <>
      <Header title="" />

      <IonContent className="ion-padding">
        <div className={styles.contentWrapper}>
          <IonImg
            alt="top image"
            src="/assets/check-mail.svg"
            className={styles.image}
          />
          <h3 className={styles.title}>Check your Mail</h3>
          <p className={styles.text}>
            We have sent a password reset link to your email:
          </p>
          <p className={`${styles.text} ${styles.textAccent}`}>
            {appData.email}
          </p>

          <a
            title="link to mail"
            href={`https://mail.google.com/mail/u/${appData.email}`}
            className={styles.mailLink}
          >
            <Button
              type="secondary"
              text="Open Mail App"
              onClick={() => {}}
              buttonType="button"
            />
          </a>

          <Link to="/forgot-password" className={styles.resend}>
            Didn’t receive email? Check your spam section or <br />
            <span className={styles.resendAccent}>
              Try another email address
            </span>
          </Link>
        </div>
      </IonContent>

      <Footer
        errorMessage=""
        setErrorMessage={() => {}}
        type="primary"
        text="Next"
        onClick={() => history.push("/new-password")}
        buttonType="button"
      />
    </>
  );
}
