import Login from "../screens/login";
import { useAuth } from "./firebase";

const AuthWrapper = ({children}: any) => {
    const { user } = useAuth();
    if (!user) return <Login />;

    return children;
}

export default AuthWrapper;        