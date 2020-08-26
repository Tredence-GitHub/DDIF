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

export default function Hive(props) {
    const classes = useStyles();
    const [odbcHostname, setodbcHostname] = React.useState('');
    const [odbcUsername, setodbcUsername] = React.useState('');
    const [odbcPassword, setodbcPassword] = React.useState('');
    const [odbcDatabaseName, setodbcDatabaseName] = React.useState('');
    const [sourceQuery, setsourceQuery] = React.useState('');

    const handleChangeodbcHostname = (event) => {
        setodbcHostname(event.target.value);
    };

    const handleChangeodbcUsername = (event) => {
        setodbcUsername(event.target.value);
    };

    const handleChangeodbcPassword = (event) => {
        setodbcPassword(event.target.value);
    };

    const handleChangeodbcDatabaseName = (event) => {
        setodbcDatabaseName(event.target.value);
    };

    const handleChangesourceQuery = (event) => {
        setsourceQuery(event.target.value);
    };

    const handleHiveOk = () => {
        let data = {
            "odbcHostname": odbcHostname,
            "odbcUsername": odbcUsername,
            "odbcPassword": odbcPassword,
            "odbcDatabaseName": odbcDatabaseName,
            "sourceQuery": sourceQuery
        }

        props.onPassHive(data);
    }



    return (
        <div>
            <Grid container spacing={2}>
            <Grid item xs={4} direction="column" container>
                <TextField
                    id="odbcHostname"
                    label="Enter odbcHostname"
                    placeholder="odbcHostname"
                    onChange={handleChangeodbcHostname}
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
                    id=" odbcUsername"
                    label="Enter odbcUsername"
                    placeholder="odbcUsername"
                    onChange={handleChangeodbcUsername}
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
                    id=" odbcPassword"
                    label="Enter odbcPassword"
                    placeholder="odbcPassword"
                    type="password"
                    onChange={handleChangeodbcPassword}
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
                    id=" odbcDatabaseName"
                    label="Enter odbcDatabaseName"
                    placeholder="odbcDatabaseName"
                    onChange={handleChangeodbcDatabaseName}
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
                    id=" sourceQuery"
                    label="Enter Source Query"
                    placeholder="Source Query"
                    onChange={handleChangesourceQuery}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item container spacing={2}>
                <Button variant="contained" color="primary" onClick={(e) => {
                    e.preventDefault();
                    handleHiveOk()
                }}>Ok</Button>
            </Grid>
            </Grid>
            {/* Mysql parameter ends */}
            </div>
    )
}