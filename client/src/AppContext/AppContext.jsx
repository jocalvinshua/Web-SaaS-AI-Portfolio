import { createContext, useState, useContext, useReducer, useEffect } from "react";
import { userAxios, resumeAxios } from "../axios/Axios";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    user: null,
    isLogin: false,
    isLoading: true,
    error: null,
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return { ...state, isLoading: true, error: null };
      case "LOGIN_SUCCESS":
        return { ...state, isLoading: false, isLogin: true, user: action.payload, error: null };
      case "LOGIN_FAILURE":
        return { ...state, isLoading: false, isLogin: false, error: action.payload };
      case "STOP_LOADING":
        return { ...state, isLoading: false };
      case "LOGOUT":
        return { ...initialState, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [resume, setResume] = useState({});
  const [userResumes, setUserResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState({})

  // --- LOGIKA USER ---

  const getUserData = async () => {
    try {
      const { data } = await userAxios.get("/is-auth"); 
      if (data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.userData });
        fetchUserResumes();
      }
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  const login = async (formData) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const { data } = await userAxios.post("/login", formData);
      if (data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        toast.success("Login Successful!");
        console.log(data)
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login Failed";
      dispatch({ type: "LOGIN_FAILURE", payload: msg });
      toast.error(msg);
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await userAxios.post("/register", formData);
      if (data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        toast.success("Registration Success!");
        console.log(data)
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Register Failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      const { data } = await userAxios.get('/logout');
      if (data.success) {
        dispatch({ type: "LOGOUT" });
        setUserResumes([]);
        toast.success("Logged Out");
      }
    } catch (error) {
      toast.error("Logout Failed");
    }
  };

  // --- LOGIKA RESUME ---

  const fetchUserResumes = async () => {
    try {
      const { data } = await resumeAxios.get("/my-resumes");
      if (data.success) {
        setUserResumes(data.userResumes || []);
      }
    } catch (error) {
      console.error("Failed Fetching Resumes");
    }
  };

  const createResume = async (title) => {
    try {
      const { data } = await resumeAxios.post("/create", { title });
      if (data.success) {
        toast.success("Resume Created!");
        return data.resume;
      }
    } catch (error) {
      toast.error("Failed Create Resume");
    }
  };

  const saveResume = async (resumeId, resumeData) => {
    try {
      if(!resumeId) return toast.error("Resume ID is missing");

      const { data } = await resumeAxios.put(`/save/${resumeId}`, resumeData);
      
      if (data.success) {
        toast.success("Resume Saved!");
        setCurrentResume(data.resume);
        return true;
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  const editTitleResume = async (resumeId, newTitle) => {
    try {
      const { data } = await resumeAxios.patch("/edit-title", { 
        resumeId, 
        title: newTitle 
      });

      if (data.success) {
        setUserResumes((prev) =>
          prev.map((res) => (res._id === resumeId ? { ...res, title: newTitle } : res))
        );
        
        toast.success("Title Successfully Edited");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed edit title");
      return false;
    }
  };

  const deleteResume = async (resumeId) => {
    if (!window.confirm("Do You want to delete this resume?")) return;

    try {
      const { data } = await resumeAxios.delete(`/delete/${resumeId}`);

      if (data.success) {
        setUserResumes((prev) => prev.filter((res) => res._id !== resumeId));
        
        toast.success("Resume Successfully Deleted");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed delete resume");
      return false;
    }
  };

  const getResumeById = async(resumeId)=>{
    try {
      const {data} = await resumeAxios.get(`/resume/${resumeId}`)
      if(data.success){
        setCurrentResume(data.resume || {})
        return true 
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to load resume data";
      toast.error(errorMsg);
      console.error("Fetch Error:", error);
      return false;
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    ...state,
    dispatch,
    resume,
    userResumes,
    login,
    logout,
    register,
    createResume,
    saveResume,
    fetchUserResumes,
    editTitleResume,
    deleteResume,
    getResumeById,
    currentResume
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};