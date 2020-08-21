const axios = require('axios')
const { head } = require('../configureIngestionJobs')
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer dapi1b876592cc8332b32b5aa000a6b4cd92'
}
const api_url = 'https://adb-6971132450799346.6.azuredatabricks.net/api/2.0/jobs/run-now'

function notebookTrigger(data) {
    return new Promise((resolve, reject)=>{
    axios.post(api_url, data, {
        headers: headers
    })
        .then((res) => {
            console.log(`statusCode: ${res.status}`)
            // console.log(`statusText is ${res.statusText}`)
            console.log(res.data);

            resolve(res.data.run_id)
            
        })
        .catch((error) => {
            console.error('Error is ', error);
            reject('Failed');
        })
}) 

} 
    

function runJobResponse (runID) {
    console.log(runID, '------ is supposed to be res')
    return new Promise((resolve, reject)=> {
        axios.get(`https://adb-6971132450799346.6.azuredatabricks.net/api/2.0/jobs/runs/get-output?run_id=${runID}`,{
        headers: headers
        }).then((result)=>{
            console.log('FIRST TIME--- ',result.data.metadata.state)
            if(result.data.metadata.state.life_cycle_state === 'TERMINATED'){
                console.log(result.data.metadata.state, "!!!!!!")
                if(result.data.metadata.state.result_state === 'SUCCESS'){
                    console.log("CAME HERE BROOOO", result.data.notebook_output)
                    resolve(result.data.notebook_output)
                }else{
                    console.log('--- TERMINATED -- ',result.data.metadata.state.life_cycle_state );
                    resolve('Failed') 
                }
                
            }else{
                console.log('PENDING --- ',result.data.metadata.state.life_cycle_state)
                resolve('PENDING') 
                
            }
    
        }).catch((err)=>{
            console.log(err);
            reject('Failed')
        })

    })
}

module.exports = {notebookTrigger, runJobResponse}