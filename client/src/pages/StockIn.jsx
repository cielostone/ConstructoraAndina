import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CurrentHistory from '../components/CurrentHistory';

export default function StockIn() {
    const { user } = useAuth();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [selectedSku, setSelectedSku] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/materials');
            setMaterials(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading materials', error);
        }
    };

    const handleAddItem = () => {
        if (!selectedSku || quantity <= 0) return;
        const material = materials.find(m => m.sku === selectedSku);

        setCart([...cart, { sku: selectedSku, name: material.name, quantity: parseInt(quantity) }]);
        setSelectedSku('');
        setQuantity(1);
    };

    const handleSubmit = async () => {
        try {
            if (cart.length === 0) return;

            await axios.post('http://localhost:3001/api/movements/in', {
                userId: user.id,
                items: cart
            });

            setMessage('Entrada registrada exitosamente');
            setCart([]);
            fetchMaterials(); // Refresh stock in local list if needed, though mostly visual here
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error al registrar entrada: ' + error.message);
        }
    };

    return (
        <div>
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Registrar Entrada de Material (Stock In)</h2>

                {message && (
                    <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Material</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={selectedSku}
                            onChange={(e) => setSelectedSku(e.target.value)}
                        >
                            <option value="">Seleccione Material</option>
                            {materials.map(m => (
                                <option key={m.sku} value={m.sku}>
                                    {m.sku} - {m.name} (Stock: {m.stock})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                        <input
                            type="number"
                            min="1"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Agregar
                    </button>
                </div>

                {/* Cart Table */}
                {cart.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-medium text-gray-700 mb-2">Resumen de Entrada</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium"
                            >
                                Confirmar Entrada
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <CurrentHistory />
        </div>
    );
}
