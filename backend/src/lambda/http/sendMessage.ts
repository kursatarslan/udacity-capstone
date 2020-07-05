
import 'source-map-support/register'
// import * as uuid from 'uuid' 
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
 import * as AWS from 'aws-sdk'

 let dynamo = new AWS.DynamoDB.DocumentClient();
//import { parseUserId } from '../../auth/utils' 
const TODOCONNECTION_TABLE = process.env.TODOCONNECTION_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.debug("Starting Lambda handler: event=%s", JSON.stringify(event));
  console.log(event);
  const connectionId = event.requestContext.connectionId;
  if (!connectionId) throw new Error("No connection ID");
  //const createdTodo: CreateTodoRequest = JSON.parse(event.body)
  // const itemId = uuid.v4(); 
  //const authorization = event.headers.Authorization
  //const split = authorization.split(' ')
  //const jwtToken = split[1]
  //const newTodo = await createTodo(createdTodo, jwtToken);
  

  // TODO: Implement creating a new TODO item

  sendMessageToAllConnected(event).then(() => {
    return getConnectionIds().then(connectionData => {
        return connectionData.Items.map(connectionId => {
          return send(event, connectionId.connectionId);
        });
      });
  }).catch (err => {
    console.log(err);
        return {
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              item: err
            })
          }
  });
  return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      item: ""
    })
  }
  
}


const sendMessageToAllConnected = (event) => {
    return getConnectionIds().then(connectionData => {
      return connectionData.Items.map(connectionId => {
        return send(event, connectionId.connectionId);
      });
    });
  }
  
const getConnectionIds = () => {  
    const params = {
      TableName: TODOCONNECTION_TABLE,
      ProjectionExpression: 'connectionId'
    };
  
    return dynamo.scan(params).promise();
  }
  
  const send = (event, connectionId) => {
    const body = JSON.parse(event.body);
    const postData = body.data;  
  
    const endpoint = event.requestContext.domainName + "/" + event.requestContext.stage;
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: endpoint
    });
  
    const params = {
      ConnectionId: connectionId,
      Data: postData
    };
    return apigwManagementApi.postToConnection(params).promise();
  };
 