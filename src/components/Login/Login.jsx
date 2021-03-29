import React , {useEffect,useState} from 'react';
import styled from "styled-components";
import hometestLogo from '../../images/hometest.png';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {adminSignin} from './api';
import {useHistory}  from "react-router-dom";


const LoginForm = styled.div`
  height: 100vh;
  width: 70%;
  margin: 0 auto;
  background-color: whitesmoke;
  text-align: center;

  .login__form__error {
      color : red;
      padding : 5px;
  }
`;

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({setRender,setAuth}) => {

    const history = useHistory();
    const classes = useStyles();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSignin = async (e) => {
        e.preventDefault();
        const response = await adminSignin(name,password);
        if(response.error)
        {
            setError("Incorrect username or password");
        }

        if(response.status)
        {
            localStorage.setItem("token",response.response.original.access_token);
            localStorage.setItem("id",response.response.original.id);
            setName("");
            setPassword("");
            setRender(prevState => {
                return !prevState;
            })
            history.push("/admins");
        }

    }

    useEffect(() => {
        setAuth(false);
    }, []);

    return (
        <LoginForm>
            <img src={hometestLogo} alt="" />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h3" variant="h5">
                        Admin Sign in
                    </Typography>
                    <p className="login__form__error">{error}</p>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={e => {
                                setName(e.target.value);
                                setError("");
                            }}
                            value={name}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            value={password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSignin}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        </LoginForm>
    );
}

export default Login;