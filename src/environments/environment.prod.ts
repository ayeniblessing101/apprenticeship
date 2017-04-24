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
  production: true,
  firebaseConfig,
  apiBaseUrl: 'http://api-lenken.andela.com',
  lenkenBaseUrl: 'http://lenken-staging.andela.com:4200'
};
