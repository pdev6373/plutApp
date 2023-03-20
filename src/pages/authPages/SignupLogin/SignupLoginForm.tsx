import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Button, Input } from "../../../components";
import { Link, useHistory } from "react-router-dom";
import { UserAuthService } from "../../../services/userAuthService";
import useApi from "../../../hooks/useApi";
import styles from "./SignupLoginForm.module.css";
import useStorage from "../../../hooks/useStorage";

export default function SignupLoginForm({
  value,
}: {
  value: "signup" | "login";
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [segmentValue, setSegmentValue] = useState<"signup" | "login" | "">(
    value
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { appData, updateData } = useStorage();

  const history = useHistory();
  const { request, error, isLoading, isSuccessful, setIsSuccessful } = useApi();

  const {
    request: loginRequest,
    data: loginData,
    error: loginError,
    isLoading: isLoginLoading,
    isSuccessful: isLoginSuccessful,
    setIsSuccessful: setIsLoginSuccessful,
  } = useApi();

  useEffect(() => {
    if (appData?.user?.token) window.location.reload();
  }, [appData]);

  useEffect(() => {
    if (isSuccessful) {
      setIsSuccessful(false);
      history.push("/verify-mail");
    }
  }, [isSuccessful]);

  useEffect(() => {
    console.log(loginData);

    if (isLoginSuccessful) {
      setIsLoginSuccessful(false);

      if (loginData.isVerified) {
        updateData({
          email: "",
          user: {
            id: loginData.user.id,
            email: loginData.user.email,
            firstName: loginData.user.firstName,
            lastName: loginData.user.lastName,
            profileImageUrl: "",
            token: loginData.token,
            refreshToken: loginData.refreshToken,
            userName: loginData.user.userName,
            phoneNumber: loginData.user.phoneNumber,
          },
        });
      } else {
        updateData({ user: {}, email });
        history.push("/verify-mail", { from: "/auth" });
      }
    }
  }, [isLoginSuccessful]);

  // Error
  useEffect(() => {
    error && setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    loginError && setErrorMessage(loginError);
  }, [loginError]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, confirmPassword]);

  // Register and Login
  const handleSignup = async () => {
    setErrorMessage("");

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    } else if (!password) {
      setErrorMessage("Password is required");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Password doesn't match");
      return;
    }

    updateData({ email });
    const registerUser = async () => {
      const signupService = new UserAuthService();
      const signup = await signupService.register({ email, password });
      return signup;
    };

    request(registerUser);
  };

  const handleLogin = async () => {
    setErrorMessage("");

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required");
      return;
    }

    const loginUser = async () => {
      const loginService = new UserAuthService();
      const login = await loginService.login({ email, password });
      return login;
    };

    loginRequest(loginUser);
  };

  return (
    <>
      <IonHeader class="ion-no-border">
        <IonToolbar className={styles.ionToolBar}>
          <IonButtons slot="start">
            <IonBackButton
              className={styles.backButton}
              mode="ios"
            ></IonBackButton>
          </IonButtons>
          <IonTitle class={`ion-text-center ${styles.headerTitle}`}>
            Getting Started
          </IonTitle>
        </IonToolbar>

        <div className={`${styles.segmentWrapper} ion-padding`}>
          <IonSegment
            mode="ios"
            className={styles.ionSegment}
            value={segmentValue}
            onIonChange={(e: CustomEvent) => {
              setSegmentValue(e.detail.value);
            }}
          >
            <IonSegmentButton
              value="signup"
              className={styles.ionSegmentButton}
            >
              <IonLabel>Create an account</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="login" className={styles.ionSegmentButton}>
              <IonLabel>Login</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
      </IonHeader>

      <IonContent className={`ion-padding ${styles.content}`}>
        <form className={styles.formsWrapper}>
          <Input
            placeholder="Enter your email address"
            label="Email address"
            value={email}
            setValue={setEmail}
          />
          <Input
            placeholder={
              segmentValue === "signup"
                ? "Choose a password"
                : "Enter your password"
            }
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          {segmentValue === "login" && (
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </Link>
          )}
          {segmentValue === "signup" && (
            <Input
              placeholder="Enter your password again"
              label="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              type="password"
            />
          )}
        </form>
      </IonContent>

      <IonFooter className={`ion-no-border ${styles.white}`}>
        <IonToolbar className={`${styles.ionFooter} ion-padding`}>
          <p
            className={
              errorMessage ? styles.errorMesssage : styles.noErrorMesssage
            }
          >
            {errorMessage ? errorMessage : "No error"}
          </p>

          {segmentValue === "signup" && (
            <p className={styles.proceed}>
              By proceeding, I accept{" "}
              <span className={styles.proceedAccent}>
                Plut’s Terms and Conditions{" "}
              </span>
              and confirm that I have read{" "}
              <span className={styles.proceedAccent}>
                Plut’s Privacy Policy
              </span>
            </p>
          )}

          {segmentValue === "signup" ? (
            <Button
              buttonType="submit"
              type="primary"
              text={isLoading ? "Creating account..." : "Create an account"}
              isDisabled={isLoading}
              onClick={handleSignup}
            />
          ) : (
            <Button
              buttonType="submit"
              type="primary"
              text={isLoginLoading ? "Logging in..." : "Login"}
              isDisabled={isLoginLoading}
              onClick={handleLogin}
            />
          )}
        </IonToolbar>
      </IonFooter>
    </>
  );
}
