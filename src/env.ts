export interface Firebase {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId?: string;
  storageBucket: string;
  messagingSenderId?: string;
}

const firebaseConfigObject: Firebase = {
  apiKey: 'AIzaSyDF5hVbvUUVnJTp0waVh3qPhwgjZst4f6U',
  authDomain: 'lenken-staging-messaging.firebaseapp.com',
  databaseURL: 'https://lenken-staging-messaging.firebaseio.com',
  projectId: 'lenken-staging-messaging',
  storageBucket: 'lenken-staging-messaging.appspot.com',
  messagingSenderId: '181468316764',
};

export const environment = {
  production: false,
  firebaseConfig: firebaseConfigObject,
  apiBaseUrl: 'http://lenken-dev.andela.com:3000/api/v1',
  lenkenBaseUrl: 'http://lenken-dev.andela.com:4200',
  apiGateway: 'https://api-staging.andela.com',
  segmentAPIKey: 'WmVlgctp4KY8XpgNBMveGUtimL9TW8ke',
  segmentAPIBaseUrl: 'https://api.segment.io/v1' 
};
