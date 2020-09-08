import React, { Component, useState, useEffect } from 'react'
import ReactDom from 'react-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import MaterialTable from 'material-table';
import './Audit.css'

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

export default function Audit() {
    const classes = useStyles();
    const [tableData, settableData] = useState({})
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)

    const [columns, setColumns] = useState([

        { title: 'Entry ID', field: 'entryId' },

        { title: 'Job Name', field: 'jobname' },

        { title: 'Project Name', field: 'projectname' },

        { title: 'Start Time', field: 'start_time' },

        { title: 'End Time', field: 'end_time' },

        { title: 'User Name', field: 'username' },

        { title: 'Total Rows', field: 'total_rows' },
        { title: 'Ingested Rows', field: 'ingested_rows' },
        { title: 'Duplicate Records', field: 'duplicated_records' },
        { title: 'Data Quality Check Failed', field: 'dq_check_failed' },
        { title: 'Business Rule Check Failed', field: 'br_check_failed' },
        { title: 'Custom Rule Check Failed', field: 'cr_check_failed' },
        { title: 'Rejected Rows', field: 'rejected_rows' },
        { title: 'Status', field: 'status' },
        { title: 'Relative File Path', field:"relative_file_path",width:1100}

    ]);

    let local = 'http://localhost:4000'
    let deploy = 'https://driverless-data-ingestion.azurewebsites.net'

    function getInfo(entryid) {
        Promise.all(
            [Axios.get(`${deploy}/audit/getRecords/${entryid}`),
            ]).then((res) => {
                return [res]
            })
            .then((response) => {
                console.log(response)
                console.log(response[0][0].data)
                if (response[0][0].status === 200) {
                    settableData(response[0][0].data.data);
                    seterror(false);
                    setloading(false);
                    console.log('CAME !!!!!  ', response.length)
                } else {
                    console.log(response)
                    seterror(true);
                }

            }).catch((err) => {
                seterror(true)
            })
    }

    useEffect(() => {
        // getInfo(0);
        console.log(window.location.href.split('/'))
        if ((window.location.href.split('/')[4] > 0)) {
            getInfo(window.location.href.split('/')[4]);
        }
        else {
            getInfo(0);
        }
    }, [])


    if (!loading) {
        return (
            <div>
                <div>
                    <Paper className={classes.paper}>
                        {/* <strong>Job Audit</strong>
                        <hr /> */}
                        {/* <TableContainer component={Paper} style={{ maxHeight: "490px" }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Entry ID</b></TableCell>
                                        <TableCell><b>Job Name</b></TableCell>
                                        <TableCell><b>Project Name</b></TableCell>
                                        <TableCell><b>Start Time</b></TableCell>
                                        <TableCell><b>End Time</b></TableCell>
                                        <TableCell><b>User Name</b></TableCell>
                                        <TableCell><b>total Rows</b></TableCell>
                                        <TableCell><b>Ingested Rows</b></TableCell>
                                        <TableCell><b>Duplicate Records</b></TableCell>
                                        <TableCell><b>DQ Check Failed</b></TableCell>
                                        <TableCell><b>BR Check Failed</b></TableCell>
                                        <TableCell><b>CR Check Failed</b></TableCell>
                                        <TableCell><b>Rejected Rows</b></TableCell>
                                        <TableCell><b>Status</b></TableCell>
                                        <TableCell width='500px'><b>Relative File Path</b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.length>0 ? tableData.map((row) => (
                                        <TableRow key={row.entryId} >
                                            <TableCell component="th" scope="row">
                                                {row.entryId}
                                            </TableCell>
                                            <TableCell >{row.jobname}</TableCell>
                                            <TableCell >{row.projectname}</TableCell>
                                            <TableCell >{row.start_time}</TableCell>
                                            <TableCell >{row.end_time}</TableCell>
                                            <TableCell >{row.username}</TableCell>
                                            <TableCell >{row.total_rows}</TableCell>
                                            <TableCell >{row.ingested_rows}</TableCell>
                                            <TableCell >{row.duplicated_records}</TableCell>
                                            <TableCell >{row.dq_check_failed}</TableCell>
                                            <TableCell >{row.br_check_failed}</TableCell>
                                            <TableCell >{row.cr_check_failed}</TableCell>
                                            <TableCell >{row.rejected_rows}</TableCell>
                                            <TableCell >{row.status}</TableCell>
                                            <TableCell width='500px' >{row.relative_file_path}</TableCell>
                                            
                                        </TableRow>
                                    )) : <>No records to display</>}
                                </TableBody>
                            </Table>
                        </TableContainer> */}

                        <MaterialTable
                            id='title'
                            title="Job Audit"
                            key="entryId"
                            columns={columns}
                            data={tableData}
                            options={{
                                rowStyle: {
                                  whiteSpace:"nowrap",
                                },
                                headerStyle: {
                                    whiteSpace:"nowrap",
                                    fontWeight:"bold"
                                  },
                                
                              }}
                        />
                    </Paper>
                </div>

                {/* <div style={{ marginTop: " 20px" }}>
                    <Grid container>
                        <Grid direction="column" container justify="flex-end" alignItems="flex-end">
                            <Button variant="contained" color='primary' onClick={(e) => {
                                e.preventDefault();
                                // window.location.href = "/ingestion/setup";
                                window.location.href = "/ingestion";
                            }}>Create Ingestion </Button>
                        </Grid>
                    </Grid>
                </div> */}
            </div>
        )
    }

    else {
        return (<div>
            <LinearProgress />
        </div>)
    }
}

