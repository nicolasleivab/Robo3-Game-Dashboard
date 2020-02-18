import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../components/Copyright/Copyright";
//adapted from Material UI

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  btn: {
    width: 500,
    height: 50,
    backgroundColor: "blue"
  }
}));

export default function Login() {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  const textChange = e => {
    setText(e.target.value);
  };

  const submitUsername = () => {
    setUsername(text);
    if (username === "tutor") {
      console.log(username);
    }
  };
  if (username === "tutor") {
    return <Redirect to='./tutor' />;
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            onChange={textChange}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            //name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={submitUsername}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='./' href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='./' href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright copyright={"Robo3 Dashboard"} />
      </Box>
    </Container>
  );
}
