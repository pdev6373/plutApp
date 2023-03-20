import { useState, useEffect } from "react";
import { IonContent, IonImg, IonItem, IonSpinner } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Footer } from "../../../components";
import OtpInput from "otp-input-react-18";
import useApi from "../../../hooks/useApi";
import useStorage from "../../../hooks/useStorage";
import styles from "./VerifyEmail.module.css";
import { UserAuthService } from "../../../services/userAuthService";

export default function VerifyEmail() {
  const history = useHistory<any>();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [first, setFirst] = useState(true);

  const { appData } = useStorage();

  const { request, error, isLoading, isSuccessful, setIsSuccessful } = useApi();

  const {
    request: resendVerifcation,
    error: resendError,
    isLoading: resendLoading,
    isSuccessful: isResendSuccessful,
  } = useApi();

  useEffect(() => {
    history.location.state?.from === "/auth" &&
      appData.email &&
      resendOtp(false);
  }, [appData]);

  const resendOtp = async (isClicked: boolean) => {
    setErrorMessage("");
    isClicked && setFirst(false);

    const resendOtp = async () => {
      const resendVerifcation = new UserAuthService();
      const resend = await resendVerifcation.resendOTP({
        email: appData.email,
      });
      return resend;
    };

    resendVerifcation(resendOtp);
  };

  const verifyEmail = async () => {
    setErrorMessage("");

    if (otp.length < 6) {
      setErrorMessage("Invalid otp");
      return;
    }

    const verifyUser = async () => {
      const verifyUserService = new UserAuthService();
      const verify = await verifyUserService.verifyMail({
        otp,
        email: appData.email,
      });
      return verify;
    };

    request(verifyUser);
  };

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      history.replace("/signup-successful");
    }
  }, [isSuccessful]);

  useEffect(() => {
    error && setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    resendError && setErrorMessage(resendError);
  }, [resendError]);

  useEffect(() => {
    setErrorMessage("");
  }, [otp]);

  return (
    <>
      <IonContent className="ion-padding">
        <div className={styles.wrapperInner}>
          <IonImg
            alt="top image"
            src="/assets/verify.svg"
            className={styles.image}
          />

          <h3 className={styles.title}>Verify Email Address</h3>
          <p className={styles.text}>
            Please enter the 6 digit code we sent to:
          </p>
          <p className={`${styles.text} ${styles.textAccent}`}>
            {appData.email}
          </p>

          <OtpInput
            value={otp}
            onChange={(otp: any) => setOtp(otp)}
            numInputs={6}
            containerStyle={styles.form}
            inputStyle={styles.input}
          />

          {!resendLoading &&
            (first ? (
              <p className={styles.resend} onClick={() => resendOtp(true)}>
                Didn’t get the code?{" "}
                <span className={styles.resendAccent}>Resend</span>
              </p>
            ) : isResendSuccessful ? (
              <p className={styles.resend} onClick={() => resendOtp(true)}>
                New otp sent{" "}
                <span className={styles.resendAccent}>
                  Click to check your mail
                </span>
              </p>
            ) : (
              <p className={styles.resend} onClick={() => resendOtp(true)}>
                Failed to send new otp{" "}
                <span className={styles.resendAccent}>Click to try again</span>
              </p>
            ))}

          {resendLoading && (
            <IonItem className={styles.resend}>
              <IonSpinner name="bubbles"></IonSpinner>
            </IonItem>
          )}
        </div>
      </IonContent>

      <Footer
        buttonType="submit"
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        type="primary"
        text={isLoading || resendLoading ? "Please wait..." : "Confirm"}
        isDisabled={isLoading || resendLoading}
        onClick={verifyEmail}
      />
    </>
  );
}
