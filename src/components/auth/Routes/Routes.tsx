import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  CheckMail,
  CreateSuccessful,
  ForgotPassword,
  NewPassword,
  Onboarding,
  ResetSuccessful,
  SignupLoginForm,
  VerifyEmail,
} from "../../../pages/authPages";
import { useState } from "react";
import useStorage from "../../../hooks/useStorage";
import { IonPage } from "@ionic/react";
import styles from "./Routes.module.css";

export default function Routes() {
  const [value, setValue] = useState<"signup" | "login">("signup");
  const { appData } = useStorage();
  const location = useLocation();

  return (
    <IonPage
      className={
        location.pathname === "/welcome"
          ? styles.welcomeWrapper
          : styles.wrapper
      }
    >
      <Switch>
        <Route exact path="/welcome">
          <Onboarding setValue={setValue} value={value} />
        </Route>
        <Route exact path="/auth">
          <SignupLoginForm value={value} />
        </Route>
        <Route exact path="/verify-mail">
          <VerifyEmail />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/check-mail">
          <CheckMail />
        </Route>
        <Route exact path="/new-password">
          <NewPassword />
        </Route>
        <Route exact path="/reset-successful">
          <ResetSuccessful value={value} setValue={setValue} />
        </Route>
        <Route exact path="/signup-successful">
          <CreateSuccessful value={value} setValue={setValue} />
        </Route>
        <Route path="*">
          <Redirect to="/welcome" />
        </Route>
      </Switch>
    </IonPage>
  );
}
