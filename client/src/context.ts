import { createContext } from "react";

export const serverPort = 3000;

export const LoginContext = createContext({
    isLoggedIn: false,
    setLoggedIn: (value: boolean) => {}
});