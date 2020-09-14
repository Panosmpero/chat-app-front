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
}));

const Register = ({ setRegistered, handleRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }
    const url = "http://localhost:8000/api/user/register";
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
      handleRegisterSuccess();
      setRegistered(true);
      
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
        <Link onClick={() => setRegistered(true)} className={classes.register}>
          Already a user? Sign In.
        </Link>
      </form>
    </>
  );
};

export default Register;
