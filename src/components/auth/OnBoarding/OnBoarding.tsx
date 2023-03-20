import { IonContent, IonFooter, IonImg } from "@ionic/react";
import { Button } from "../..";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./OnBoarding.module.css";

export const OnBoarding = ({
  setValue,
  value,
  src,
  classid,
  title,
  text,
}: {
  setValue: any;
  value: string;
  src: string;
  classid: string;
  title: string;
  text: string;
}) => {
  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.bigImageWrapper}>
        <IonImg alt="top image" src={src} className={styles[classid]} />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.textWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};
