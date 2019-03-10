import { Router, Request, Response } from 'express';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
    res.json({
        error: false,
        message: 'All is ok'
    });
});

router.get('/heroes/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    res.json({
        error: false,
        message: 'All is ok',
        id: id
    });
});

export default router;