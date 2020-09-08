import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Metadata from './configure_ingestion/Metadata';
import Setup from './configure_ingestion/Setup';
import Custom from './configure_ingestion/Custom';
import { Link, useHistory } from 'react-router-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Summary from './configure_ingestion/Summary';
import Customrules from './configure_ingestion/Customrules';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {useSnackbar} from 'notistack';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(42,113,233) 0%,rgb(33,64,187) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(42,113,233) 0%,rgb(33,64,187) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(63,81,181) 0%, rgb(33,64,187) 50%, rgb(138,35,235) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    background:"#3f51b5"
  },
  completed: {
    // backgroundImage:
    //   'linear-gradient( 136deg, rgb(63,81,181) 0%, rgb(33,64,187) 50%, rgb(138,35,235) 100%)',
    background:"#3f51b5"
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <ThumbUpIcon/>
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));







export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [setupParam, setSetupParam] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [entryid, setEntryid] = React.useState(0);
  const [fn, setfn] = React.useState('');
  const {enqueueSnackbar} = useSnackbar();

  const history = useHistory();

  let local = 'http://localhost:4000';
  let deploy = 'https://driverless-data-ingestion.azurewebsites.net'
  const handleSetup = (param,mode) => {

    if(mode==='save'){
      saveData(param)
      setfn(mode)
    }
    else{
      setfn(mode)
      updateData(param)
    }
  }

  const [status, setStatus ]=React.useState("")

  const handleStatus = (param) => {

    setStatus(param)
    setfn('edit')
    handleNext()
    
  };

  const handleEntryId = (param) => {
    setEntryid(param)
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleMetadata = (param, fn) => { 
    setfn(fn)  
    handleNext()
  };


  function getSteps() {
    return ['Setup', 'Metadata Discovery', 'Custom Rules', 'Summary'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Setup onPassSetup={handleSetup} onPassStatus={handleStatus} entryid={entryid} onPassEntryId={handleEntryId}/>;
      case 1:    
        { 
          // console.log("ENTRYY ID -- ", entryid)  
          if(entryid > 0)
        { return <Metadata onPassMetadata={handleMetadata} status = {status} entryid={entryid} editFn={fn} />}
          else{return <Metadata entryid="error"/>}}
      case 2:
        return <Customrules entryid={entryid} status = {status} editFn={fn} />;
      case 3:
        return <Summary entryid={entryid} status = {status} />;
      default:
        return 'Unknown step';
    }
  }

  


  const saveData = (param) => {
    let resp = Axios.post(`${local}/ingestion/setupDataSave`, param

    ).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        // console.log(response, "**********");
        if(response.data.data.entry_id)
        {
          setEntryid(response.data.data.entry_id)
        // console.log(response.data.data.entry_id, "00000")
        // handleOpen()
        // setMsg(response.data.message)
        enqueueSnackbar(response.data.message, {
          variant: 'success',
      });

        handleNext();
        }
        else{
        //   handleOpen()
        // setMsg(response.data.message)
        enqueueSnackbar(response.data.message, {
          variant: 'warning',
      })
    };
        

      }
      else if (response.status === 400) {
        // handleOpen()
        // setMsg('failed!')
        enqueueSnackbar(response.data.message, {
          variant: 'warning',
      })
      }

    }).catch((err) => {
      console.log(err);
      // handleOpen()
      // setMsg('Failed!')
      enqueueSnackbar('Failed!', {
        variant: 'warning',
    })
    });
  }


  const updateData = (param) => {
    let resp = Axios.post(`${local}/ingestion/updateSetupDBData`, param

    ).then((response) => {
      console.log(response);
      if (response.status === 200) {
        // console.log(response, "**********");
        setEntryid(response.data.entryId)
        // console.log(response.data.data.entry_id, "00000")
        // handleOpen()
        // setMsg(response.data.message)
        handleNext();

        enqueueSnackbar(response.data.message, {
            variant: 'success',
        });

      }
      else if (response.status === 400) {
        // handleOpen()
        // setMsg('failed!')
        enqueueSnackbar(response.data.message, {
            variant: 'warning',
        })
      }

    }).catch((err) => {
      console.log(err);
      // handleOpen()
      // setMsg('Failed!')
      enqueueSnackbar('Failed!', {
          variant: 'warning',
      })
    });
  }




  return (
    <div className={classes.root}>
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
      {/* <div className={classes.buttonRoot}>
        <Grid container>
          <Grid item xs={6} direction="column" container justify="flex-start" alignItems="flex-start">
            <Button variant="contained" color='secondary' onClick={(e) => {
              e.preventDefault();
              window.location.href = "/ingestiontable";
            }} >Go back to Ingestion Table</Button>
          </Grid>
        </Grid>
      </div> */}
      {/* <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
      {/* <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={(e)=>{
              history.push("/ingestiontable")
            }} className={classes.button}>
              Take Me Back
            </Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disable={activeStep===0} onClick={handleBack} className={classes.button}>
                  Back
              </Button>
               {activeStep >= 2 && activeStep != 3? <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleNext}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                    // saveData()
                  }}
                  className={classes.button}
                >
                  Next
                </Button> : 
                status==="Scheduled" && fn==="edit"?
                <div><i style={{color:"red"}}>Current Job is in Schedule State. You'll not be able to save your Changes!</i></div> :
                <></>
              }

              </div>
            </div>
          )}
      </div>
    </div>
  );
}
