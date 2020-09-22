import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../store/actions/userActions";

import { Grid, TextField, Button, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import Spinner from "../components/Spinner";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url('/img/daniel-korpai-r73OFSry5AI-unsplash.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "10",
    transition: "all 0.5s",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  form: {
    padding: ".5rem",
  },
  button: {
    marginBottom: "1rem",
  },
  register: {
    cursor: "pointer",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

const SigninScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userSignin);
  const { userInfo: registered } = useSelector((state) => state.userRegister);
  
  useEffect(() => {
    if (userInfo) props.history.push("/chat");
  }, [props.history, userInfo]);

  useEffect(() => {
    const registerSuccess = () => toast.success("Registered Successfully!");
    if (registered) registerSuccess(); 
  }, [registered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin(username, password));
  };  

  const handleRegister = () => {
    setRedirect(true);
    setTimeout(() => {
      props.history.push("/register")
    }, 500)
  };
  
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        draggable={false}
      />
      <Grid container className={classes.grid}>
        <CssBaseline />
        <Grid item sm={6} md={6} className={`${classes.image} ${redirect ? "move-right" : undefined}`} />
        <Grid item xs={12} sm={6} md={6} className={classes.form}>
          <Spinner visible={loading} />
          <Typography component="h1" variant="h5" align="center">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
              autoComplete="name"
              required
              fullWidth
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              autoComplete="current-password"
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Sign In
            </Button>
            {error && (
              <Alert severity="error" variant="filled">
                {error}
              </Alert>
            )}
            <Link onClick={handleRegister} className={classes.register}>
              First time here? Register.
            </Link>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SigninScreen;
