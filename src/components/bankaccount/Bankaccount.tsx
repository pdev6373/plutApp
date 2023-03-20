import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNav,
  IonNavLink,
  IonPage,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { cloudUpload } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useForm, SubmitHandler, set } from "react-hook-form";
import Uppy from "@uppy/core";
// import Dashboard from '@uppy/dashboard'
import { Dashboard } from "@uppy/react";
import FileInput from "@uppy/file-input";
import Webcam from "@uppy/webcam";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { TransactionService } from "../../services/transactionService";
import { BankaccoutService } from "../../services/bankAccountService";
import { useCurrentUser } from "../../services/userService";
interface BankAccountProps {}

type AddBankAccountInputs = {
  accountName: string;
  accountNumber: string;
  bankName: string;
};

export const BankAccountForm: React.FC<BankAccountProps> = ({}) => {
  const { id } = useCurrentUser();

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [present] = useIonToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddBankAccountInputs>({
    resetOptions: {
      keepDefaultValues: true,
      keepValues: true,
    },
  });
  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
      animated: true,
      color: "success",
    });
  };
  const onSubmit: SubmitHandler<AddBankAccountInputs> = async (data) => {
    console.log(data);
    setLoading(true);
    setHasError(false);
    const bankService = new BankaccoutService();
    const result = await bankService.createBankAccount({
      accountName: data.accountName,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      userId: id,
    });
    setLoading(false);

    if (result.succeeded) {
      presentToast("BankAccount created successfully");
      //push to context
    } else {
      setHasError(true);
      setErrorMessage(result.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Add Bank account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="uk-container uk-margin">
          {loading ? (
            <IonProgressBar type="indeterminate"></IonProgressBar>
          ) : (
            ""
          )}
          <h2>Add Bank account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {hasError ? (
              <span className="uk-text-danger">{errorMessage}</span>
            ) : (
              ""
            )}
            <IonItem>
              <IonLabel position="stacked">Enter Bank name</IonLabel>
              <IonInput
                required
                placeholder="Bank name"
                type="text"
                {...register("bankName", { required: true })}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Enter Account Name</IonLabel>
              <IonInput
                required
                placeholder="Account Name"
                type="text"
                {...register("accountName", { required: true })}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Enter Account Number</IonLabel>
              <IonInput
                required
                placeholder="Account Number"
                type="text"
                {...register("accountNumber", { required: true })}
              ></IonInput>
            </IonItem>

            <IonButton
              type="submit"
              disabled={!isValid || loading}
              expand="full"
            >
              Submit
              {/* <IonSpinner  name="crescent"></IonSpinner> */}
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};
