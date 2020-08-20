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

export default function Mysql(props){
    const classes = useStyles();
    const [jdbcHostname, setjdbcHostname] = React.useState('');
    const [jdbcUsername, setjdbcUsername] = React.useState('');
    const [jdbcPassword, setjdbcPassword] = React.useState('');
    const [jdbcDatabaseName, setjdbcDatabaseName] = React.useState('');
    const [sourceQuery, setsourceQuery] = React.useState('');

    const handleChangejdbcHostname= (event) => {
        setjdbcHostname(event.target.value);
    };

    const handleChangejdbcUsername= (event) => {
        setjdbcUsername(event.target.value);
    };

    const handleChangejdbcPassword= (event) => {
        setjdbcPassword(event.target.value);
    };

    const handleChangejdbcDatabaseName= (event) => {
        setjdbcDatabaseName(event.target.value);
    };

    const handleChangesourceQuery= (event) => {
        setsourceQuery(event.target.value);
    };

    const handleMysqlOk =()=>{
        let data ={
            "jdbcHostname":jdbcHostname,
            "jdbcUsername":jdbcUsername,
            "jdbcPassword":jdbcPassword,
            "jdbcDatabaseName":jdbcDatabaseName,
            "sourceQuery":sourceQuery
        }

        props.onPassMysql(data);
    }


    return(
        <form className={classes.root} noValidate autoComplete="off">
        <div>
                            <TextField
                                    id="jdbcHostname"
                                    label="Enter jdbcHostname"
                                    placeholder="jdbcHostname"
                                    required
                                    onChange={handleChangejdbcHostname}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div>
                            <TextField
                                    id=" jdbcUsername"
                                    label="Enter jdbcUsername"
                                    placeholder="jdbcUsername"
                                    onChange={handleChangejdbcUsername}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div>
                            <TextField
                                    id=" jdbcPassword"
                                    label="Enter jdbcPassword"
                                    placeholder="jdbcPassword"
                                    type="password"
                                    onChange={handleChangejdbcPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div>
                            <TextField
                                    id=" jdbcDatabaseName"
                                    label="Enter jdbcDatabaseName"
                                    placeholder="jdbcDatabaseName"
                                    onChange={handleChangejdbcDatabaseName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div>
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
                            </div>
                            <div>
                                <Button variant="contained" color="primary" onClick={(e)=>{
                                    e.preventDefault();
                                    handleMysqlOk()
                                    }}>Ok</Button>
                            </div>
                            {/* Mysql parameter ends */}
                        </form>
    )
}