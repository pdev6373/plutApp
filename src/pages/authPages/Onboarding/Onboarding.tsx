import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { OnBoarding } from "../../../components/auth/OnBoarding/OnBoarding";
import { IonContent, IonHeader, IonImg, IonToolbar } from "@ionic/react";
import { Button } from "../../../components";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Onboarding.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

export default function Onboarding({
  setValue,
  value,
}: {
  setValue: any;
  value: string;
}) {
  const [first, setFirst] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    if (first) setFirst(false);
    else history.replace("/auth");
  }, [value]);

  return (
    <>
      <IonHeader class="ion-no-border">
        <IonToolbar className={styles.ionToolBar}>
          <IonImg
            alt="top image"
            src="/assets/logo-purple.svg"
            className={styles.image}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent className={styles.content}>
        <Swiper
          // allowTouchMove={false}
          // noSwiping={true}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          speed={500}
          loop={false}
          navigation={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <OnBoarding
              value={value}
              setValue={setValue}
              src="/assets/sell-gift-card-image.png"
              classid="bigImage"
              title="Sell Giftcards"
              text="Plut make you trade giftcards and pay your utility bills with ease
              and sends commission straight to your bank account."
            />
          </SwiperSlide>
          <SwiperSlide>
            <OnBoarding
              value={value}
              setValue={setValue}
              src="/assets/pay-bills.png"
              classid="bigImageTwo"
              title="Pay your Bills"
              text="Plut make you trade giftcards and pay your utility bills with ease
              and sends commission straight to your bank account."
            />
          </SwiperSlide>
        </Swiper>
      </IonContent>

      <div className={`${styles.footer} ion-padding`}>
        <Button
          buttonType="button"
          text="Create an account"
          type="primary"
          onClick={() => {
            value === "signup" ? history.replace("/auth") : setValue("signup");
          }}
        />
        <Button
          buttonType="button"
          text="Login"
          type="secondary"
          onClick={() => {
            value === "login" ? history.replace("/auth") : setValue("login");
          }}
        />
      </div>
    </>
  );
}
