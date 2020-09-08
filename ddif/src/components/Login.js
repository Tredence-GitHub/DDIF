import React, { Component } from 'react'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography'
import {ThemeProvider,createMuiTheme } from "@material-ui/core/styles"
import Switch from '@material-ui/core/Switch';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const roles = [
    {
        value: 'user',
        label: 'user',
    },
    {
        value: 'admin',
        label: 'admin',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
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
    margin: {
        margin: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        marginLeft: "115px"
    },

}));



export default function Login(props) {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const [msg, setMsg] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();
    
    let local = "http://localhost:4000"
    let deploy = 'https://driverless-data-ingestion.azurewebsites.net'
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };



    const validator = (e) => {


        let resp = Axios.post(`${deploy}/auth/authenticateUser`, {
            username: username,
            password: password,
        }
        ).then((response) => {
            console.log(response);
            if (response.status === 200) {
                // alert(response.data.message)
                // handleOpen()
                // setMsg(response.data.message)
                enqueueSnackbar(response.data.message, {
                    variant: 'success',
                });
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('username', username);
                // return window.location.href = "/home";
                setTimeout(history.push('/home'), 50000);
            }
            else if (response.status === 400) {
                // handleOpen()
                // setMsg('You are not registered with us! Please register!')
                // alert('You are not registered with us! Please register!')
                // return window.location.href = "/";
                enqueueSnackbar('You are not registered with us! Please register!', {
                    variant: 'warning',
                });
            }

        }).catch((err) => {
            console.log(err);
            // handleOpen()
            // setMsg('You are not registered with us! Please register!')
            // alert('You are not registered with us! Please register!')
            // return window.location.href = "/";
            enqueueSnackbar('You are not registered with us! Please register!', {
                variant: 'warning',
            });
        });
    }

    const [darkMode, setDarkMode] = React.useState(false);
    const theme = createMuiTheme({
        palette:{
          type : darkMode ? "dark" : "light"
        }
      });

    return (
        // <div className={classes.root} style={{backgroundImage: `url(${Background})`}}>

        <ThemeProvider theme={theme}>
        <paper>
        <div className={classes.root} style={{ backgroundColor: "lightblue" }}>
            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={<span id="message-id">{msg}</span>}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            /> */}

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                width="100px"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3} >
                    <Paper className={classes.paper} style={{ width: "300px" }}>
                        {/* <div style={{marginLeft:"150px"}}>
                            <Switch checked={darkMode} onChange={()=>{setDarkMode(!darkMode)}}/>
                            <small>Dark Mode</small>
                        </div> */}
                    
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography>Login</Typography>
                        
                        <hr />
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="username"
                                    label="Enter Username"
                                    placeholder="Username"
                                    onChange={handleChangeUsername}
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
                                    id="password"
                                    label="Enter Password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={handleChangePassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className={classes.buttonRoot}>
                                <Button variant="contained" color="primary" onClick={(e) => { e.preventDefault(); validator(); }}>
                                    Login
                                </Button>

                                {/* <Button type='reset' variant="outlined" color="primary" onClick={(e) => {
                                    setUsername("")
                                    setPassword("")
                                }}>
                                    Reset
                                </Button> */}

                                {/* <Button variant="outlined" color="primary" href='/ChangePassword'>
                                    Forget Password?
                                </Button> */}
                            </div>
                            <div className={classes.buttonRoot}>
                                <Link to="/register" variant="body2">
                                    {'Not Registered? Create an account! '}
                                </Link>
                            </div>

                            <div className={classes.buttonRoot}>
                                <Link to="/recover" variant="body2">
                                    {'Forgot Password?'}
                                </Link>
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </paper>
        </ThemeProvider>

    )
}