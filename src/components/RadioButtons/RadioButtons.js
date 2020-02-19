import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import styles from "./RadioButtons.module.css";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

export default function RadioButtonsGroup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Rounds");

  const handleChange = event => {
    setValue(event.target.value);
    if (event.target.value === "Rounds") {
      props.roundsHandler();
    } else if (event.target.value === "Playtime (min)") {
      props.timeHandler();
    }
  };

  return (
    <div className={styles.RadioButtons}>
      <FormControl component='fieldset'>
        <RadioGroup
          aria-label='gameplay'
          name='gender1'
          value={value}
          onChange={handleChange}
        >
          <div className={styles.Flex}>
            <FormControlLabel
              value='Rounds'
              control={<Radio />}
              label='Rounds'
            />
            <FormControlLabel
              value='Playtime (min)'
              control={<Radio />}
              label='Playtime (min)'
            />
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
}
