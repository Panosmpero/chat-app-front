import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../store/actions/userActions";

import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import Spinner from "../components/Spinner";
import CssBaseline from "@material-ui/core/CssBaseline";

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
  button: {
    marginBottom: "1rem",
  },
  register: {
    cursor: "pointer",
  },
}));

const RegisterScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  let { userInfo, loading, error } = useSelector((state) => state.userRegister);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(username, password, rePassword));
  };

  useEffect(() => {
    if (userInfo) {      
      props.history.push("/signin");
    }
  }, [props.history, userInfo]);

  return (
    <>
      <Grid container className={classes.grid}>
        <CssBaseline />
        <Grid item xs={12} sm={7} md={6} className={classes.form}>
          <Spinner visible={loading} />
          <Typography component="h1" variant="h5" align="center">
            Register
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
              helperText={
                password.length < 8
                  ? "The password must be at least 8 characters long"
                  : null
              }
              error={password.length < 8 ? true : false}
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TextField
              name="repassword"
              label="Re-enter Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setRePassword(e.target.value)}
              value={rePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Register
            </Button>
            {error && (
              <Alert severity="error" variant="filled">
                {error}
              </Alert>
            )}
            <Link to="/signin" className={classes.register}>
              Already a user? Sign In.
            </Link>
          </form>
        </Grid>
        <Grid item sm={5} md={6} className={classes.image} />
      </Grid>
    </>
  );
};

export default RegisterScreen;
