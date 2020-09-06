import { Router } from 'express';
import indexController from '../controllers/index.controller';

class IndexRouter {

    // Router: Para poder configurar el tipo de peticion
    public router: Router = Router();
    
    constructor() {

        // Configuraciones de las rutas principales
        this.config();
    }

    config(): void {

        // Tipo de peticion - Accion de la peticion
        this.router.get('/', indexController.read);
    }
}

const indexRouter = new IndexRouter();
export default indexRouter.router;