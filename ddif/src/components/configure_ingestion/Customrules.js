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
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder';
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import "antd/dist/antd.css";
import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles
import Axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuItem from '@material-ui/core/MenuItem';
import Custom from './Custom';
import MaterialTable from 'material-table';
import { useSnackbar } from 'notistack';


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


const InitialConfig = AntdConfig; // or BasicConfig


// You need to provide your own config. See below 'Config format'


export default function Customrules(props) {
  const classes = useStyles();
  const queryValue = { "id": QbUtils.uuid(), "type": "group" };
  const [loading, setloading] = React.useState(true)
  const [configfield, setconfigfield] = React.useState({})
  const [tree, settree] = React.useState(QbUtils.checkTree(QbUtils.loadTree(queryValue), configfield))
  const [allValues, setallValues] = React.useState({});
  const [text, setText] = React.useState();
  const [rule, setRule] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [tabValue, setTabValue] = React.useState(0);

  const [columns, setColumns] = useState('');
  const [functions, setFunctions] = useState('');
  const [givenValue, setGivenValue] = useState('');
  const [businessdropdownColumn, setBusinessdropdownColumn] = useState([])
  const [businessdropdownFunction, setBusinessdropdownFunction] = useState([])
  const [dataTable, setDataTable] = useState([]);
  const [hideparameters, sethideParameters] = useState(true);
  const [howtoenter, sethowtoenter] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [column, setColumn] = useState([

    { title: 'Rule Id', field: 'id',options:{display:false, hidden:true}},  

    { title: 'Column Name', field: 'column_name' },

    { title: 'Rule Applied', field: 'rule_name', initialEditValue: 'initial edit value' },

    { title: 'Value', field: 'rule_parameters' },


  ]);

  function populateTable() {
    let lenDataTable = dataTable.length;
    let data = dataTable
    console.log(data)
    data.push({ "column_name": columns, 'rule_name': functions, 'rule_parameters': givenValue, 'id':lenDataTable+1})
    // Object.assign(dataTable,data)
    setDataTable(data);

    setColumns('')
    setFunctions('')
    setGivenValue('')
  }


  const handleChangeColumns = (event) => {
    setColumns(event.target.value);
  }

  const handleChangefunctions = (event) => {
    if(event.target.value.includes('Is')){
      sethideParameters(true)
    }else{
      if(event.target.value === 'Range' || event.target.value.includes('list')){
        sethowtoenter('Eg: 1,2')
        sethideParameters(false)
      }else{
        sethowtoenter('Enter value')
        sethideParameters(false)
      }
    }

    
    setFunctions(event.target.value);
  }

  const handleChangeGivenValue = (event) => {
    setGivenValue(event.target.value);
  }


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  let local = "http://localhost:4000/customrules";

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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


  //entry,ruledef,custom
  function firstcall() {
    const config = {
      ...InitialConfig,
      fields: {
        qty: {
          label: 'Qty',
          type: 'number',
          fieldSettings: {
            min: 0,
          },
          valueSources: ['value'],
          preferWidgets: ['number'],
        },
        price: {
          label: 'Price',
          type: 'number',
          valueSources: ['value'],
          fieldSettings: {
            min: 10,
            max: 100,
          },
          preferWidgets: ['slider', 'rangeslider'],
        },
        color: {
          label: 'Color',
          type: 'select',
          valueSources: ['value'],
          fieldSettings: {
            listValues: [
              { value: 'yellow', title: 'Yellow' },
              { value: 'green', title: 'Green' },
              { value: 'orange', title: 'Orange' }
            ],
          }
        },
        is_promotion: {
          label: 'Promo?',
          type: 'boolean',
          operators: ['equal'],
          valueSources: ['value'],
        },
      }


    }

    
    Promise.all([Axios.get(`${local}/getCustomRuleDropdowns/${props.entryid}`),
            Axios.post(`${local}/populateCustomRules`, {
                entryid: props.entryid
            })
            ]).then((result)=>{
                return result
        }).then((response) => {
        console.log("AAA", response)
        setBusinessdropdownColumn(response[0].data.data.MetadataColumns)
        setBusinessdropdownFunction(response[0].data.data.CentralRules)
        setDataTable(response[1].data.data.businessrules);

        setloading(false);

        }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (props.entryid != "error" && props.editFn !== 'edit') {
      firstcall()
    }
    else if (props.editFn === 'edit') {
      // call populate API and first call
      firstcall()
    }
  }, [])

  const sendData = () => {
    if(dataTable.length > 0){
    console.log(props.entryid, "*** here ***")
    Axios({
      method: 'post',
      url: (`${local}` + "/saveBusinessRules"),
      data: {
        entryid: props.entryid,
        customrules: {
          entry_id: props.entry_id,
          rule_definition: text,
          custom_rulename: rule
        },
        businessrules: {
          rules: dataTable
      }
    }
    }).then((response) => {
      if (response.status === 200) {
        // handleOpen()
        // setMsg(response.data.message);
        enqueueSnackbar(response.data.message, {
          variant: 'success',
      });
      } else {
        // handleOpen()
        // setMsg(response.data.message);
        enqueueSnackbar(response.data.message, {
          variant: 'success',
      });
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  else{
    // handleOpen();
    // setMsg('Please set your business rules! Looks like you have 0 records!')
    enqueueSnackbar('Please set your business rules! Looks like you have 0 records!', {
      variant: 'info',
  });
  }
  }


  if (!loading) {
    return (
      <div>
        <AppBar position="static" style={{ background: "white",boxShadow:'none' }}>
          <Tabs value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="simple tabs example">
            <Tab label="Business Rules" {...a11yProps(0)} />
            <Tab label="Custom Rules" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={1} style={{background:"white"}}>

                <strong>Create A Custom Rule </strong>
            
              <hr />
          <Custom entryid={props.entryid} editFn={props.fn} status = {props.status}/>

        </TabPanel>
        <TabPanel value={tabValue} index={0} style={{background:"white"}}>
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
          <div style={{
            maxWidth:"100%"
          }}>
            
            <form className={classes.root} noValidate autoComplete="off">
              
              <Grid container spacing={0}>
                <Grid item xs={3} direction="column" container >
                  <TextField
                    id="columns"
                    select
                    label="Choose Columns"
                    value={columns}
                    onChange={handleChangeColumns}
                    // helperText="Please select the columns"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VerifiedUserIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {businessdropdownColumn.map((option) => (
                      <MenuItem key={option.column_name} value={option.column_name}>
                        {option.column_name}
                      </MenuItem>
                    ))}
                    
                  </TextField>
                </Grid>

                <Grid item xs={3} direction="column" container >

                  <TextField
                    id="functions"
                    select
                    label="Choose Functions"
                    value={functions}
                    onChange={handleChangefunctions}
                    // helperText="Please select the functions"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VerifiedUserIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {businessdropdownFunction.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={3} direction="column" container hidden={hideparameters}>

                  <TextField
                    id="given"
                    label="Enter Value"
                    placeholder={howtoenter}
                    // onChange={handleChangeGivenValue}
                    onChange={(e, value) => {
                      setGivenValue(value)
                    }}
                    value={givenValue}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VerifiedUserIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {givenValue}
                    </TextField>
                </Grid>
                <Grid item xs={3} container  direction="column" >
                  <Button variant="contained" color='primary' size="small" style={{ margin: '25px 10px' ,borderRadius: '5%', width:"30px", height: "30px" }} onClick={(e) => {
                    e.preventDefault();
                    populateTable();
                  }} >+</Button>

              </Grid>
              </Grid>
            </form>

            

            <div>

                <MaterialTable
                  title=""
                  key="id"
                  columns={column}
                  data={dataTable}
                  editable={{
                    onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          setDataTable([...dataTable, newData]);
                          resolve();
                        }, 1000)
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...dataTable];
                          const index = oldData.tableData.id;
                          // newData.column_name = newData.column_name.trim().replace(' ', '_');
                          dataUpdate[index] = newData;
                          setDataTable([...dataUpdate]);
                          resolve();
                        }, 1000)
                      }),
                    onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...dataTable];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setDataTable([...dataDelete]);

                          resolve()
                        }, 1000)
                      }),
                  }}
                />
              {/* </Paper> */}
            </div>
          </div>
          <div style={{marginTop:"20px"}}>
                <Grid direction="column" container justify="flex-end" alignItems="flex-end">
                  {props.status==="Scheduled"? <></>:
                    <Button variant="contained" color="primary" onClick={(e) => {
                        e.preventDefault();
                        sendData();
                    }}>
                        Set Business Rules
                    </Button>}
                </Grid>
          </div>
        </TabPanel>
      </div>
    )
  }
  else {
    return (
      <div style={{ marginLeft: "550px",height:"500px"}}>
        <CircularProgress />
      </div>
    )
  }
}