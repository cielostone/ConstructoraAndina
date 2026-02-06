import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CurrentHistory from '../components/CurrentHistory';

export default function StockOut() {
    const { user } = useAuth();
    const [materials, setMaterials] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [selectedWorker, setSelectedWorker] = useState('');
    const [selectedSku, setSelectedSku] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [matRes, workerRes] = await Promise.all([
                axios.get('http://localhost:3001/api/materials'),
                axios.get('http://localhost:3001/api/workers')
            ]);
            setMaterials(matRes.data);
            setWorkers(workerRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data', error);
        }
    };

    const handleAddItem = () => {
        if (!selectedSku || quantity <= 0) return;
        const material = materials.find(m => m.sku === selectedSku);

        // Check local stock availability considering cart
        const inCart = cart.find(i => i.sku === selectedSku)?.quantity || 0;
        if ((parseInt(quantity) + inCart) > material.stock) {
            alert(`Stock insuficiente. Disponible: ${material.stock}`);
            return;
        }

        setCart([...cart, { sku: selectedSku, name: material.name, quantity: parseInt(quantity) }]);
        setSelectedSku('');
        setQuantity(1);
    };

    const handleSubmit = async () => {
        try {
            if (cart.length === 0 || !selectedWorker) {
                alert('Complete el formulario');
                return;
            }

            await axios.post('http://localhost:3001/api/movements/out', {
                userId: user.id,
                workerRut: selectedWorker,
                items: cart
            });

            setMessage('Asignación registrada exitosamente');
            setCart([]);
            setSelectedWorker('');
            fetchData(); // Refresh stock
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error al registrar: ' + error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Asignar Material a Trabajador (Stock Out)</h2>

                {message && (
                    <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}

                {/* Worker Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Trabajador Responsable</label>
                    <select
                        className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={selectedWorker}
                        onChange={(e) => setSelectedWorker(e.target.value)}
                    >
                        <option value="">Seleccione Trabajador</option>
                        {workers.map(w => (
                            <option key={w.rut} value={w.rut}>
                                {w.name} ({w.rut})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end border-t pt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Material</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={selectedSku}
                            onChange={(e) => setSelectedSku(e.target.value)}
                        >
                            <option value="">Seleccione Material</option>
                            {materials.map(m => (
                                <option key={m.sku} value={m.sku} disabled={m.stock === 0}>
                                    {m.name} (Disp: {m.stock})
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
                        Agregar a Lista
                    </button>
                </div>

                {/* Cart Table */}
                {cart.length > 0 && (
                    <div className="mt-6 border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                                className="text-red-600 hover:text-red-900 text-sm"
                                            >
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="p-4 bg-gray-50 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 font-bold shadow"
                            >
                                Confirmar Asignación
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <CurrentHistory />
        </div>
    );
}
