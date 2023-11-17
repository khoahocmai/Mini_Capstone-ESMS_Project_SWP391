import configs from "@/configs";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

class CookieUtils {
    getItem(key, defaultValue = "") {
        const item = cookies.get(key);
        return item !== undefined ? item : defaultValue;
    }

    setItem(key, value = "") {
        cookies.set(key, value, { path: "/" });
    }

    removeItem(key) {
        cookies.remove(key);
    }

    decodeJwt() {
        const token = this.getItem(configs.cookies.token);

        if (token) {
            try {
                const jwtUser = jwtDecode(token);
                return jwtUser;
            } catch (err) {
                this.removeToken();
            }
        }

        return undefined;
    }

    getToken() {
        return this.getItem(configs.cookies.token);
    }

    setToken(value = "") {
        this.setItem(configs.cookies.token, value);
    }

    removeToken() {
        cookies.remove(configs.cookies.token);
    }

    clear() {
        cookies.remove(configs.cookies.token, { path: "/" });
    }
}

export default new CookieUtils();
