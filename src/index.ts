import Servidor from './server/servidor';

// Instancia unica del servidor
const index = Servidor.instance;

// Levantando Server
index.server();