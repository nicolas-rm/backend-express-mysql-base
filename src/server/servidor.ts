import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from '../routers/index.routes';

export default class Servidor {

    // Patron Singleton
    private static _instance: Servidor;

    // Server
    public app: Application;

    // Puerto
    private PUERTO: number = Number(process.env.PORT) || 3000;

    private constructor() {

        // Creacion del Server
        this.app = express();

        // Configuraciones del Server
        this.config();

        //  Configuraciones de Rutas
        this.routes();
    }

    private config(): void {
        // Puerto Del Servidor
        this.app.set('PUERTO', this.PUERTO);

        // Middleware
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(morgan('dev'));

    }

    private routes(): void {

        // Ruta Principal
        this.app.use('/', indexRouter);
    }

    // Metodo Principal y Unico Para La Ejecucion, Patron Singleton
    public static get instance(): Servidor {
        // Al LLamamo Crea Una Nueva Instancia o Reenvia La Instancia Creada Previamente
        return this._instance || (this._instance = new this());
    }

    // Levantando Server
    server(): void {
        this.app.listen(this.app.get('PUERTO'), () => {
            console.log(`\nExpress server puerto ${this.app.get('PUERTO')}: \x1b[32m%s\x1b[0m`, 'online\n');
        });
    }
}