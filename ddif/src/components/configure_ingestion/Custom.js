import React, { useEffect, useState, Component } from 'react'
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
import Axios from 'axios';
import { lightBlue } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Customrules from './Customrules';


const functions = [
    {
        value: 'Add',
        label: 'Add',
    },
    {
        value: 'Subtract',
        label: 'Subtract',
    },
    {
        value: 'Multiply',
        label: 'Multiply',
    },
    {
        value: 'Divide',
        label: 'Divide',
    },
    {
        value: 'Average',
        label: 'Average ',
    },
    {
        value: 'Mode',
        label: 'Mode',
    },
    {
        value: 'Median',
        label: 'Median ',
    },
];

const fieldsA = [
    {
        value: 'colnum',
        label: 'colnum',
    },
    {
        value: 'colname',
        label: 'colname',
    },
    {
        value: 'datatype',
        label: 'datatype',
    },
    {
        value: 'nullable',
        label: 'nullable',
    },
    {
        value: 'description',
        label: 'description ',
    },
];

const operators = [
    {
        value: '+',
        label: '+',
    },
    {
        value: '-',
        label: '-',
    },
    {
        value: '*',
        label: '*',
    },
    {
        value: '/',
        label: '/',
    },
];

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
    progress: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function Custom(){
    const classes = useStyles();

    const [Functions, setFunctions] = React.useState('');
    const [FieldsA, setfieldsA] = React.useState('');
    const [Operators, setOperators] = React.useState('')

    const handleChangefunctions=(e)=>{
        setFunctions(e.target.value)
    }

    const handleChangefieldsA=(e)=>{
        setfieldsA(e.target.value)
    }

    const handleChangeOpeartors=(e)=>{
        setOperators(e.target.value)
    }
    return(
        <Grid container direction="column"
                    alignItems="center"
                    justify="center">
                    <Paper className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div style = {{marginBottom :"50px"}}>
                                <strong>Custom Rules </strong>
                                <hr />
                                <Grid container spacing={2}>
                                    <Grid item xs={3} direction="column" container >
                                        <TextField
                                            id="functions"
                                            select
                                            label=""
                                            value={Functions}
                                            onChange={handleChangefunctions}
                                            defaultValue={Functions}
                                            helperText="Please select the Functions"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VerifiedUserIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {functions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={3} direction="column" container >
                                        <TextField
                                            id="FieldsA"
                                            select
                                            label=""
                                            value={FieldsA}
                                            onChange={handleChangefieldsA}
                                            defaultValue={FieldsA}
                                            helperText="Please select the Fields"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VerifiedUserIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {fieldsA.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={3} direction="column" container>
                                        <TextField
                                            id="Operators"
                                            select
                                            label=""
                                            value={Operators}
                                            onChange={handleChangeOpeartors}
                                            defaultValue={Operators}
                                            helperText="Please select the Fields"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VerifiedUserIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {operators.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </div>
                            </form>
                            </Paper>
                            </Grid>
    )

}