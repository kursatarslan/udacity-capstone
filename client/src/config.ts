// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '6hhndrsfl3'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-3wib0plw.auth0.com',            // Auth0 domain
  clientId: '1Sj42xuD0PqwoHzb2i47QK3goxNBNm4y',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
