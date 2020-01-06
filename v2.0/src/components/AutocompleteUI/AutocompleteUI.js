import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class AutocompleteUI extends Component {

keySubmit = (e)=>{
    if (e.keyCode == 13) {
    let inputCode = document.getElementById("crypto-autocomplete").value;
    console.log(inputCode);
    //call some parent method
    }
}

render() {
    return (
        <div>
            <Autocomplete
                id="crypto-autocomplete"
                options={[{ID: '10574525'}, {ID: '12341234'}, {ID: '10101010'}]}
                getOptionLabel={option => option.ID}
                style={{ width: 350 }}
                onKeyDown={this.keySubmit}
                renderInput={params => (
                    <TextField {...params} label="Filter by Person Code" variant="outlined" fullWidth />

                )}
            />
        </div>
    );
    }
}

export default AutocompleteUI;