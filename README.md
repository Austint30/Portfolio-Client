# My WIP Portfolio Website

Here I am developing a portfolio to showcase the skills that I have accrued over the years being a full stack developer.
This website is still heavily a work-in-progress, but feel free to take a look inside the source code!

## Plans for Frontend
- Improve compatibility with mobile device screens.
- Finish interactible navigation bar.
- Add page detailing my work experience and education.
- Add pages showcasing my web development projects.
- Add pages showcasing my non-web development projects.
- Finish homepage background theme selector.
- Add unit tests to React components.
- Create a guestbook UI.
- Create a messaging tool to allow recruiters to engage in a two-way conversation with me.
- Utilize AWS S3 static website hosting to host the frontend.
- Connect to GraphQL server to access backend layer functionality.
- Create a signin/signup UI.
- Create an admin dashboard.

## Plans for Backend
The backend does not exist at this time. Here are my plans for developing one:
- Create a separate repository containing all of the code for the backend layer.
- Utilize AWS CloudFormation Infrastructure-as-Code to deploy an ASP.NET Core REST API hosted by AWS Fargate. MVC will be utilized here.
- Create a GraphQL server hosted using AWS Fargate to integrate with the REST API.
- Host a MySQL server on RDS to add persistence to the website.
- Utilize AWS Cognito to support logging in using federated identities (Google, Microsoft, etc).
- Build the internals of the two-way conversation system that recruiters can use to contact me. Should utilize reply-by-email as well. Conversation chains will be stored in MySQL.
- Implement business and database access layer. DBA layer should be mockable for unit testing.
- Implement unit testing for business layer code.

## Plans for Frontend and Backend
- Implement a build system using GitHub Actions. Deployments to the master branch will automatically be built and unit/integration tested.
  - Release artifacts should automatically be uploaded to S3 static website hosting.

## Long-term plans
- Create a content management system to make blog posts.
