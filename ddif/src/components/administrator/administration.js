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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';

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

export default function Administration(){
    const classes = useStyles();
    const [tableData, settableData] = useState({})
    const [tableData2, settableData2] = useState({})
    const [tableData3, settableData3] = useState({})
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    const [ProjectTypes, setProjectTypes] = useState({});

    const handleChange = (event, newValue) => {
        // history.push(`/ingestion/${tabNametoIndex[newValue]}`)
        setValue(newValue);
    };

    let local = 'http://localhost:4000'
    let deploy = 'https://driverless-data-ingestion.azurewebsites.net'
 
    

    function getInfo() {
        Promise.all(
            [Axios.get(`${deploy}/administration/getConnections`),
            Axios.get(`${deploy}/administration/allProjects`),
            Axios.get(`${deploy}/ingestion/getDropdowns`)
            ]).then((res)=>{
                return [res]
            })  
          .then((response)=>{
            console.log(response)
            console.log(response[0][0].data)
            // console.log("RESPONSE -- ", response[0][1].status)
            if(response[0][0].status === 200 ){
                let sources = [];
                let targets = [];
                response[0][0].data.data.map((item, index)=>{
                    if(item.type === 'source'){
                        sources.push(item)
                    }else{
                        targets.push(item)
                    }
                })
                settableData(sources);
                settableData2(targets);
                settableData3(response[0][1].data.data)

                setProjectTypes(response[0][2].data.data.project_types)
                seterror(false);

                setloading(false);
                console.log('CAME !!!!!  ', response.length)
            }else{
                console.log(response)
                seterror(true);
            }
    
        }).catch((err)=>{
            seterror(true)
        })
    }

    function deleteRecord(id){
        Axios.get(`${deploy}/administration/deleteInfo/${id}`)
        .then((response)=>{
            getInfo();
        }).catch((err)=>{

        })

    }
    function deleteProjectRecord(id){
        Axios.get(`${deploy}/administration/deleteProject/${id}`)
        .then((response)=>{
            getInfo();
        }).catch((err)=>{

        })

    }

    
    
    useEffect(() => {
        getInfo();
    }, [])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
    
    
if(!loading){
    return(
        <div>
            <AppBar position="static">
                <Tabs value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="full width tabs example">
                    <Tab label="Data Sources" {...a11yProps(0)}/>
                    {/* <Tab label="Metadata Discovery" disabled={enable} {...a11yProps(1)} /> */}
                    <Tab label="Data Targets" {...a11yProps(1)} />
                    <Tab label="Project" {...a11yProps(2)} />
                   
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>
                <Paper className={classes.paper}>
                                <TableContainer component={Paper} style={{maxHeight:"420px"}}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Actions</b></TableCell>
                                                <TableCell><b>Source Connection name</b></TableCell>
                                                <TableCell><b>Location Name</b></TableCell>
                                                <TableCell><b>Connection Type</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {tableData.length> 0 ? tableData.map((row) => (
                                                <TableRow key={row.row_id} >
                                                <TableCell component="th" scope="row" onClick={(e)=>{

                                                    deleteRecord(row.row_id);
                                                    }
                                                    } >
                                                    <DeleteIcon />
                                                </TableCell>
                                                <TableCell onClick={(e)=>{

                                                    history.push(`/addSource/${row.row_id}`)
                                                    }
                                                    }  >{row.connection_name}</TableCell>
                                                <TableCell onClick={(e)=>{

                                                    history.push(`/addSource/${row.row_id}`)
                                                    }
                                                    } >{row.location_name}</TableCell>
                                                <TableCell onClick={(e)=>{

                                                    history.push(`/addSource/${row.row_id}`)
                                                    }
                                                    } >{row.format}</TableCell>
                                                
                                            </TableRow>
                                            )) : <>No records to display</>}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                </div>
               
                <div style={{marginTop:" 15px"}}>
                    <Grid container>
                    <Grid direction="column" container  alignItems="flex-end">
                        <Button variant="contained" color='primary' size="small" justify="flex-right" onClick = {(e)=>{
                            e.preventDefault();
                            history.push("/addSource");
                        }}>Add Source </Button>
                    </Grid>
                    </Grid>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                
            <div >
            <Paper className={classes.paper}>
                            <TableContainer component={Paper} style={{maxHeight:"500px"}}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Actions</b></TableCell>
                                            <TableCell><b>Target Connection Name</b></TableCell>
                                            <TableCell><b>Location Name</b></TableCell>
                                            <TableCell><b>Connection type</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {tableData2.length> 0 ? tableData2.map((row) => (
                                                <TableRow key={row.row_id} >
                                                    <TableCell component="th" scope="row" onClick={(e)=>{

                                                        deleteRecord(row.row_id);
                                                        }
                                                        } >
                                                        <DeleteIcon />
                                                    </TableCell>
                                                    <TableCell onClick={(e)=>{

                                                        history.push(`/addTarget/${row.row_id}`)
                                                        }
                                                        }  >{row.connection_name}</TableCell>
                                                    <TableCell onClick={(e)=>{

                                                        history.push(`/addTarget/${row.row_id}`)
                                                        }
                                                        } >{row.location_name}</TableCell>
                                                    <TableCell onClick={(e)=>{

                                                        history.push(`/addTarget/${row.row_id}`)
                                                        }
                                                        } >{row.format}</TableCell>
                                                    
                                                </TableRow>
                                            )) : <>No records to display</>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
            </div>
            <div style={{marginTop:" 15px"}}>
                <Grid container>
                    <Grid direction="column" container  alignItems="flex-end">
                        <Button variant="contained" color='primary' size="small" justify="flex-right" onClick = {(e)=>{
                            e.preventDefault();
                            history.push("/addTarget");
                        }}>Add Target </Button>
                    </Grid>
                    </Grid>
                </div>
            </TabPanel>

            <TabPanel value={value} index={2}>
                
            <div >
            <Paper className={classes.paper}>
                            <TableContainer component={Paper} style={{maxHeight:"500px"}}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Actions</b></TableCell>
                                            <TableCell><b>Project Domain</b></TableCell>
                                            <TableCell><b>Project Name</b></TableCell>
                                            <TableCell><b>Description</b></TableCell>
                                            <TableCell><b>Owner</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {tableData3.length> 0 ? tableData3.map((row) => (
                                                <TableRow key={row.row_id} >
                                                    <TableCell component="th" scope="row" onClick={(e)=>{

                                                        deleteProjectRecord(row.row_id);
                                                        }
                                                        } >
                                                        <DeleteIcon />
                                                    </TableCell>
                                                   <TableCell> {
                                                        ProjectTypes.map((item, index)=>{
                                                            if(item.typeId === row.project_type){
                                                              return(  <div>
                                                                    { item.project_type }
                                                        
                                                                </div>)
                                                            }
                                                        })
                                                    }
                                                    </TableCell>
                                                    <TableCell onClick={(e)=>{

                                                        history.push(`/addProject/${row.row_id}`)
                                                        }
                                                        }  >{row.project_name}</TableCell>
                                                    <TableCell onClick={(e)=>{

                                                        history.push(`/addProject/${row.row_id}`)
                                                        }
                                                        } >{row.description}</TableCell>
                                                    <TableCell onClick={(e)=>{

                                                        history.push(`/addProject/${row.row_id}`)
                                                        }
                                                        } >{row.owner}</TableCell>
                                                    
                                                </TableRow>
                                            )) : <>No records to display</>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
            </div>
            <div style={{marginTop:" 15px"}}>
                <Grid container>
                    <Grid direction="column" container  alignItems="flex-end">
                        <Button variant="contained" color='primary' size="small" justify="flex-right" onClick = {(e)=>{
                            e.preventDefault();
                            history.push("/addProject");
                        }}>Add Project </Button>
                    </Grid>
                    </Grid>
                </div>
            </TabPanel>

        </div>
    )
}

else{
    return(<div>
      <LinearProgress />
    </div>)
}
}


