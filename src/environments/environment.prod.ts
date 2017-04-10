interface Firebase {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
}

const firebaseConfig: Firebase = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};


export const environment = {
  production: true,
  firebaseConfig,
  apiBaseUrl: 'http://api-lenken.andela.com',
  lenkenBaseUrl: 'http://lenken-staging.andela.com:4200'
};
