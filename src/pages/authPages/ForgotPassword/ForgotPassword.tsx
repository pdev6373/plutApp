import { useEffect, useState } from "react";
import { Input, Header, Footer } from "../../../components";
import styles from "./ForgotPassword.module.css";
import useApi from "../../../hooks/useApi";
import { useHistory } from "react-router-dom";
import useStorage from "../../../hooks/useStorage";
import { IonContent } from "@ionic/react";
import { UserAuthService } from "../../../services/userAuthService";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { request, isSuccessful, setIsSuccessful, error, isLoading } = useApi();
  const { updateData } = useStorage();

  const history = useHistory();

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      history.push("/check-mail");
    }
  }, [isSuccessful]);

  useEffect(() => {
    error && setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  const handleForgotPassword = async () => {
    setErrorMessage("");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    updateData({ email });
    const forgotPassword = async () => {
      const forgotPassword = new UserAuthService();
      const forgot = await forgotPassword.forgotPassword({
        email,
      });
      return forgot;
    };

    request(forgotPassword);
  };

  return (
    <>
      <Header title="" />

      <IonContent className="ion-padding">
        <h3 className={styles.title}>Forgot Password</h3>
        <p className={styles.text}>
          Enter the email address associated with your account and we will send
          you a reset password link.
        </p>

        <Input
          label="Email address"
          placeholder="Enter your email address"
          value={email}
          setValue={setEmail}
        />
      </IonContent>

      <Footer
        buttonType="submit"
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        text={isLoading ? "Please wait.." : "Send Rest Link"}
        type="primary"
        onClick={handleForgotPassword}
      />
    </>
  );
}
