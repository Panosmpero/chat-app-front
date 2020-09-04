import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import SignIn from "../components/SignIn";
import Register from "../components/Register";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url('/img/daniel-korpai-r73OFSry5AI-unsplash.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  form: {
    padding: ".5rem",
  },
}));

const Home = (props) => {
  const [registered, setRegistered] = useState(true);

  const classes = useStyles();

  const registerSuccess = () => toast.success("Registered Successfully!");
  const signInSuccess = () => props.history.push("/chat");
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
        <Grid item sm={5} md={6} className={classes.image} />
        <Grid item xs={12} sm={7} md={6} className={classes.form}>
          {registered ? (
            <SignIn
              setRegistered={setRegistered}
              handleSignInSuccess={signInSuccess}
            />
          ) : (
            <Register
              setRegistered={setRegistered}
              handleRegisterSuccess={registerSuccess}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
