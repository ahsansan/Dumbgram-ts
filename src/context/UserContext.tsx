import { createContext, useReducer, FC } from "react";

interface UserState {
  isLogin: boolean;
  user: {};
}

interface ActionInterface {
  type: string;
  payload: any;
}

const initialState = {
  isLogin: false,
  user: {},
};

export const UserContext = createContext<any[]>([]);

const reducer = (state: UserState, action: ActionInterface) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
