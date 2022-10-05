# AngularWebAppWithOktaAuthenticationRedirectAndREST_API_ATIPLCourse
A simple web page application that allows authentication thanks to the Okta Sign In Widget for Angular. Once the user is logged in the organization, it can access the protected resources hosted on an Express Server.

## Setup
In the app.module.ts file change the ORG_NAME_HERE with your Okta organization's name. The name can be found in the top right side of your Okta dev page, and should be something similar to dev-12345678.

Change the CLIENT_ID_HERE with the application client ID. It can be found under Applications > Applications, right under your application (that was created using Pulumi).

Ensure to have checked to have correctly setted up the following complementary projects:
Okta setup with Pulumi: https://github.com/Cis8/PulumiOktaApplicationSetupATIPLCourse
Express JS server: https://github.com/Cis8/ExpressOktaAuthServerATIPLCourseExam

## Organization and functionalities of the application
There are three main components: AppComponent, LoginComponent, and ProtectedComponent.
AppComponent is just the home page of the site. In the HTML file of the component, there is some text that will help the user understand where he is and what does he have to do.

LoginComponent is responsible for redirecting the user to the Okta's sign in component, in order to login him into the webapp. It also allows the user to logout (once he is logged in).

The protected component will allow the user to request for the desired resources and then show them to him. For simplicity the JSON of the request body is rawly written as text in the response filed.

In case of missing token in the REST API request (suppose it has been sent with Postman, without a valid token) the erver will respond with "401 - Unauthorized". The server will use an Okta module to check the validity of the token.

In case of non-existing resource, the server will respond with a 404 error and the response field with tell the user that the user couldn't be found.
To know which are the available resources, you can find the updated list in the README file of the server repository https://github.com/Cis8/ExpressOktaAuthServerATIPLCourseExam.

## Modules and architecture
The Angular application is based on Angular v14.2.0 and uses some modules to get the work done, in particular:
- angular router
- okta auth
- okta sign in widget

### Angular router
Allows to have a better management of the routes of the site.

In particular, allowed the possibility to protect the Protected Component with OktaAuthGuard. This guard is able to redirect the user to the okta sign in widget if he is trying to access the protected route while not logged in. After a successful log in, he will be redirected to the protected component.

Moreover it allows to define the callback route for the Okta Callback Component. The utility of this component is described under the "Okta Sign In Widget" section.

### Okta Auth
Allows to check the authentication state of the user, to properly manage the layout of the site (like showing fields that should be visible only to authenticated users) and a better route manangement (like for the OktaAuthGuard that checks for the user authentication state when he's trying to access the Protected Component).

### Okta Sign In Widget
Is the widget that the user is redirected to when he is asked to sign in. Peculiar is that the authentication with this widget will give to the user a temporary code that has to be passed in into the Okta Callback Component in order to be exchanged for the effective token. Then the user will be considered (by the OktaAuthState service) correctly logged in. At this point the user can access the protected Component and ask for the resources exposed by the server.

### Proxy Conf File
proxy.conf.json file allows the API request rewriting so that they'll be formatted for the Express server. Basically, the API requests are formed by the string of text written in the input box in the Protected Component, appended to the base URL http://localhost:8080. For example, if we request for the resource 'tshirt', the API URL link will be http://localhost:8080/tshirt.
Since we use this Proxy configuration, the web upp must be launched with the optional argument --proxy-config. The full command is: ng serve -o --proxy-config proxy.conf.json

