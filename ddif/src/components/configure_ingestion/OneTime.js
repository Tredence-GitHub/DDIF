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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

export default function OneTime(props){
    const classes = useStyles();

    // const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState(new Date().toISOString());

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    //     console.log(selectedDate)
    // };

    const handleTimeChange = (date) => {
        setStartTime(date);
        // console.log(startTime)
    };
    

    const handleOneTimeOk =()=>{
        let data ={
            "StartTime":startTime,
        }

        props.onPassOneTimeSchedule(data);
    }

    return(
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Select Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}

            <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Select Time"
                    value={startTime}
                    onChange={handleTimeChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
        </MuiPickersUtilsProvider>
        <div>
        <Button className={classes.buttonRoot} variant='contained' color ='primary' onClick={(e)=>{
                                    e.preventDefault();
                                    handleOneTimeOk()
                                    }}>OK</Button>
        </div>
        </div>
        
    )
}