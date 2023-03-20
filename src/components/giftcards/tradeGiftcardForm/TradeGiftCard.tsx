import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNav,
  IonNavLink,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import { cloudUpload } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GiftCardService } from "../../../services/giftcardService";
import { GiftCardRateModel } from "../../../shared/models/giftcardrates/giftcardrates";
import { useForm, SubmitHandler } from "react-hook-form";
import Uppy from "@uppy/core";
// import Dashboard from '@uppy/dashboard'
import { Dashboard } from "@uppy/react";
import FileInput from "@uppy/file-input";
import Webcam from "@uppy/webcam";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { app } from "../../../shared/const";
import { FileUploadResponse } from "../../../shared/models/fileUpload/fileUpload";
import { ApiResult } from "../../../shared/models/apiResult";
import { BankaccoutService } from "../../../services/bankAccountService";
import { useCurrentUser } from "../../../services/userService";
import { BankAccountModel } from "../../../shared/models/bankaccountModel";
import { TransactionService } from "../../../services/transactionService";
interface TradeGiftCardProps {}

type TradeGiftCardInputs = {
  giftCardId: string;
  giftCardCost: number;
  bankaccountId: string;
  giftCardImageUrl: string;
  giftCardRateId: string;
};
export const TradeGiftCardForm: React.FC<TradeGiftCardProps> = ({}) => {
  const { id } = useCurrentUser();
  const [rates, setRates] = useState([] as GiftCardRateModel[]);
  const [bankAccounts, setBankAccounts] = useState([] as BankAccountModel[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [present] = useIonToast();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<TradeGiftCardInputs>({
    resetOptions: {
      keepDefaultValues: true,
      keepValues: true,
    },
  });
  register("giftCardImageUrl", { required: true });
  useEffect(() => {
    const getGiftCards = async () => {
      const giftCardService = new GiftCardService();
      setLoading(true);
      const result = await giftCardService.giftCard();
      setLoading(false);
      setRates(result);
    };
    const getBankAccount = async () => {
      const bankAccountService = new BankaccoutService();
      setLoading(true);
      setHasError(false);
      const result = await bankAccountService.getBankAccount(id);
      setLoading(false);
      if (result.succeeded) {
        setBankAccounts(result.data);
        setHasError(false);
      } else {
        setHasError(true);
        setError(result.message);
      }
    };
    getGiftCards();
    getBankAccount();
    console.log(errors);
  }, []);
  //

  const uppy = useMemo(() => {
    return new Uppy({
      restrictions: {
        allowedFileTypes: ["image/*"],
      },
    })
      .use(Webcam)
      .use(FileInput, {})
      .use(XHRUpload, {
        endpoint: app.coreApi.coreApiUrl + "/api/v1/fileupload/upload-image",
      });
  }, []);

  useEffect(() => {
    uppy.on("complete", (result) => {
      const data = result.successful[0].response?.body
        ?.data as FileUploadResponse;
      const url = data?.url;
      console.log(data);
      if (url) {
        setValue("giftCardImageUrl", url, {
          shouldValidate: true,
          shouldDirty: true,
        });
        console.log("value set for url: " + url);
      }
    });
  }, [uppy]);
  const handleSelectedBank = (value: string) => {
    if (value === "new") {
      //todo show new bank form
    }
  };
  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
      animated: true,
      color: "success",
    });
  };
  const onSubmit: SubmitHandler<TradeGiftCardInputs> = async (data) => {
    const transactionService = new TransactionService();
    setLoading(true);
    setHasError(false);
    const selectedCard = rates.find((rate) => rate.id === data.giftCardId);
    const result = await transactionService.sellGiftCard({
      bankAccountId: data.bankaccountId,
      baseCurrency: selectedCard?.rates.find(
        (a) => a.id === data.giftCardRateId
      )?.baseCurrencyCode,
      declaredAmount: data.giftCardCost,
      giftCardId: data.giftCardId,
      giftCardUrl: data.giftCardImageUrl,
      quoteCurrency: selectedCard?.rates.find(
        (a) => a.id === data.giftCardRateId
      )?.quoteCurrencyCode,
      userId: id,
    });
    setLoading(false);
    if (result.succeeded) {
      setHasError(false);
      reset();
      presentToast("Gift Card Sell Order Successfully Placed");
    } else {
      setHasError(true);
      setError(result.message);
    }
    console.log(data);
  };

  const getSelectedRate = () => {
    const selectedRate = rates
      .find((rate) => rate.id === getValues("giftCardId"))
      ?.rates.find((a) => a.id === getValues("giftCardRateId"));
    return selectedRate;
  };
  return (
    <div className="uk-container uk-margin">
      {loading ? <IonProgressBar type="indeterminate"></IonProgressBar> : ""}
      <h2>Sell Gift cards</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {hasError ? (
          <div className="uk-alert uk-alert-danger">{error}</div>
        ) : (
          ""
        )}
        <IonItem>
          <IonLabel position="floating">
            Select Gift card{" "}
            <Link to="/giftcard-rates" className="uk-padding">
              View Rate
            </Link>
          </IonLabel>
          <IonSelect
            required
            placeholder="Select Gift card"
            multiple={false}
            {...register("giftCardId", { required: true })}
          >
            {rates.map((a, key) => {
              return (
                <IonSelectOption key={key} value={a.id}>
                  {a.name}{" "}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Select Gift card Rate</IonLabel>
          <IonSelect
            required
            placeholder="Select Gift card Rate"
            multiple={false}
            {...register("giftCardRateId", { required: true })}
          >
            {rates
              .find((c) => c.id == getValues("giftCardId"))
              ?.rates.map((a, key) => {
                return (
                  <IonSelectOption key={key} value={a.id}>
                    <b>{a.baseCurrencyCode}</b> / {a.quoteCurrencyCode} {a.rate}{" "}
                    -{a.description}
                  </IonSelectOption>
                );
              })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            What is the cost of this gift card{" "}
            {errors.giftCardRateId ? (
              <span className="uk-text uk-text-danger">
                {" "}
                {errors.giftCardRateId?.message}
              </span>
            ) : (
              ""
            )}
          </IonLabel>
          <IonInput
            required
            placeholder="What is the cost of this gift card"
            type="number"
            min={getSelectedRate()?.minValue}
            max={getSelectedRate()?.maxValue}
            {...register("giftCardCost", {
              required: true,
              min: getSelectedRate()?.minValue,
              max: getSelectedRate()?.maxValue,
            })}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">
            Select bank account
            <Link to="/add-bank-account" className="uk-padding">
              Add a bank account
            </Link>
          </IonLabel>
          <IonSelect
            required
            onIonChange={(e) => handleSelectedBank(e.detail.value)}
            placeholder="Select Gift card"
            {...register("bankaccountId", { required: true })}
          >
            {bankAccounts.map((bankAccount) => {
              return (
                <IonSelectOption value={bankAccount.id}>
                  {bankAccount.bankName} {bankAccount.accountNumber}{" "}
                  {bankAccount.accountName}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>

        <div className="">
          <div className="uk-margin-auto uk-width-1-2@s">
            <Dashboard
              uppy={uppy}
              plugins={["Webcam", "FileInput"]}
              height={300}
              className="uk-margin-auto"
            ></Dashboard>
          </div>
        </div>

        <IonButton type="submit" disabled={!isValid || loading} expand="full">
          Submit {loading}
          {/* <IonSpinner  name="crescent"></IonSpinner> */}
        </IonButton>
      </form>
    </div>
  );
};
