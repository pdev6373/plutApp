import { IonGrid, IonRow, IonCol, IonProgressBar } from "@ionic/react";
import { useEffect, useState } from "react";
import { TransactionService } from "../../services/transactionService";
import { useCurrentUser } from "../../services/userService";
import { TransactionModel } from "../../shared/models/transactionModel";
import "./home.css";
interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const { id, userName } = useCurrentUser();

  const [transactions, setTransactions] = useState([] as TransactionModel[]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getTransactions = async () => {
      const transactionService = new TransactionService();
      setLoading(true);
      const transactions = await transactionService.getTransacions(id);
      setTransactions(transactions.data.items);
      setLoading(false);
    };

    getTransactions();
  }, []);
  const getStatusSpan = (status: string) => {
    let span = <></>;
    switch (status) {
      case "pending":
        span = (
          <span className="uk-label uk-label-pending uk-align-right">
            pending
          </span>
        );
        break;
      case "success":
        span = (
          <span className="uk-label uk-label-success uk-align-right">
            success
          </span>
        );
        break;
      case "failed":
        span = (
          <span className="uk-label uk-label-danger uk-align-right">
            {" "}
            failed{" "}
          </span>
        );
        break;
    }
    return span;
  };
  return (
    <div>
      <div className="uk-container uk-margin ">
        <div className="uk-card uk-card-default uk-padding">
          <h3>Hello {userName}</h3>
          <div className="uk-grid" data-uk-grid>
            <div className="uk-width-1-2">
              <button className="uk-button uk-button-secondary dashboard-buttons uk-margin uk-width-expand  uk-border-rounded uk-box-shadow-large">
                Trade Gift card
              </button>
            </div>
            <div className="uk-width-1-2">
              <button className="uk-button uk-button-primary uk-margin dashboard-buttons uk-width-expand uk-border-rounded uk-box-shadow-large">
                Trade USDT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-container uk-margin ">
        <div className="uk-card uk-card-default uk-padding">
          <h4 className="uk-text uk-text-lead"> Recent Transactions</h4>
          {loading ? (
            <IonProgressBar type="indeterminate"></IonProgressBar>
          ) : (
            ""
          )}
          {transactions.length == 0 ? (
            <p>NO TRANSACTION</p>
          ) : (
            <ul className="uk-accordion" data-uk-accordion>
              {transactions.map((transaction) => {
                return (
                  <li>
                    <a className="uk-accordion-title uk-text uk-text-small dashboad-accordion-title">
                      <div className="uk-grid">
                        <div className="uk-width-3-4">
                          <span className="uk-text-break">
                            {transaction.transactionCategory == "GiftCard" ? (
                              <span>
                                Trade Gift Card{" "}
                                {
                                  transaction.giftCardExchanges[0]
                                    ?.baseCurrencyCode
                                }{" "}
                                {
                                  transaction.giftCardExchanges[0]
                                    ?.declaredAmount
                                }
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                        <div className="uk-width-1-4">
                          {getStatusSpan(
                            transaction.transactionStatus.toLowerCase()
                          )}
                        </div>
                      </div>
                    </a>
                    <div className="uk-accordion-content">
                      <p></p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
