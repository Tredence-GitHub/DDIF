import React, { useEffect, useState } from 'react';
import { Container, Spinner, Button, Tabs, Tab } from 'react-bootstrap';
import Axios from 'axios';
import {Report} from 'powerbi-report-component';
import LinearProgress from '@material-ui/core/LinearProgress';
import CachedIcon from '@material-ui/icons/Cached';


export default function Dashboard(props) {
    const [loading, setloading] = useState(true)
    const [results, setresults] = useState({})
    const [error, seterror] = useState(false)
    
    const url = {
        'local': 'http://localhost:4000',
        'deploy': 'https://driverless-data-ingestion.azurewebsites.net'
    }
    let data = [{'productlevel': {
        'reportId':'4c513f4f-3114-4e19-9252-ba1c00547575',
        //  'reportId': 'fb148adb-7bdb-4beb-aa5e-e88ee375c3b2',
        'groupId': 'fb993d6f-32cb-4185-872f-29658ba8f5d7' ,
        }
    }
    ]

    async function f(){
        let resp = await Axios.post(`${url.deploy}/powerbi/getEmbedToken`,{data}
         ).then((response)=> {
             console.log(response)
             setresults(response.data.embedToken);
            if(response.data.embedToken[0].productlevel.embeddingToken){
                seterror(false);
                setloading(false);
            }
            else{
                seterror(true);
                setloading(true);
            }
         }).catch((err)=> {
            seterror(true)
         });
    }
    // 42bcd1c4-e9a8-42b5-94f1-f33273ec93fa
    // function refreshDashboard(){
    //     // setloading(true)
    //     Axios.post(`https://api.powerbi.com/v1.0/myorg/groups/fb993d6f-32cb-4185-872f-29658ba8f5d7/datasets/42bcd1c4-e9a8-42b5-94f1-f33273ec93fa/refreshes`,
    //      {
    //          body: {
    //         "notifyOption": "NoNotification"
    //       }
    //     })
    //     .then((response)=>{
    //         console.log(response, " ******* ! **** ")
    //         // setloading(false);
    //     }).catch((err)=>{
    //         // setloading(false)
    //         console.log(err, "*****111");
    //     })
    // }

    useEffect(() => {
        f()
    }, [])

    function renderPowerBi(myReportId, myGroupId, embeddingToken) {
        
        const reportId =myReportId;  
        const groupId = myGroupId;
        let embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`;
          const embedToken = embeddingToken;
          embedUrl = embedUrl.replace("watch?v=", "v/");
   
          const reportStyle = {
              height: "45rem"
          };
          const extraSettings = {
              filterPaneEnabled: false, //true
              navContentPaneEnabled: false, //true
              hideErrors: false
          };
          const filter1 = {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
                table: 'deaccelator audittable_db' ,
                column: "username"
            },
            operator: "In",
            values: [localStorage.getItem('username')]
            
        };
          return (
           
            //   <Report
            //       embedType="report" // "dashboard"
            //       tokenType="Embed" // "Aad"
            //       accessToken={embedToken} // accessToken goes here
            //       embedUrl={embedUrl} // embedUrl goes here
            //       embedId={reportId}
            //       permissions="All" // View
            //       style={reportStyle}
            //       extraSettings={extraSettings}
            //       onLoad={(report) => {
            //           report = report;
                    
            //       }
            //       }
   
            //   />

            <Report
                embedType="report" // "dashboard"
                tokenType="Embed" // "Aad"
                accessToken={embedToken} // accessToken goes here
                embedUrl={embedUrl} // embedUrl goes here
                embedId={reportId}
                permissions="All" // View
                style={reportStyle}
                extraSettings={extraSettings}
                onLoad={(report) => {
                    console.log(filter1,"ABC")
                    report.setFilters([filter1]).then((res, rej) => {
                        console.log(res,"******")
                        console.log(rej)
    
                       }).catch(function (errors) {
                           console.log(errors)
                         
                       });

                    }
                }

    
          ></Report>

          )
      }

    if(!loading){
        return (
        
        <div> 
            <div className="" style={{
                marginTop: "10px",
                height: "90vh",
            }}>
                {/* <Button onClick={refreshDashboard}>
                    <CachedIcon />
                </Button> */}
                {Object.keys(results[0])[0] === 'productlevel'?  renderPowerBi(results[0].productlevel.reportId, results[0].productlevel.groupId ,results[0].productlevel.embeddingToken): renderPowerBi(results[1].productlevel.reportId, results[1].productlevel.groupId ,results[1].productlevel.embeddingToken) }
            </div>
      </div>
    )
        }
    else if(loading === true && error === false) {

        return (
            <div className="mr-auto ml-auto d-flex justify-content-center">
                <Spinner className="spinner-grow spinner-grow-sm text-primary" role="status"></Spinner>
                <Spinner className="spinner-grow spinner-grow-sm text-success" role="status"></Spinner>
                <Spinner className="spinner-grow spinner-grow-sm text-warning" role="status"></Spinner>
            </div>
        )
    }
    else {
        return (<div>
            <LinearProgress />
        </div>)
    }
}
