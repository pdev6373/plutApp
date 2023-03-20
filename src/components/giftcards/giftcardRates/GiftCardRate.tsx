import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React, { useEffect } from "react";
import { GiftCardService } from "../../../services/giftcardService";
import { GiftCardRateModel } from "../../../shared/models/giftcardrates/giftcardrates";

interface GiftCardRatesProps {}

const GiftCardRate: React.FC<GiftCardRatesProps> = () => {
  const [rates, setRates] = React.useState([] as GiftCardRateModel[]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const getGiftCardRates = async () => {
      const giftCardService = new GiftCardService();
      const result = await giftCardService.giftCard();
      setRates(result);
      setLoading(false);
    };
    getGiftCardRates();
  }, []);

  const innerChild = rates.map((rate, index) => {
    return (
      <li className={index == 0 ? "uk-open" : ""}>
        <a className="uk-accordion-title" href="#">
          <img
            className="uk-img"
            width={50}
            height={50}
            src={rate.imageUrl}
            alt={rate.name}
          ></img>
          {rate.name}
        </a>
        <div className="uk-accordion-content">
          <table className="uk-table uk-table-striped uk-table-small uk-table-hover">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Card value</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {rate.rates.map((a) => {
                return (
                  <tr>
                    <td> {a.baseCurrencyCode}</td>
                    <td>
                      {a.minValue} - {a.maxValue} {a.baseCurrencyCode}
                    </td>
                    <td>
                      {a.quoteCurrencyCode} {a.rate} / {a.baseCurrencyCode}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </li>
    );
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Gift card rates</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <ul data-uk-accordion>
            <li className="uk-open">
              <a className="uk-accordion-title" href="#">
                <img
                  alt="image"
                  className="uk-img"
                  width={50}
                  height={50}
                  src="https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/B/E/55701_1621857179.jpg"
                ></img>
                Apple and Itunes
              </a>
              <div className="uk-accordion-content">
                <table className="uk-table uk-table-striped uk-table-small uk-table-hover">
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Card value</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> USD</td>
                      <td>10 - 100 USD</td>
                      <td>NGN 780 / USD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GiftCardRate;
