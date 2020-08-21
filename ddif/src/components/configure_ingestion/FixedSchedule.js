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



const scheduletypes = [
    {
        value: 'minute',
        label: 'minute',
    },
    {
        value: 'hourly',
        label: 'hourly',
    },
    {
        value: 'daily',
        label: 'daily',
    },
    {
        value: 'weekly',
        label: 'weekly',
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
}));

export default function FixedSchedule(props) {
    const classes = useStyles();
    const [selectedTime, setSelectedTime] = React.useState(new Date().toISOString());
    const [scheduleType, setscheduleType] = React.useState('');
    // const [minutes, setMinutes] = React.useState(0);
    // const [hours, setHours] = React.useState(0);
    const [hours_minutes,setHoursMinutes]= React.useState(0);
    // const [days, setDays] = React.useState(0);
    const [weeks, setWeeks] = React.useState('');
    const [hiddenminute, setHiddenMinute] = React.useState("none");
    const [hiddenhour, setHiddenHour] = React.useState("none");
    const [hiddenday, setHiddenDay] = React.useState("none");
    const [hiddenweek, setHiddenWeek] = React.useState("none");
    const [startDate, setStartDate] = React.useState(new Date().toISOString());
    const [endDate, setEndDate] = React.useState(new Date().toISOString());


    const handleTimeChange = (date) => {
        setSelectedTime(date);
        // console.log(selectedTime)
    };

    const handleChangescheduleType = (event) => {
        setscheduleType(event.target.value);

        if (event.target.value === "minute") {
            setHiddenHour("none")
            setHiddenDay("none")
            setHiddenWeek("none")
            setHiddenMinute("block")

        }
        else if (event.target.value === "hourly") {
            setHiddenMinute("none")
            setHiddenDay("none")
            setHiddenWeek("none")
            setHiddenHour("block")

        }
        else if (event.target.value === "daily") {
            setHiddenMinute("none")
            setHiddenHour("none")
            setHiddenWeek("none")
            setHiddenDay("block")
        }
        else {
            setHiddenMinute("none")
            setHiddenHour("none")
            setHiddenDay("none")
            setHiddenWeek("block")
        }
    };

    // const handleChangeminutes = (event) => {
    //     setMinutes(event.target.value);
    // };

    // const handleChangehours = (event) => {
    //     setHours(event.target.value);
    // };
    const handleChangehoursminutes = (event) => {
        setHoursMinutes(event.target.value);
    };

    // const handleChangeday = (event) => {
    //     setDays(event.target.value);
    // };

    const handleChangeweek = (event) => {
        setWeeks(event.target.value);
    };

    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };

    const handleChangeEndDate = (date) => {
        setEndDate(date);
    };





    const handleFixedScheduleOk =()=>{
        let data ={
            "selectedTime":selectedTime,
            "scheduleType":scheduleType,
            "hours_minutes":hours_minutes,
            "weeks":weeks,
            "startDate":startDate,
            "endDate":endDate
        }

        props.onPassFixedSchedule(data);
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Select Time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>

            <div >
                <TextField
                    id="scheduletype"
                    select
                    label="Recurrence"
                    value={scheduleType}
                    onChange={handleChangescheduleType}
                    helperText="Please select the Schedule Type"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VerifiedUserIcon />
                            </InputAdornment>
                        ),
                    }}
                >
                    {scheduletypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div style={{ display: hiddenminute }}>
                <TextField
                    id=" minutes"
                    label="Enter minutes"
                    placeholder="Minutes"
                    type="number"
                    onChange={handleChangehoursminutes}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            <div style={{ display: hiddenhour}}>
                <TextField
                    id=" hours"
                    label="Enter Hour"
                    placeholder="Hour"
                    type="number"
                    onChange={handleChangehoursminutes}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            {/* <div style={{ display: hiddenday}}>
                <TextField
                    id="daily"
                    label="Enter your choice"
                    placeholder="Daily"
                    onChange={handleChangeday}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div> */}

            <div style={{ display: hiddenweek }}>
                <TextField
                    id="weekly"
                    label="Enter your choice"
                    placeholder="Weekday"
                    onChange={handleChangeweek}
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog-start"
                        label="Select Start Date"
                        format="MM/dd/yyyy"
                        value={startDate}
                        onChange={handleChangeStartDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog-end"
                        label="Select End Date"
                        format="MM/dd/yyyy"
                        value={endDate}
                        onChange={handleChangeEndDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>

            <div style={{ marginTop: "30px" }}>
                <Button className={classes.buttonRoot} variant='contained' color='primary' onClick={(e)=>{
                                    e.preventDefault();
                                    handleFixedScheduleOk()
                                    }}>OK</Button>
            </div>
            </form>
        </div>

    )
}