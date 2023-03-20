import { useState } from "react";
import { IonIcon, IonImg, IonInput, IonItem, IonLabel } from "@ionic/react";
import styles from "./Input.module.css";
import { eye, eyeOff } from "ionicons/icons";

export default function Input({
  placeholder,
  label,
  type = "text",
  value,
  setValue,
}: {
  placeholder: string;
  label: string;
  type?: string;
  value: string;
  setValue?: any;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <IonLabel position="floating" className={styles.label}>
        {label}
      </IonLabel>
      <IonItem fill="outline" className={styles.formInput}>
        <IonInput
          mode="md"
          value={value}
          placeholder={placeholder}
          type={type === "password" ? (!show ? "password" : "text") : "text"}
          onIonInput={(e: any) => setValue(e.target.value)}
          className={styles.input}
        ></IonInput>
        {type === "password" && (
          <>
            {!show ? (
              <IonIcon
                icon={eye}
                className={styles.icon}
                slot="end"
                onClick={() => setShow((prev) => !prev)}
              ></IonIcon>
            ) : (
              <IonIcon
                icon={eyeOff}
                className={styles.icon}
                slot="end"
                onClick={() => setShow((prev) => !prev)}
              ></IonIcon>
            )}
          </>
        )}
      </IonItem>
    </div>
  );

  // return (
  //   <div className={styles.wrapper}>
  //           className={styles.input}
  //         onChange={(e) => setValue(e.target.value)}
  //         type={type === "password" ? (show ? "text" : type) : type}
  //       />
  //       {type === "password" && (
  //         <IonImg
  //           onClick={() => setShow((prev) => !prev)}
  //           alt="password icon"
  //           src={!show ? "/assets/show.svg" : "/assets/hide.svg"}
  //           className={styles.icon}
  //         />
  //       )}
  //     </div>
  //   </div>
  // );
}
