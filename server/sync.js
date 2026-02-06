const { sequelize, User, Material, Worker } = require('./models');

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Force: true drops tables if they exist (good for dev/reset)
        await sequelize.sync({ force: true });
        console.log('Database synchronized.');

        // Seed Data
        // 1. Users
        await User.bulkCreate([
            { username: 'admin', password: 'password123', role: 'ADMIN' },
            { username: 'bodeguero', password: 'user123', role: 'BODEGUERO' },
            { username: 'supervisor', password: 'user123', role: 'SUPERVISOR' }
        ]);
        console.log('Users seeded.');

        // 2. Materials
        await Material.bulkCreate([
            { sku: 'MAT-001', name: 'Cemento 25kg', description: 'Saco de cemento polpaico', unit: 'SACO', stock: 100, criticalStock: 10 },
            { sku: 'MAT-002', name: 'Ladrillo Fiscal', description: 'Pallet de ladrillos', unit: 'UNIDAD', stock: 500, criticalStock: 50 },
            { sku: 'TOL-001', name: 'Taladro Percutor', description: 'Makita 18V', unit: 'UNIDAD', stock: 5, criticalStock: 1 }
        ]);
        console.log('Materials seeded.');

        // 3. Workers
        await Worker.bulkCreate([
            { rut: '11111111-1', name: 'Juan Perez', status: 'ACTIVE' },
            { rut: '22222222-2', name: 'Pedro Gonzalez', status: 'ACTIVE' }
        ]);
        console.log('Workers seeded.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

syncDatabase();
