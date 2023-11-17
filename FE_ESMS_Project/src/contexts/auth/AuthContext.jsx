import { createContext, useLayoutEffect, useReducer } from "react";
import { initialState } from "./initialState";
import reducer from "./reducer";
import cookies from "@/utils/cookies";
import { initialize } from "./actions";
import PropTypes from "prop-types";

const AuthContext = createContext({
    ...initialState,
    dispatch: () => null,
});

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useLayoutEffect(() => {
        (() => {
            const token = cookies.getToken();

            if (!token) {
                return dispatch(
                    initialize({ isAuthenticated: false, user: null })
                );
            }

            try {
                const user = cookies.decodeJwt();

                dispatch(initialize({ isAuthenticated: true, user }));
            } catch (error) {
                dispatch(initialize({ isAuthenticated: false, user: null }));
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
