import React from 'react'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';


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

}));



export default function ChangePassword() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
 
    let local = "http://localhost:4000"

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const validator = (e) => {

        let resp = Axios.post(`${local}/auth/forgotpassword`, {
            username: username,
            password: password,
        }
        ).then((response) => {
            console.log(response);
            if (response.status === 200) {
                // alert(response.data.message)
                handleOpen()
                setMsg(response.data.message)
                // return window.location.href = "/";
            }
            else if (response.status === 400) {
                handleOpen() 
                setMsg('Failed to change password!')
                // alert('Failed to change password!')
            }

        }).catch((err) => {
            console.log(err);
            handleOpen()
            setMsg('Failed to change password!')
            // alert('Failed to change password!')
        });
    }

    return (
        <div className={classes.root} style={{backgroundColor:"lightblue"}}>
            <Snackbar
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
            />

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
                        <strong>Change Password </strong>
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
                                    label="Enter New Password"
                                    placeholder="New Password"
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
                                <Button variant="contained" color="primary" onClick={(e) => { e.preventDefault(); validator() }}>
                                    Submit
                                </Button>

                                {/* <Button variant="outlined" color="primary" href='/'>
                                    Back to Login
                                </Button> */}
                            </div>
                            <div className={classes.buttonRoot}>
                                <Link href="/" variant="body2">
                                    {'Back To Login'}
                                </Link>
                            </div>

                        </form>
                    </Paper>
                </Grid>


            </Grid>
        </div>

    )
}