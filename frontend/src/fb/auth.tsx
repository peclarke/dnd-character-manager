import { StoreProvider } from "easy-peasy";
import NewNav from "../components/nav";
import Login from "../screens/login";
import { useAuth } from "./firebase";
import { store } from "../store/model";

const AuthWrapper = ({children}: any) => {
    const { user } = useAuth();
    if (!user) return <Login />;

    return (
        <>
        <StoreProvider store={store}>
            <NewNav />
            {children}
        </StoreProvider>
        </>
    );
}

export default AuthWrapper;        