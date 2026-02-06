import { useAuth } from '../context/AuthContext';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import StockIn from './StockIn';
import StockOut from './StockOut';
import Loss from './Loss';
import Reports from './Reports';
import { LogOut, PackagePlus, Users, ClipboardList, BarChart3, Menu } from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-xl font-bold">SGI Andina</h1>
                    <p className="text-xs text-slate-400 mt-1">Gestión de Inventario</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/dashboard/stock-in" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition">
                        <PackagePlus size={20} />
                        <span>Entrada (Stock In)</span>
                    </Link>
                    <Link to="/dashboard/stock-out" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition">
                        <Users size={20} />
                        <span>Asignación (Stock Out)</span>
                    </Link>
                    <Link to="/dashboard/loss" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition">
                        <ClipboardList size={20} />
                        <span>Mermas</span>
                    </Link>
                    <Link to="/dashboard/reports" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition">
                        <BarChart3 size={20} />
                        <span>Reportes</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                            {user?.username?.[0]?.toUpperCase()}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{user?.username}</p>
                            <p className="text-xs text-slate-400">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 text-sm w-full"
                    >
                        <LogOut size={16} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
                    <span className="font-bold text-gray-700">SGI Andina</span>
                    <Menu className="text-gray-600" />
                </header>

                <div className="p-8">
                    <Routes>
                        <Route path="/" element={
                            <div className="text-center mt-20">
                                <h2 className="text-3xl font-bold text-gray-800">Bienvenido al Sistema</h2>
                                <p className="text-gray-600 mt-2">Seleccione una opción del menú lateral para comenzar a operar.</p>
                            </div>
                        } />
                        <Route path="stock-in" element={<StockIn />} />
                        <Route path="stock-out" element={<StockOut />} />
                        <Route path="loss" element={<Loss />} />
                        <Route path="reports" element={<Reports />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
