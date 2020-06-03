import { Platform } from 'react-native';

const config = {
  API_URL: `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'}:8085`,
  HTTP_REQUESTS_TIMEOUT: 1000,
};
export default config;
