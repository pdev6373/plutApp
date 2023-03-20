import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  businessOutline,
  giftOutline,
  home,
  homeOutline,
  planetOutline,
} from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit";
import GiftCardRate from "./components/giftcards/giftcardRates/GiftCardRate";
import { BankAccountForm } from "./components/bankaccount/Bankaccount";
// import { Home } from "./components/dashboard/Home";
import Routes from "./components/auth/Routes/Routes";
import useStorage from "./hooks/useStorage";

setupIonicReact();

const App: React.FC = () => {
  const { appData, isLoading } = useStorage();

  return !isLoading ? (
    <IonApp>
      {!appData?.user?.token && (
        <IonReactRouter>
          <IonRouterOutlet>
            <Routes />
          </IonRouterOutlet>
        </IonReactRouter>
      )}

      {!!appData?.user?.token && (
        <IonReactRouter>
          <IonMenu content-id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
              <IonMenuToggle auto-hide="false">
                <IonItem routerLink="/" button>
                  <IonIcon slot="start" icon={homeOutline}></IonIcon>
                  <IonLabel>Home</IonLabel>
                </IonItem>
                <IonItem routerLink="/add-bank-account" button>
                  <IonIcon slot="start" icon={businessOutline}></IonIcon>
                  <IonLabel>Bank account</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonContent>
          </IonMenu>

          <IonPage className="ion-page" id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Menu</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
              <IonTabs>
                <IonRouterOutlet>
                  <Switch>
                    <Route exact path="/tab1">
                      <Tab1 />
                    </Route>
                    <Route exact path="/tab2">
                      <Tab2 />
                    </Route>
                    <Route path="/tab3">
                      <Tab3 />
                    </Route>
                    <Route exact path="/">
                      <Redirect to="/tab1" />
                    </Route>
                    <Route exact path="/giftcard-rates">
                      <GiftCardRate />
                    </Route>
                    <Route exact path="/add-bank-account">
                      <BankAccountForm />
                    </Route>
                    <Route path="*">
                      <Redirect to="/" />
                    </Route>
                  </Switch>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/tab1">
                    <IonIcon aria-hidden="true" icon={home} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon aria-hidden="true" icon={giftOutline} />
                    <IonLabel>Sell Gift Card</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon aria-hidden="true" icon={planetOutline} />
                    <IonLabel>Sell Crypto</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonContent>
          </IonPage>
        </IonReactRouter>
      )}
    </IonApp>
  ) : (
    <></>
  );
};

export default App;
