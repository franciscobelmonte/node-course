"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    res.json({
        error: false,
        message: 'All is ok'
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        error: false,
        message: 'All is ok',
        id: id
    });
});
exports.default = router;
