import { environment } from '../env';

environment.production = true;
environment.apiBaseUrl = 'https://lenken-api.herokuapp.com/api/v1';
environment.apiGateway = 'https://api.andela.com';
environment.lenkenBaseUrl = 'https://lenken.andela.com';

export { environment }
