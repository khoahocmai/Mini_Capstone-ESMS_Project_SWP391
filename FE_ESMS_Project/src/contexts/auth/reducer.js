import { INITIALIZE, SIGN_IN, SIGN_OUT } from "./constants";

const reducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE: {
            const { isAuthenticated, user } = action.payload;

            return {
                ...state,
                isAuthenticated,
                isInitialized: true,
                user,
            };
        }

        case SIGN_IN: {
            const { user } = action.payload;

            return {
                ...state,
                isAuthenticated: true,
                user,
            };
        }

        case SIGN_OUT: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        }

        default:
            break;
    }
};

export default reducer;
