import { useState } from 'react';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './screens.css';

const Login = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState(false);

    const login = () => {
        if (user === "" && pass === "") return;
        setError(false);
        setLoading(true);
        
        // do some fb auth shit
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user, pass)
        .then((_userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            window.location.reload();
            setLoading(false);
            setError(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setError(true);
            setLoading(false);
        });
    }

    return (
        <section>
            <form>
                <div className="formInfo">
                    <span>DND Character Manager</span>
                    <span>by Paul Clarke</span>
                </div>
                <TextField disabled={loading} value={user} placeholder={"Username"} onChange={(e) => setUser(e.target.value)} fullWidth={true} required={true}/>
                <TextField disabled={loading} value={pass} placeholder={"Password"} onChange={(e) => setPass(e.target.value)} type={"password"} fullWidth={true} required={true}/>
                <Button variant="contained" disabled={loading} onClick={login} fullWidth={true}>
                    {
                        loading ? <CircularProgress color="inherit" size={25}/> : "Login"
                    }
                </Button>
                {error && <Alert severity={"error"} sx={{width: "100%"}}>There was a problem logging you in</Alert>}
            </form>
        </section>
    )
}

export default Login;