interface Firebase {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId?: string;
  storageBucket: string;
  messagingSenderId?: string;
}

const firebaseConfigObject: Firebase = {
  apiKey: 'AIzaSyDPB8JMqzT05doF0KX4xlC8wwDuARaWC0s',
  authDomain: 'lenken-client.firebaseapp.com',
  databaseURL: 'https://lenken-messaging.firebaseio.com/',
  projectId: 'lenken-client',
  storageBucket: 'lenken-client.appspot.com',
  messagingSenderId: '234548638058',
};

export const environment = {
  production: false,
  firebaseConfig: firebaseConfigObject,
  apiBaseUrl: 'http://lenken-dev.andela.com:3000/api/v1',
  lenkenBaseUrl: 'http://lenken-dev.andela.com:4200',
  apiGateway: 'https://api-staging.andela.com',
  segmentAPIKey: 'WmVlgctp4KY8XpgNBMveGUtimL9TW8ke'
};
