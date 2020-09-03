import React  from 'react'
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar,withSnackbar } from 'notistack';


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
            margin: theme.spacing(1),
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
}));



export default function Login() {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const [msg, setMsg] = React.useState('');
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('');

    const [errorinfo, seterrorinfo] = React.useState('');
    const [error, seterror] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const history = useHistory();
    let local = "http://localhost:4000"
    let deploy = 'https://driverless-data-ingestion.azurewebsites.net'

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        // let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        let strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        if(!strongRegex.test(event.target.value)){
        // if((event.target.value).length<8){
            seterrorinfo("Password must contain at least 1 uppercase alphabet character, 1 numeric character, 1 special character and must be atleast 8 characters long.")
            seterror(true)
        }
        else {
            seterrorinfo("Strong Password")
            seterror(false)
        }
    };
    const handleChangeRole= (event) => {
        setRole(event.target.value);
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


    const passwordValidator = (e) => {
        
        let confirmpassword = document.getElementById("confirmpassword")

        if (password === confirmpassword.value && password !== "") {
            console.log(username,name);
            let resp = Axios.post(`${deploy}/register`, {
                name:name,
                username:username,
                password:password,
                role:role,
                status:1,
                key:'abcdef'
            } 
            ).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    // alert(response.data.message)
                    //  handleOpen() 
                    //  setMsg(response.data.message) 
                    enqueueSnackbar(response.data.message, {
                        variant: 'success',
                    });

                     if(response.data.data.length > 0){
                         history.push("/")
                     }
                }
                else if (response.status === 400) {
                    //  handleOpen() 
                    //  setMsg('Failed to register the user!') 
                    // alert('Failed to register the user!')
                    // return window.location.href = "/";
                    enqueueSnackbar('Failed to register the user!', {
                        variant: 'error',
                    });
                }
            }).catch((err) => {
                console.log(err);
                //  handleOpen() 
                //  setMsg('Failed to register the user!') 
                 enqueueSnackbar('Failed to register the user!', {
                    variant: 'error',
                });

            });

        }
        else {
            // handleOpen();
            // setMsg("Please Check your Credentials")
            // return false;
            enqueueSnackbar('Please Check Your Credentials', {
                variant: 'warning',
            });
        }

    };

    return (
        <div className={classes.root} style={{backgroundColor:"lightblue"}}>
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
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <Paper className={classes.paper} style={{ width: "320px" }}>
                        <strong>Create Account</strong>
                        <hr />

                        <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="name"
                                    label="Enter Your Name"
                                    placeholder="Name"
                                    onChange={handleChangeName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
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
                                    error={error}
                                    helperText={errorinfo}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="confirmpassword"
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    type="password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="role"
                                    select
                                    label=""
                                    value={role}
                                    onChange={handleChangeRole}
                                    helperText="Please select your role"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VerifiedUserIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {roles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className={classes.buttonRoot}>
                                <Button variant="contained" color="primary" onClick={(e) => { e.preventDefault(); passwordValidator() }}>
                                    Register
                            </Button>
                            </div>
                            <div className={classes.buttonRoot}>
                                <Link to="/" variant="body2">
                                    {'Already have an account? Sign in'}
                                </Link>
                            </div>

                        </form>
                    </Paper>
                </Grid>

            </Grid>
        </div>


    )
}