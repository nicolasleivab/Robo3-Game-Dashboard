import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styles from "./DropdownLevel.module.css";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function DropdownLevel(props) {
  const classes = useStyles();
  const [instruction, setInstruction] = React.useState("All Levels");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setInstruction(event.target.value);
    if (event.target.value === "All Levels") {
      props.allLevelsHandler();
    } else if (event.target.value === "Hello, world!!!") {
      props.level1Handler();
    } else if (event.target.value === "Inverti") {
      props.level2Handler();
    } else if (event.target.value === "Inverti i pari") {
      props.level3Handler();
    } else if (event.target.value === "Concatena") {
      props.level4Handler();
    } else if (event.target.value === "Filtro Rosso") {
      props.level5Handler();
    } else if (event.target.value === "Filtro Doppio Rosso") {
      props.level6Handler();
    } else if (event.target.value === "Filtra tutti rossi") {
      props.level7Handler();
    } else if (event.target.value === "Copia") {
      props.level8Handler();
    } else if (event.target.value === "Cattura il cubo") {
      props.level9Handler();
    } else if (event.target.value === "Scatter") {
      props.level10Handler();
    } else if (event.target.value === "Alterna") {
      props.level11Handler();
    }
  };

  return (
    <div className={styles.DropdownLevel}>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel ref={inputLabel} id='demo-simple-select-outlined-label'>
          Level
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={instruction}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value={"All Levels"}>All Levels</MenuItem>
          <MenuItem value={"Hello, world!!!"}>Hello, world!!!</MenuItem>
          <MenuItem value={"Inverti"}>Inverti</MenuItem>
          <MenuItem value={"Inverti i pari"}>Inverti i pari</MenuItem>
          <MenuItem value={"Concatena"}>Concatena</MenuItem>
          <MenuItem value={"Filtro Rosso"}>Filtro Rosso</MenuItem>
          <MenuItem value={"Filtro Doppio Rosso"}>Filtro Doppio Rosso</MenuItem>
          <MenuItem value={"Filtra tutti rossi"}>Filtra tutti rossi</MenuItem>
          <MenuItem value={"Copia"}>Copia</MenuItem>
          <MenuItem value={"Cattura il cubo"}>Cattura il cubo</MenuItem>
          <MenuItem value={"Scatter"}>Scatter</MenuItem>
          <MenuItem value={"Alterna"}>Alterna</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
