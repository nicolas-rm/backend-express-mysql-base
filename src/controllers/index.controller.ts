import { Request, Response } from 'express';
import pool from '../database/conexion.database';

class IndexController {

    constructor() {

    }

    public async read(req: Request, res: Response): Promise<void> {

        const query = 'SELECT * FROM HOSPITALES';

        /* HABRE UNA CONECCION CON LA BASE DE DATOS*/
        const connection = await (await pool).getConnection();

        try {
            /* INICIO DE TRANSACCIONES SEGURAS */
            await connection.beginTransaction();

            let hospitales = await connection.query(query);

            /* GUARDAR Y SALIR DE LA TRANSACCION SEGURA */
            await connection.commit();

            res.status(200).json({
                OK: true,
                PUT: `Las Credenciales Son Correctas.`,
                hospitales
            });
        
        } catch (err) {
            /* COPIA DE SEGURIDAD DE LA TRANSACCION SEGURA */
            await connection.rollback();

            /* NOTIFICACION / MENSAJE - JSON, DEL PROPIO ESTANDAR  */
            // queryError.Query(err, res);
            console.log(err)
        } finally {
            /* CERRAR LA CONECCION CON LA BASE DE DATOS */
            (await pool).releaseConnection(connection);
        }

    }
}

const indexController = new IndexController();
export default indexController;