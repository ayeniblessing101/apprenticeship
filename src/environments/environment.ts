// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

interface Firebase {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
}

const firebaseConfig: Firebase = {
  apiKey: "AIzaSyDPB8JMqzT05doF0KX4xlC8wwDuARaWC0s",
  authDomain: "lenken-client.firebaseapp.com",
  databaseURL: "https://lenken-client.firebaseio.com",
  projectId: "lenken-client",
  storageBucket: "lenken-client.appspot.com",
  messagingSenderId: "234548638058"
};

export const environment = {
  production: false,
  firebaseConfig,
  apiBaseUrl: 'http://private-729ea-lenken.apiary-mock.com',
  lenkenBaseUrl: 'http://lenken-dev.andela.com:4200',
  apiGateway: 'https://api-staging.andela.com'
};
