import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import UserGatewayHttp from './infra/gateway/UserGatewayHttp';

const userGateway = new UserGatewayHttp;
userGateway.login('heningtonfrota@example.com', 'password')
  .then(response => console.log(response))
  .catch(error => console.log(error));

createApp(App).mount('#app');
