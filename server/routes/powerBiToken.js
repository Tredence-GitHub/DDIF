const request = require('request');
const express = require('express');
const Router = express.Router();

let getAccessToken = function () {

    return new Promise(
        function(resolve, reject) {
            let bodyObj = null
            const url = 'https://login.microsoftonline.com/927e65b8-7ad7-48db-a3c6-c42a67c100d6/oauth2/token'; // replace common with tenant id  
            // const clientId = "af5980b1-1b1d-481d-907e-f4d65591903d" // works
            // const clientSecret = "oYlV-eZVW9DTLm9qL3xg-XT96jk.W_6SAP"
            // Second App reg - MD
            // const clientId = "b92a0386-8d11-4084-a9d9-d45700d08c53" // works
            // const clientSecret = "N6-N9yCNDExf5SW3-TRn-y1f2P38.vD.5L"
            const clientId = "3fb71bf0-d833-427e-8b22-9ed954afb5ea" // Applicaton ID of app registered via Azure Active Directory 
            const clientSecret = "3_207EwEU4klD6-GPZZzvV3AvR_9.SBb~t" // service principal secret


            const headers = {
            'Content-Type' : 'application/x-www-form-urlencoded'
            };

            const formData = {
                grant_type:'client_credentials', 
                client_id: clientId,
                client_secret: clientSecret,
                resource:'https://analysis.windows.net/powerbi/api'
            }


         
            console.log( "Posting to url for accessToken" )

            request.post(
                {
                    url:url,
                    form:formData,
                    headers:headers

                }, function(err, result, body) {

                    if(err) 
                        return reject(err);
                    //console.log(body);
                    bodyObj = JSON.parse(body);
                    // console.log("bodyObj first occurrence: ", bodyObj)

                    //console.log("Got body: ", bodyObj)
                    //return bodyObj.access_token;
                    resolve(bodyObj.access_token);
                }
            )



        }
    )
}


let getEmbedToken = function(accessToken, groupId, reportId) {
    return new Promise(function(resolve, reject) {
            let bodyObj = null
            
            const url = 'https://api.powerbi.com/v1.0/myorg/groups/' + groupId + '/reports/' + reportId + '/GenerateToken';

            const headers = {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer ' + accessToken
            }

            const formData = {
                "accessLevel": "View"
            }

            console.log("posting to get embedding token")

            request.post(
                {
                    url:url,
                    form:formData,
                    headers:headers

                }, 
                function(err, result, body) {
                    if(err) {
                        console.log("body received: ", body)
                        return reject(err);
                    }

                    console.log("body:", body)
                    if(body !== ''){

                        bodyObj = JSON.parse(body)
                        console.log("second occurrence bodyObj: ", bodyObj)

                      resolve(bodyObj.token);
                    }
                    else {
                        reject('Could not get embed Token')
                    }

                    
                }
            )
        }
    )
} 


Router.post('/getEmbedToken', async (req, res) => {

        try{
            console.log("THIS  --- ", req.body);
            let dataArray = req.body.data;
            // get reportId and corresponding groupId
            let result = await fetchEmbedTokenForReportIds(dataArray)
            // let accessToken = await getAccessToken()
            // console.log("This is access token: ", accessToken)

            // let embedToken = await getEmbedToken( accessToken, req.body.groupId, req.body.dashboardId )
            
            res.send({"embedToken" : result})
        }

        catch(err){
            res.status(500).send({"errMessage" : err})

        }

    }
)


// https://app.powerbi.com/groups/a3d38897-e2ce-4cec-9302-e5acafabc87b/reports/934a99b8-47a2-4825-907c-0040b96af643/ReportSection
async function fetchEmbedTokenForReportIds( arrayOfReportIds ){
    // const groupId = "a3d38897-e2ce-4cec-9302-e5acafabc87b"
    let arrayOfEmbeddingTokens = []

    console.log( "Entered here: ", arrayOfReportIds )

    let accessToken = await getAccessToken()
    console.log("This is access token: ", accessToken)

    for ( let pair of arrayOfReportIds ){
        for( let value in pair){
            let element = pair[value]
            if( element.reportId === "" ){
                arrayOfEmbeddingTokens.push({value: {"reportId": element.reportId, "embedToken": "" , groupId: element.groupId} } )
                pair[value].embeddingToken = ''
                continue
            }        
            console.log( "reportId -> ", element.reportId )
            let embedToken = await getEmbedToken( accessToken, element.groupId, element.reportId )
            console.log( "embedToken -> > > ", embedToken )
            pair[value].embeddingToken = embedToken
            console.log(pair)
            // arrayOfEmbeddingTokens.push({value: {"reportId": element.reportId, "embedToken": embedToken , "groupId": element.groupId } } )
        }
                    
            
        }


    // console.log('array of reportID !!!!!!!!!!!!!!!!! ', arrayOfReportIds )
    // console.log( "arrayOfEmbeddingTokens ~~~~~~~~~~~~~~~~~~~~~~~` ", arrayOfEmbeddingTokens )

    return arrayOfReportIds
    
}

// fetchEmbedTokenForReportIds([{"reportId":"934a99b8-47a2-4825-907c-0040b96af643",
// "groupId": "a3d38897-e2ce-4cec-9302-e5acafabc87b" }])

module.exports = Router;