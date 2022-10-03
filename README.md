# AngularWebAppWithOktaAuthenticationRedirectAndREST_API_ATIPLCourse
A simple web page application that allows authentication thanks to the Okta Sign In Widget for Angular. Once the user is logged in the organization, it can access the protected resources hosted on an Express Server.

## Setup
In the app.module.ts file change the ORG_NAME_HERE with your Okta organization's name. The name can be found in the top right side of your Okta dev page, and should be something similar to dev-12345678.

Change the CLIENT_ID_HERE with the application client ID. It can be found under Applications > Applications, right under your application (that was created using Pulumi).
