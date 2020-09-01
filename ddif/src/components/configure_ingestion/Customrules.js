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

  const [column, setColumn] = useState([

    { title: 'Columns', field: 'columns' },

    { title: 'Functions', field: 'functions', initialEditValue: 'initial edit value' },

    { title: 'Value', field: 'value' },

    { title: 'id', field: 'id',options:{display:false}},  

  ]);

  function populateTable() {
    let lenDataTable = dataTable.length;
    let data = dataTable
    console.log(data)
    data.push({ "columns": columns, 'functions': functions, 'value': givenValue, 'id':lenDataTable+1})
    // Object.assign(dataTable,data)
    setDataTable(data);

    setColumns("")
    setFunctions("")
    setGivenValue("")
  }

  const dummyColumn = [
    {
      value: 'csv',
      label: 'csv',
    },
    {
      value: 'orc',
      label: 'orc',
    },
    {
      value: 'parquet',
      label: 'parquet',
    },
  ];



  const handleChangeColumns = (event) => {
    setColumns(event.target.value);
  }

  const handleChangefunctions = (event) => {
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

  let renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: '10px' }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  )

  let renderResult = ({ tree: immutableTree, config }) => (
    <div className="query-builder-result">
      {/* <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div> */}
      {/* <div>MongoDb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre></div> */}


      <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre>

      {/* <div>JsonLogic: <pre>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</pre></div> */}
    </div>
  )

  let onChangeSql = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setallValues({ tree: immutableTree, config: config });
    const jsonTree = QbUtils.getTree(immutableTree);
    const text1 = JSON.stringify(QbUtils.sqlFormat(immutableTree, config));
    console.log(jsonTree);
    setText(text1);
    console.log("bbbbbbbbb", text);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`

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

    let frame = {};
    let custom_rulename = "Custom Rule for JobId " + props.entryid;
    setRule(custom_rulename);
    console.log("aaaaaa", custom_rulename);
    console.log("aaaaaaaaaaaaaaaaa", text);
    Axios.get(`${local}/getCustomRuleDropdowns/${props.entryid}`)
      .then((response) => {
        console.log("AAA", response)
        setBusinessdropdownColumn(response.data.data.MetadataColumns)
        setBusinessdropdownFunction(response.data.data.CentralRules)
        response.data.data.MetadataColumns.map((item, index) => {
          console.log(item)
          // frame[item.column_name] = {}
          // frame[item.column_name]['label'] = item.column_name
          // frame[item.column_name]['operators'] = ['equal', 'greater', 'less', 'lower', 'between', 'not equal', 'Any in']
          // frame[item.column_name]['type']=item.data_type
          // frame[item.column_name]['valueSources']=['value']
          // frame[item.column_name]['preferWidgets']=['number']

          frame[item.column_name] = {}
          frame[item.column_name]['label'] = item.column_name
          if (item.data_type.includes('varchar')) {
            frame[item.column_name]['type'] = 'text'
          } else {

            frame[item.column_name]['type'] = 'number'
          }
          frame[item.column_name]['operators'] = ['equal', 'greater', 'less', 'lower', 'between', 'not equal', 'Any in']
          frame[item.column_name]['valueSources'] = ['value']
          frame[item.column_name]['preferWidgets'] = ['number']
          //     if(item.data_type.includes('varchar')){
          //     frame[item.column_name]['valueSources']=['value']
          //     frame[item.column_name]['preferWidgets']=['string']
          //     //frame[item.column_name]['fieldSettings']={}
          //     }
          //     else
          //     {frame[item.column_name]['valueSources']=['value']
          //     frame[item.column_name]['preferWidgets']=['number']}
          //    // frame[item.column_name]['fieldSettings']={}}
        })


        console.log(frame);
      }).catch((err) => {
        console.log(err)
      })



    let values = {};
    config['fields'] = frame;

    values['tree'] = QbUtils.checkTree(QbUtils.loadTree(queryValue), config);
    values['config'] = config;

    setconfigfield(config)
    setallValues(values);
    setloading(false);
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
    console.log(props.entryid, "*** here ***")
    Axios({
      method: 'post',
      url: (`${local}` + "/saveCustomRules"),
      data: {
        entryid: props.entryid,
        customrules: {
          entry_id: props.entry_id,
          rule_definition: text,
          custom_rulename: rule
        },
        businessrules: {}
      }
    }).then((response) => {
      if (response.status === 200) {
        handleOpen()
        setMsg(response.data.message);
      } else {
        handleOpen()
        setMsg(response.data.message);
      }
    }).catch((err) => {
      console.log(err)
    })
  }




  if (!loading) {
    console.log(businessdropdownColumn, "Patttttttternnnnn")
    return (
      <div>
        <AppBar position="static" style={{ background: "white",boxShadow:'none' }}>
          <Tabs value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="simple tabs example">
            <Tab label="Custom Rules" {...a11yProps(0)} />
            <Tab label="Business Rules" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          {/* <Paper style={{width:'100%'}}>
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
            <Query
              {...configfield}
              value={tree}
              onChange={onChangeSql}
              renderBuilder={renderBuilder}
            />
            <Card>
              <CardHeader>
                <CardContent>
                  Your SQL Query:
                  </CardContent>
              </CardHeader>
              <CardContent>

                {renderResult(allValues)}
              </CardContent>
            </Card>
            <div>
              <Button variant="contained" color="primary" onClick={(e) => {
                e.preventDefault();
                sendData();
              }}>
                Save
              </Button>
            </div>
          </Paper> */}
          <Custom entryid={props.entryid} editFn={props.fn} />

        </TabPanel>
        <TabPanel value={tabValue} index={1} style={{background:"white"}}>
          <div style={{
            maxWidth:"100%"
          }}>
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
            <form className={classes.root} noValidate autoComplete="off">
              {/* <center>
                <strong textAlign="center">Business Rules </strong>
              </center>
              <hr /> */}

              <Grid container spacing={2}>
                <Grid item xs={4} direction="column" container >
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
                    {/* {businessdropdownColumn.forEach((option) => (
                      <MenuItem key={option.column_name} value={option.column_name}>
                        {option.column_name}
                      </MenuItem>
                    ))} */}
                  </TextField>
                </Grid>

                <Grid item xs={4} direction="column" container >

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

                <Grid item xs={4} direction="column" container >

                  <TextField
                    id="Given Value"
                    label="Value"
                    placeholder="Enter the value"
                    value={givenValue}
                    onChange={handleChangeGivenValue}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </form>

            <div style={{ margin: "50px 12px" }}>

              <Button variant="contained" color='primary' size="small" justify="flex-right" onClick={(e) => {
                e.preventDefault();
                populateTable();
              }} >OK </Button>

            </div>

            <div>
              {/* <Paper className={classes.paper}> */}
                {/* <TableContainer component={Paper} style={{ maxHeight: "500px" }}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Columns</b></TableCell>
                        <TableCell><b>functions</b></TableCell>
                        <TableCell><b>Value</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                  </Table>
                </TableContainer> */}

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