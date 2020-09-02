import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
        backgroundColor: '#f5f5f578'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 300,
    },

}));

export default function Summary(props) {
    const local = "http://localhost:4000/summary";
    const classes = useStyles()
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true);
    // const [dataTable, setDataTable] = useState({});
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [dataTable, setDataTable] = useState([{}])
    const getAlldetails = () => {
        Axios.get(`${local}/getSummary/${props.entryid}`)
            .then((response) => {
                setDataTable(response.data.data);
                setloading(false);
            }).catch((err) => {
                console.log(err);
            })
    }

    const changeStatus = () => {
        Axios.get(`${local}/status/Created/${props.entryid}`)
            .then((response) => {
                if (response.status === 200) {
                    handleOpen();
                    setMsg(response.data.message)
                    window.location.href = "/ingestiontable"
                }
                else {
                    handleOpen();
                    setMsg(response.data.message)
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getAlldetails()
    }, [])

    if (!loading) {
        return (
            <div>
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

                <TableContainer component={Paper} style={{ maxHeight: "330px" }}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Parameters</b></TableCell>
                                <TableCell><b>Values</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataTable.length > 0 ? dataTable.map((row) => (
                                <TableRow key={row.fields}>
                                    <TableCell component="th" scope="row">
                                        {row.fields}
                                    </TableCell>
                                    <TableCell >{row.values}</TableCell>

                                </TableRow>
                            )) : <>No records to display</>}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* <div>
                    <Button variant="contained" color="primary" onClick={(e) => {
                        e.preventDefault();
                        changeStatus();
                    }}>
                        Create Job
                        </Button>
                </div> */}

                <div style={{ marginTop: " 20px" }}>
                    <Grid container>
                        <Grid direction="column" container justify="flex-end" alignItems="flex-end">
                            <Button variant="contained" color='primary' onClick={(e) => {
                                 e.preventDefault();
                                 changeStatus();
                            }}>Create Job </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div style={{ marginLeft: "550px" }}>
                    <CircularProgress />
                </div>
            </div>
        )
    }
}
