import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { searchNewTodoInES, searchDoneTodoInES } from '../../domain/elasticSearch'
import { SearchOnTodoType } from '../../models/SearchOnTodoType'
import { extractToken } from '../../auth/utils'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Received evetn",event)

  const jwtToken = extractToken(event.headers.Authorization)


  var stringified = JSON.stringify(event.body);
  var parsedObj = JSON.parse(stringified);
   
  console.log(parsedObj)
  let results:any

  if(parsedObj.on === SearchOnTodoType.PENDING){
    results = await searchNewTodoInES(parsedObj.query,jwtToken)
  }else if(parsedObj.on =SearchOnTodoType.DONE){
    results = await searchDoneTodoInES(parsedObj.query,jwtToken)
  }else{
    return {
      statusCode: 400,
      body: JSON.stringify({
        results:"Invalid param value for On parameter"
      })
    }
  }

  const resturnRes = JSON.parse(JSON.stringify(results)).hits

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify({
      resturnRes
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)