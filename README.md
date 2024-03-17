# Mbicycle Foundation

This project is a central hub for access to company applications.
Written in React and TypeScript, it provides user authentication using a custom npm package using MSAL.
Users gain access to other applications depending on their rights and roles in the system.
This application greatly simplifies and simplifies managing access to corporate resources while ensuring security
and ease of use.

The project is designed to work with Microsoft Azure for SSO (Single Sign-On) using the [foundation-MSAL](https://github.com/mbicycle/foundation-MSAL) package.

Additionally, it is set up with GitHub Actions for continuous integration and deployment (CI/CD).

# Infrastructure & CI/CD

The backend of the application is built using a serverless architecture that allows for automatic scaling and
high availability. The backend consists of the following components:

- [DynamoDB](https://aws.amazon.com/dynamodb/) : A NoSQL database used to store user data,
  including their resumes and profile information.

- [Lambda](https://aws.amazon.com/lambda/) : A NoSQL database used to store user data,
  including their resumes and profile information.

- [API Gateway](https://aws.amazon.com/ru/dynamodb/) : A fully managed service that makes it easy to create, publish,
  and secure APIs. In CV Generator, API Gateway is used to expose the Lambda functions as RESTful APIs.

The frontend of the application is hosted on AWS S3 and distributed globally using CloudFront. The frontend consists of
static HTML, CSS, and JavaScript files that are generated using popular frameworks like React.

- [S3](https://aws.amazon.com/s3/) : A highly durable and scalable object storage service used to store and serve
  the static content of the frontend.

- [CloudFront](https://aws.amazon.com/cloudfront/) : A content delivery network that provides low-latency and high-speed
  delivery of static content to users worldwide.

![CloudFront](/public/CloudFront.png)

The project is set up with GitHub Actions for CI/CD. The workflow file can be found
in `.github/workflows/build-and-deploy.yml.` This workflow runs on every push to the `develop` and `release` branches
and deploys the application to Azure App Service.


# Technologies

The following technologies were used to build this project:

- UI library: [ReactJS](https://reactjs.org/), [Tailwind](https://tailwindui.com/);

- Language: [TypeScript](https://www.typescriptlang.org/);

- Forms management: [React Hook Form](https://react-hook-form.com/);

- Form validation: [Yup](https://github.com/jquense/yup);

- Server state manager: [React Query](https://react-query-v3.tanstack.com/);

- Local state manager: [Zustand](https://zustand-demo.pmnd.rs/);

- CI/CD: [GitHub Actions](https://github.com/features/actions);

- SSO: [Foundation-MSAL-bundle](https://github.com/mbicycle/foundation-MSAL);

## Installation of Foundation-MSAL-bundle

1) Get the latest version of bundle in .tgz format (mbicycle-msal-bundle-{your_version}.tgz) [here](https://github.com/mbicycle/foundation-MSAL/releases);
2) Put .tgz file in root folder of the app;
3) run `npm install ./mbicycle-msal-bundle-{your_version}.tgz`;
4) When new bundle version is released repeat the process;

# Backend

Simple Golang application with aws-sdk. Dummy diagram:

![dummy diagram](/public/DummyDiagram.jpg)

Auth Flow:

- Type: Implicit;

- User Pool: Azure AD;

- Auth Server: Azure AD;

- Authorizer: API Gateway Authorizer;

![Authorizer](/public/Authorizer.jpg)

# Install protocols link (win + unix)

<https://flaviocopes.com/react-how-to-configure-https-localhost/>
<https://www.mariokandut.com/how-to-setup-https-ssl-in-localhost-react/>
<https://serverfault.com/questions/366372/is-it-possible-to-generate-rsa-key-without-pass-phrase>

# Dev and Prod env
<https://mb-foundation.netlify.app/>