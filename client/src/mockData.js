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
        { id: 1, type: 'IN', quantity: 100, date: new Date().toISOString(), Material: { name: 'Ladrillo Fiscal' }, User: { username: 'bodeguero' } },
        { id: 2, type: 'OUT', quantity: 2, date: new Date().toISOString(), Material: { name: 'Taladro Percutor' }, User: { username: 'bodeguero' } },
        { id: 3, type: 'LOSS', quantity: 5, date: new Date().toISOString(), Material: { name: 'Cemento 25kg' }, User: { username: 'supervisor' } }
    ]
};
