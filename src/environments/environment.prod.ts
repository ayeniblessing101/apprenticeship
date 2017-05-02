import { environment } from '../env';

environment.production = true;
environment.apiBaseUrl = 'http://lenken-api-staging.herokuapp.com/api/v1';
environment.lenkenBaseUrl = 'http://lenken.andela.com';

export { environment }

