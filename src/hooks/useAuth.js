import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// custom hook for AuthContext
const useAuth = () => useContext(AuthContext);

export default useAuth;