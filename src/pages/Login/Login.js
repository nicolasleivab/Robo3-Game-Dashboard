import React, { useState, useEffect } from "react";
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
import axios from "axios";
//adapted from Material UI

const googleAPIKey = process.env.REACT_APP_GOOGLEAPI_KEY;

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
  const [errMsg, setErrMsg] = useState("");
  const [studentsList, setStudents] = useState("");

  useEffect(() => {
    async function getStudents() {
      const res = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4/values/Sheet1?key=${googleAPIKey}`
      );
      const rawData = res.data.values;

      const formattedData = [];
      let prop, value;
      const studentsIds = [];
      //nested loops-> convert array of arrays to array of objects
      for (let i = 1; i < rawData.length; i++) {
        //first row (0) contains each column key(prop)
        let obj = {};
        for (let j = 0; j < rawData[i].length; j++) {
          prop = rawData[0][j];
          value = rawData[i][j];
          obj[prop] = value;
        }
        formattedData.push(obj);
      }
      console.log(formattedData.length);
      for (let i = 0; i < formattedData.length; i++) {
        const currentStudent = formattedData[i]["ID"];
        studentsIds.push(currentStudent);
      }
      //get unique values
      const uniqueStudents = studentsIds.filter(function(item, pos) {
        return studentsIds.indexOf(item) == pos;
      });

      console.log(uniqueStudents);
      setStudents(uniqueStudents);
    }
    getStudents();
  }, []);

  const textChange = e => {
    setText(e.target.value);
  };

  const submitUsername = () => {
    setErrMsg("");
    if (text === "tutor" || studentsList.includes(text)) {
      localStorage.removeItem("studentId");
      localStorage.setItem("studentId", JSON.stringify(text));
      setUsername(text);
    } else {
      setErrMsg("Invalid username");
    }
  };

  const enterListener = e => {
    if (e.key === "Enter") {
      submitUsername();
    }
  };

  if (username === "tutor") {
    return <Redirect to='./tutor' />;
  }
  if (
    username !== "" &&
    JSON.parse(localStorage.getItem("studentId")) !== null &&
    JSON.parse(localStorage.getItem("studentId")) !== undefined
  ) {
    return <Redirect to='./student' />;
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <div
          style={{
            width: 420,
            textAlign: "justify",
            color: "#555",
            textJustify: "inner-word"
          }}
        >
          <p>Demo credentials: </p>
          <p>Tutor dashboard username: tutor</p>
          <p>
            Student dashboard username: 10574525, 12341234, 15678900 or 11336789
          </p>
        </div>
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
            onKeyDown={enterListener}
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
            onKeyDown={enterListener}
          />
          <p style={{ textAlign: "center", fontStyle: "italic" }}>{errMsg}</p>
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
