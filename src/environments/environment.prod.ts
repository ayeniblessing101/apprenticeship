interface Firebase {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
}

 const firebaseConfig: Firebase = {
  apiKey: 'AIzaSyBKbI6DhMCxfpgNziMWePbYl0uFPH8T8NQ',
  authDomain: 'lenken-messaging.firebaseapp.com',
  databaseURL: 'https://lenken-messaging.firebaseio.com',
  projectId: 'lenken-messaging',
  storageBucket: 'lenken-messaging.appspot.com',
  messagingSenderId: '11558842472'
};

export const environment = {
  production: true,
  firebaseConfig,
  apiBaseUrl: 'http://api-lenken.andela.com',
  lenkenBaseUrl: 'http://lenken-staging.andela.com:4200'
};
