import 'source-map-support/register'
/* import * as uuid from 'uuid' */
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
 import * as AWS from 'aws-sdk'

 let dynamo = new AWS.DynamoDB.DocumentClient();
/*import { parseUserId } from '../../auth/utils' */
const TODOCONNECTION_TABLE = process.env.TODOCONNECTION_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log(event);
  //const createdTodo: CreateTodoRequest = JSON.parse(event.body)
  /* const itemId = uuid.v4(); */
  //const authorization = event.headers.Authorization
  //const split = authorization.split(' ')
  //const jwtToken = split[1]
  //const newTodo = await createTodo(createdTodo, jwtToken);
  

  // TODO: Implement creating a new TODO item

  if (event.requestContext.eventType === 'CONNECT') {
    // Handle connection
    addConnection(event.requestContext.connectionId)
      .then(() => {
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              item:"everything is alright connectiın added"
            })
          }
      })
      .catch(err => {
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
  } else if (event.requestContext.eventType === 'DISCONNECT') {
    // Handle disconnection
    deleteConnection(event.requestContext.connectionId)
      .then(() => {
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              item:"delete connection"
            })
          }
      })
      .catch(err => {
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
  
}
/*
const getConnectionIds = () => {  
    const params = {
      TableName: TODOCONNECTION_TABLE,
      ProjectionExpression: 'connectionId'
    };
  
    return dynamo.scan(params).promise();
  }

const getAllConnection = () => {  
    const params = {
      TableName: TODOCONNECTION_TABLE
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
*/
const addConnection = connectionId => {
    const params = {
      TableName: TODOCONNECTION_TABLE,
      Item: {
        connectionId: connectionId 
      }
    };
    return  dynamo.put(params).promise();
  };
  
  const deleteConnection = connectionId => {
    const params = {
      TableName: TODOCONNECTION_TABLE,
      Key: {
        connectionId: connectionId 
      }
    };

    return  dynamo.delete(params).promise();
  };