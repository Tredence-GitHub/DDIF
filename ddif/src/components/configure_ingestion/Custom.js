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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Card, CardHeader, CardContent } from '@material-ui/core';


const InitialConfig = AntdConfig; // or BasicConfig


// You need to provide your own config. See below 'Config format'



export default function Custom(props) {

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
        return (
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
            </Paper>

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