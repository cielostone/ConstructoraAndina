import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CurrentHistory() {
    const [movements, setMovements] = useState([]);

    const fetchHistory = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/movements/recent');
            setMovements(res.data);
        } catch (error) {
            console.error("Error fetching history", error);
        }
    };

    useEffect(() => {
        fetchHistory();
        // Poll every 5 seconds to keep it updated
        const interval = setInterval(fetchHistory, 5000);
        return () => clearInterval(interval);
    }, []);

    const getTypeLabel = (type) => {
        switch (type) {
            case 'IN': return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Entrada</span>;
            case 'OUT': return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Asignación</span>;
            case 'LOSS': return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Merma</span>;
            default: return type;
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Últimos Movimientos</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {movements.map((m) => (
                            <tr key={m.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(m.date).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getTypeLabel(m.type)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {m.MovementDetails.map((d, i) => (
                                        <div key={i}>
                                            {d.quantity} x {d.Material.name}
                                        </div>
                                    ))}
                                    {m.Worker && <div className="text-xs text-gray-400 mt-1">Hacia: {m.Worker.name}</div>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {m.User.username}
                                </td>
                            </tr>
                        ))}
                        {movements.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-400 text-sm">No hay movimientos registrados aún.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
