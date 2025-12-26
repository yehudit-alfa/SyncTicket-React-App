import {  useContext, useEffect, type FunctionComponent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode; // התוכן שנמצא בתוך הקומפוננטה
    allowedRoles: string[];//רשימת התפקידים שמותר להם להכנס לעמוד הזה
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { token, user } = useContext(AuthContext)!;
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || token === "") {
            navigate("/login");
            return;
        }
        const role = user?.role;
        if (!role) return;
        
         if (!allowedRoles.includes(role || "")) {
            alert("אין לך הרשאה לגשת לעמוד זה");
            navigate("/dashboard"); 
        }
    }, [token, user?.role, allowedRoles, navigate])

    if (token !== null && allowedRoles.includes(user?.role || "")) {
        return <>{children}</>;
    }
    return <></>

}


export default ProtectedRoute;