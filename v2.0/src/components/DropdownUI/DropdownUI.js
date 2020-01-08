import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from './DropdownUI.module.css';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function DropdownUI(props) {
    const classes = useStyles();
    const [instruction, setInstruction] = React.useState('Cycles');

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setInstruction(event.target.value);
        if (event.target.value == 'Cycles') {
            props.cyclesDataHandler();
        } else if (event.target.value == 'Instructions') {
            props.instructionsDataHandler();
        } else if (event.target.value == 'Functions') {
            props.functionsDataHandler();
        } else if (event.target.value == 'Loops') {
            props.loopsDataHandler();
        } else if (event.target.value == 'PickDrop') {
            props.pickdropDataHandler();
        } else if (event.target.value == 'Movement') {
            props.movementDataHandler();
        }
    };

    return (
        <div className={styles.DropdownUI}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Instruction
        </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={instruction}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                >
                    <MenuItem value={'Cycles'}>Cycles</MenuItem>
                    <MenuItem value={'Instructions'}>Instructions</MenuItem>
                    <MenuItem value={'Functions'}>Functions</MenuItem>
                    <MenuItem value={'Loops'}>Loops</MenuItem>
                    <MenuItem value={'PickDrop'}>PickDrop</MenuItem>
                    <MenuItem value={'Movement'}>Movement</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}