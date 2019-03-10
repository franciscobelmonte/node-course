import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
    const query = `SELECT * FROM heroes`;
    
    MySql.executeQuery(query, (err: any, heroes: Object[]) => {
        if(err){
            return res.status(400).json({
                error: true,
                message: err
            });
        }
        return res.json({
            error: false,
            heroes: heroes
        });
    });
});

router.get('/heroes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    const query = `SELECT * FROM heroes WHERE id = ${MySql.instance.connection.escape(id)}`;

    MySql.executeQuery(query, (err: any, hero: Object[]) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: err
            });
        }
        return res.json({
            error: false,
            hero: hero[0]
        });
    });
});

export default router;