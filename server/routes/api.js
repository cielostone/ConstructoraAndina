const express = require('express');
const router = express.Router();
const { User, Material, Movement, MovementDetail, Worker, sequelize } = require('../models');

// --- AUTH ROUTES ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            id: user.id,
            username: user.username,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- WORKER ROUTES ---
router.get('/workers', async (req, res) => {
    try {
        const workers = await Worker.findAll({ where: { status: 'ACTIVE' } });
        res.json(workers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- MATERIAL ROUTES ---
router.get('/materials', async (req, res) => {
    try {
        const materials = await Material.findAll();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- MOVEMENT ROUTES ---

// Helper function to process movements
const processMovement = async (type, data, t) => {
    const { userId, date, items, workerRut } = data; // items: [{ sku, quantity }]

    const movement = await Movement.create({
        type,
        date: date || new Date(),
        userId,
        workerRut: type === 'OUT' ? workerRut : null
    }, { transaction: t });

    for (const item of items) {
        await MovementDetail.create({
            movementId: movement.id,
            materialSku: item.sku,
            quantity: item.quantity
        }, { transaction: t });

        const material = await Material.findByPk(item.sku, { transaction: t });
        if (material) {
            if (type === 'IN') {
                await material.increment('stock', { by: item.quantity, transaction: t });
            } else {
                // OUT or LOSS
                if (material.stock < item.quantity) {
                    throw new Error(`Insufficient stock for ${material.name}`);
                }
                await material.decrement('stock', { by: item.quantity, transaction: t });
            }
        }
    }
    return movement;
};

router.post('/movements/in', async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const movement = await processMovement('IN', req.body, t);
        await t.commit();
        res.json({ message: 'Stock In processed successfully', movementId: movement.id });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
});

router.post('/movements/out', async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const movement = await processMovement('OUT', req.body, t);
        await t.commit();
        res.json({ message: 'Assignment processed successfully', movementId: movement.id });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
});

router.post('/movements/loss', async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const movement = await processMovement('LOSS', req.body, t);
        await t.commit();
        res.json({ message: 'Loss reported successfully', movementId: movement.id });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
});

// --- HISTORY ROUTE ---
router.get('/movements/recent', async (req, res) => {
    try {
        const movements = await Movement.findAll({
            limit: 10,
            order: [['date', 'DESC']],
            include: [
                { model: User, attributes: ['username'] },
                { model: Worker, attributes: ['name'] },
                { model: MovementDetail, include: [Material] }
            ]
        });
        res.json(movements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
