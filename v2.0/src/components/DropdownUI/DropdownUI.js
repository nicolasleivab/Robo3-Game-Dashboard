import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    };

    return (
        <div>
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
                    <MenuItem value={'Instructions'}>instructions</MenuItem>
                    <MenuItem value={'Functions'}>Functions</MenuItem>
                    <MenuItem value={'Loops'}>Loops</MenuItem>
                    <MenuItem value={'PickDrop'}>PickDrop</MenuItem>
                    <MenuItem value={'Movement'}>Movement</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}