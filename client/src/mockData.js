export const MOCK_DATA = {
    users: [
        { id: 1, username: 'admin', password: 'password123', role: 'ADMIN', name: 'Administrador Demo' },
        { id: 2, username: 'bodeguero', password: 'user123', role: 'BODEGUERO', name: 'Bodeguero Demo' },
        { id: 3, username: 'supervisor', password: 'user123', role: 'SUPERVISOR', name: 'Supervisor Demo' }
    ],
    materials: [
        { id: 1, sku: 'MAT-001', name: 'Cemento 25kg', description: 'Saco de cemento', unit: 'SACO', stock: 85, criticalStock: 10 },
        { id: 2, sku: 'MAT-002', name: 'Ladrillo Fiscal', description: 'Pallet de ladrillos', unit: 'UNIDAD', stock: 420, criticalStock: 50 },
        { id: 3, sku: 'HER-001', name: 'Taladro Percutor', description: 'Makita 18V', unit: 'UNIDAD', stock: 4, criticalStock: 1 },
        { id: 4, sku: 'MAT-003', name: 'Arena Gruesa', description: 'Metro cubico', unit: 'M3', stock: 12, criticalStock: 3 },
    ],
    workers: [
        { rut: '11111111-1', name: 'Juan Pérez', status: 'ACTIVE' },
        { rut: '22222222-2', name: 'María González', status: 'ACTIVE' },
        { rut: '33333333-3', name: 'Carlos Ruiz', status: 'ACTIVE' }
    ],
    movements: [
        {
            id: 1,
            type: 'IN',
            date: new Date().toISOString(),
            User: { username: 'bodeguero' },
            MovementDetails: [
                { quantity: 100, Material: { name: 'Ladrillo Fiscal' } }
            ]
        },
        {
            id: 2,
            type: 'OUT',
            date: new Date().toISOString(),
            User: { username: 'bodeguero' },
            Worker: { name: 'Juan Pérez' },
            MovementDetails: [
                { quantity: 2, Material: { name: 'Taladro Percutor' } }
            ]
        },
        {
            id: 3,
            type: 'LOSS',
            date: new Date().toISOString(),
            User: { username: 'supervisor' },
            MovementDetails: [
                { quantity: 5, Material: { name: 'Cemento 25kg' } }
            ]
        }
    ]
};
