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

const targetformats = [
    {
        value: 'csv',
        label: 'csv',
    },
    {
        value: 'orc',
        label: 'orc',
    },
    {
        value: 'parquet',
        label: 'parquet',
    },
];

export default function ADLSGenOne(props) {
    const classes = useStyles();
    const [ApplicationID, setApplicationID] = React.useState('');
    const [ApplicationCredential, setApplicationCredential] = React.useState('');
    const [DirectoryID, setDirectoryID] = React.useState('');
    const [adlAccountName, setadlAccountName] = React.useState('');
    const [TargetFileType, setTargetFileType] = React.useState('');
    const [TargetFileDelimiter, setTargetFileDelimiter] = React.useState('');
    const [Disabled, setDisabled] = React.useState(true);
    const [errorinfo, seterrorinfo] = React.useState(false);
    const [error, seterror] = React.useState('');



    const handleChangeApplicationID = (event) => {
        setApplicationID(event.target.value);
    };

    const handleChangeApplicationCredential = (event) => {
        setApplicationCredential(event.target.value);
    };

    const handleChangeDirectoryID = (event) => {
        setDirectoryID(event.target.value);
    };

    const handleChangeadlAccountName = (event) => {
        setadlAccountName(event.target.value);
    };

    const handleChangeTargetFileDelimiter = (event) => {
        setTargetFileDelimiter(event.target.value);

        if ((event.target.value !== ',') && (event.target.value !== ';')) {
            seterrorinfo(true)
            seterror("Invalid Delimiter")
        }
        else {
            seterrorinfo(false)
            seterror("")
        }
    };

    const handleChangeTargetFileType = (event) => {
        setTargetFileType(event.target.value);
        if (event.target.value === 'csv') {
            setDisabled(false)
        }
        else { setDisabled(true) }
    };

    const handleADLSGenOneOk = () => {
        let data = {
            "ApplicationID": ApplicationID,
            "ApplicationCredential": ApplicationCredential,
            "DirectoryID": DirectoryID,
            "adlAccountName": adlAccountName,
            "TargetFileType": TargetFileType,
            "TargetFileDelimiter": TargetFileDelimiter,
        }

        props.onPassADLSGenOne(data);
    }



    return (
        <div>
        <Grid container spacing={2}>
            <Grid item xs={4} direction="column" container>
                <TextField
                    id="ApplicationID"
                    label="Enter ApplicationID"
                    placeholder="ApplicationID"
                    onChange={handleChangeApplicationID}
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
                    id=" ApplicationCredential"
                    label="Enter ApplicationCredential"
                    placeholder="ApplicationCredential"
                    onChange={handleChangeApplicationCredential}
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
                    id="DirectoryID"
                    label="Enter DirectoryID"
                    placeholder="DirectoryID"
                    onChange={handleChangeDirectoryID}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            </Grid>

            <Grid container spacing={2}>
            <Grid item xs={4} direction="column" container>
                <TextField
                    id="adlAccountName"
                    label="Enter adlAccountName"
                    placeholder="adlAccountName"
                    onChange={handleChangeadlAccountName}
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
                    id="TargetFileType"
                    select
                    label="Enter Format"
                    value={TargetFileType}
                    onChange={handleChangeTargetFileType}
                    helperText="Please select the format"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VerifiedUserIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    {targetformats.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={4} direction="column" container>
                <TextField
                    id="TargetFileDelimiter"
                    label="Enter Delimiter"
                    placeholder="Delimiter"
                    disabled={Disabled}
                    error={errorinfo}
                    helperText={error}
                    onChange={handleChangeTargetFileDelimiter}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid >
            <Grid item container spacing={2}>
                <Button variant="contained" color="primary" onClick={(e) => {
                    e.preventDefault();
                    handleADLSGenOneOk()
                }}>Ok</Button>
            </Grid>
            </Grid>
            {/* ADLS Gen 1 parameter ends */}
        </div>
    )
}