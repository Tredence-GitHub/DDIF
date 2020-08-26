import React, { Component } from 'react'
import ReactDom from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import { lightBlue } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '30ch',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    buttonRoot: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Onedrive(props) {
    const classes = useStyles();
    const [odlink, setodLink] = React.useState('');
    const [oddelimiter, setodDelimiter] = React.useState('');
    const [errorinfo, seterrorinfo] = React.useState(false);
    const [error, seterror] = React.useState('');

    const handleChangeodLink = (event) => {
        setodLink(event.target.value);
    };

    const handleChangeodDelimiter = (event) => {
        setodDelimiter(event.target.value);
        if ((event.target.value !== ',') && (event.target.value !== ';')) {
            seterrorinfo(true)
            seterror("Invalid Delimiter")
        }
        else {
            seterrorinfo(false)
            seterror("")
        }

    };

    const handleOneDriveOk = () => {
        let data = {
            "Link": odlink,
            "Delimiter": oddelimiter,
            "sourceQuery": ""
        }

        props.onPassOneDrive(data);
    }



    return (
        <div>
            <Grid container  spacing={2}>
            <Grid item xs={4} direction="column" container>
                <TextField
                    id="link"
                    label="Enter One Drive Link"
                    placeholder="Link"
                    onChange={handleChangeodLink}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={4} direction="column" container>
                <TextField
                    id=" odDelimiter"
                    label="Enter Delimiter"
                    placeholder="Delimiter"
                    onChange={handleChangeodDelimiter}
                    error={errorinfo}
                    helperText={error}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item container spacing={2} >
                <Button variant="contained" color="primary" onClick={(e) => {
                    e.preventDefault();
                    handleOneDriveOk()
                }}>Ok</Button>
            </Grid>
            </Grid>
            {/* One drive parameter ends */}
            </div>
    )
}