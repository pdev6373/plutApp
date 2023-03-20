import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { User } from "../shared/models/userModel";

const DATA_KEY = "data";

export interface Data {
  user: User;
  email: string;
}

export default function useStorage() {
  const [store, setStore] = useState<Storage>();
  const [appData, setAppData] = useState<Data>({
    user: {
      id: "",
      email: "",
      token: "",
      refreshToken: "",
      userName: "",
      firstName: "",
      lastName: "",
      profileImageUrl: "",
      phoneNumber: "",
    },
    email: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initStorage = async () => {
      setIsLoading(true);
      const newStore = new Storage({
        name: "data",
        driverOrder: [
          CordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
        ],
      });
      await newStore.defineDriver(CordovaSQLiteDriver);

      const store = await newStore.create();
      setStore(store);

      const storedData = (await store?.get(DATA_KEY)) || [];
      setAppData(storedData);
      setIsLoading(false);
    };

    initStorage();
  }, []);

  const updateData = async (item: object) => {
    setIsLoading(true);
    const newData = { ...appData, ...item };

    setAppData(newData);
    await store?.set(DATA_KEY, newData);
    setIsLoading(false);
  };

  return { appData, updateData, isLoading };
}
