import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reports() {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/materials');
            setMaterials(res.data);
        } catch (error) {
            console.error('Error loading materials', error);
        }
    };

    const totalStock = materials.reduce((acc, m) => acc + m.stock, 0);
    const lowStockItems = materials.filter(m => m.stock <= m.criticalStock).length;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Reportes de Gestión</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Items en Inventario</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{totalStock}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Valor Inventario</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">$ --</p>
                    <p className="text-xs text-gray-400">Datos financieros no configurados</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Alertas Stock Crítico</h3>
                    <p className="text-3xl font-bold text-red-600 mt-2">{lowStockItems}</p>
                    <p className="text-xs text-gray-400">Items bajo nivel mínimo</p>
                </div>
            </div>

            {/* Stock Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Estado Actual de Inventario</h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {materials.map((m) => (
                            <tr key={m.sku}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{m.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.unit}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{m.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {m.stock <= m.criticalStock ? (
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Crítico
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Normal
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
