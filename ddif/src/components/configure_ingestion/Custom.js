import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder';
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import "antd/dist/antd.css";
import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const InitialConfig = AntdConfig; // or BasicConfig

const useStyles = makeStyles({
    root: {
      minWidth: 500,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
// You need to provide your own config. See below 'Config format'



export default function Custom(props) {
    const classes = useStyles();
    let local = "http://localhost:4000/customrules";

    const queryValue = { "id": QbUtils.uuid(), "type": "group" };
    // const classes = useStyles();
    const [loading, setloading] = React.useState(true)
    const [configfield, setconfigfield] = React.useState({})
    const [tree, settree] = React.useState(QbUtils.checkTree(QbUtils.loadTree(queryValue), configfield))
    const [allValues, setallValues] = React.useState({});
    const [text, setText] = React.useState();
    const [rule, setRule] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [previousQuery, setpreviousQuery] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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

    let onChange = (immutableTree, config) => {
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
            }

        }

        let frame = {};
        let custom_rulename = "Custom Rule for JobId " + props.entryid;
        setRule(custom_rulename);
        console.log("aaaaaa", custom_rulename);
        console.log("aaaaaaaaaaaaaaaaa", text);
        Promise.all([Axios.get(`${local}/getCustomRuleDropdowns/${props.entryid}`),
            Axios.post(`${local}/populateCustomRules`, {
                entryid: props.entryid
            })
            ]).then((result)=>{
                return result
            }).then((response) => {
                console.log(response)
                // console.log(response[1].data.data.customrules[0].rule_definition, "*****!*!*!*")
                if(response[1].data.data.customrules.length > 0){

                    setpreviousQuery(response[1].data.data.customrules[0].rule_definition)
                }
                response[0].data.data.MetadataColumns.map((item, index) => {
                    console.log(item)
                    // frame[item.column_name] = {}
                    // frame[item.column_name]['label'] = item.column_name
                    // frame[item.column_name]['operators'] = ['equal', 'greater', 'less', 'lower', 'between', 'not equal', 'Any in']
                    // frame[item.column_name]['type']=item.data_type
                    // frame[item.column_name]['valueSources']=['value']
                    // frame[item.column_name]['preferWidgets']=['number']
                    frame[item.column_name] = {}
                    frame[item.column_name]['label'] = item.column_name
                    if (item.data_type.includes('int') || item.data_type.includes('number')) {
                        frame[item.column_name]['type'] = 'number'
                      } else {
            
                        frame[item.column_name]['type'] = 'text'
                      }
                    frame[item.column_name]['operators'] = ['equal', 'greater', 'less', 'lower',
                     'between', 'like', 'greater_or_equal', 'less_or_equal', 'not_equal', 'not_like', 'IN', 'is_empty', 'is_not_empty']
                    frame[item.column_name]['valueSources'] = ['value']
                    // frame[item.column_name]['preferWidgets'] = ['number']
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
        return (
            <div>
                <Paper>
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
                        onChange={onChange}
                        renderBuilder={renderBuilder}
                        />
                
                </Paper>
                <Grid spacing={1} style={{
                    marginTop: '5px',
                    padding: '0px',
                    maxWidth: '100%'
                }}>
                <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Your Customised Query
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {renderResult(allValues)}
                    </Typography>
                                        
                </CardContent>               
                </Card>     
                <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Previously Customised Query
                    </Typography>
                    { previousQuery != '' ? <Typography variant="h5" component="h2">
                        { previousQuery }
                    </Typography> : 
                    <Typography variant="h6" component="h5">
                        Looks like you have not customised one!
                    </Typography>
                    }
                    
                </CardContent>
                
                </Card>     
                </Grid>
                <div>
                <Grid direction="column" container justify="flex-end" alignItems="flex-end">
                    <Button variant="contained" color="primary" onClick={(e) => {
                        e.preventDefault();
                        sendData();

                    }}>
                        {previousQuery != ''? 'Replace Query' : 'Add Query'}
                    </Button>
                </Grid>
                </div>
        </div>
        )

    }
    else {
        return (
            <div style={{ marginLeft: "550px" }}>
                <CircularProgress />
            </div>
        )
    }


}