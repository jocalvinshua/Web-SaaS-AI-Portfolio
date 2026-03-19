import { createContext, useState, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const initialState = {
    user: null,
    isLogin: false,
    isLoading: false,
  }

  const authReducer = ()=>{
    switch (action.type){
      case "LOGIN_START":
        return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { 
        ...state, 
        isLoading: false, 
        isLogin: true, 
        user: action.payload,
        error: null 
      };
    case "LOGIN_FAILURE":
      return { 
        ...state, 
        isLoading: false, 
        isLogin: false, 
        error: action.payload 
      };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(savedUser) });
    }
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};