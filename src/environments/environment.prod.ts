import { environment } from '../env';

environment.production = true;
environment.apiBaseUrl = 'https://lenken-api.herokuapp.com/api/v1';
environment.apiGateway = 'https://api.andela.com';
environment.lenkenBaseUrl = 'https://lenken.andela.com';
environment.segmentAPIKey = 'V4EKXirr8o67ciJDekznF1bgdS0kGD5V';
environment.firebaseConfig = {
  apiKey: 'AIzaSyBKbI6DhMCxfpgNziMWePbYl0uFPH8T8NQ',
  authDomain: 'lenken-messaging.firebaseapp.com',
  databaseURL: 'https://lenken-messaging.firebaseio.com/',
  projectId: 'lenken-messaging',
  storageBucket: 'lenken-messaging.appspot.com',
  messagingSenderId: '11558842472',
};

export { environment }
