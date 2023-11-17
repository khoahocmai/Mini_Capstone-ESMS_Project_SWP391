import { INITIALIZE, SIGN_IN, SIGN_OUT } from "./constants";
import cookies from "@/utils/cookies";

export function initialize(payload) {
    return {
        type: INITIALIZE,
        payload,
    };
}

export function signIn(payload) {
    return {
        type: SIGN_IN,
        payload,
    };
}

export function signOut() {
    cookies.removeToken();

    return {
        type: SIGN_OUT,
        payload: {
            user: null,
        },
    };
}
