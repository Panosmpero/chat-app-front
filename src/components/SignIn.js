import React from "react";
import { useState } from "react";
import Axios from "axios";

import { TextField, Button, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import Spinner from "./Spinner";


const useStyles = makeStyles((theme) => ({
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

const SignIn = ({ setRegistered, handleSignInSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/user/signin";
    setLoading(true);
    try {
      const { data } = await Axios.post(url, {
        username,
        password,
      });
      if (!data.username && data.message) {
        setError(data.message);
        setLoading(false);
        return;
      }
      handleSignInSuccess();
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
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
        <Link onClick={() => setRegistered(false)} className={classes.register}>
          First time here? Register.
        </Link>
      </form>
    </>
  );
};

export default SignIn;
