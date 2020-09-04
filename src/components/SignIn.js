import React from "react";
import { useState } from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: "1rem"
  },
  register: {
    cursor: "pointer",
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
    const url = "http://localhost:8000/api/users/signin";
    setLoading(true);
    const { data } = await Axios.post(url, {
      username,
      password,
    });
    setLoading(false);
    if (!data.username && data.message) {
      setError(data.message)
      return;
    };
    handleSignInSuccess();
  };
  return (
    <>
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
