import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ malls }) {
    const [localMalls, setLocalMalls] = useState(malls || []);
    const [filters, setFilters] = useState({
        partyName: '',
        gazana: '',
        lot: '',
        thanAmount: '',
        colorAmount: ''
    });
    
    const filteredMalls = localMalls.filter(mall => {
        return (
            (!filters.partyName || mall.partyName.toLowerCase().includes(filters.partyName.toLowerCase())) &&
            (!filters.gazana || mall.gazana.toString().includes(filters.gazana)) &&
            (!filters.lot || mall.lot.toLowerCase().includes(filters.lot.toLowerCase())) &&
            (!filters.thanAmount || mall.thanAmount.toString().includes(filters.thanAmount)) &&
            (!filters.colorAmount || mall.colorAmount.toString().includes(filters.colorAmount))
        );
    });

    const handleSearch = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const handleDelete = (mall) => {
        if (!confirm('Are you sure you want to delete this record?')) return;
        
        router.delete(route('mall.destroy', { mall: mall.id }), {
            onSuccess: () => {
                console.log('Mall deleted successfully');
            },
            onError: () => {
                alert('Failed to delete. Please try again.');
            }
        });
    };

    const handleToDesign = (mall) => {
        router.visit(route('design.create', { mall: mall.id }));
    };

    const handleNavigate = () => {
        router.visit(route('mall.add'));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 relative min-h-[60vh]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Search Forms */}
                            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Party Name
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.partyName}
                                        onChange={(e) => handleSearch('partyName', e.target.value)}
                                        placeholder="Search by party name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Gazana
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.gazana}
                                        onChange={(e) => handleSearch('gazana', e.target.value)}
                                        placeholder="Search by gazana"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Lot
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.lot}
                                        onChange={(e) => handleSearch('lot', e.target.value)}
                                        placeholder="Search by lot"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Than Amount
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.thanAmount}
                                        onChange={(e) => handleSearch('thanAmount', e.target.value)}
                                        placeholder="Search by than amount"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Color Amount
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.colorAmount}
                                        onChange={(e) => handleSearch('colorAmount', e.target.value)}
                                        placeholder="Search by amount"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Party Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Gazana</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Than Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Measurements</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lot</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Colors</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Party Time</th>
                                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                                        {filteredMalls.map((mall) => (
                                            <tr key={mall.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{mall.partyName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{mall.gazana}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    Amount: {mall.thanAmount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    Front: {mall.frontLength}<br />
                                                    Back: {mall.backLength}<br />
                                                    Dupatta: {mall.dupattaLength}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{mall.lot}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{mall.colorAmount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(mall.partyArrivalTime)}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-right space-x-2">
                                                    <button
                                                        onClick={() => router.visit(route('mall.edit', { mall: mall.id }))}
                                                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none mr-2"
                                                        title="Edit"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(mall)}
                                                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none mr-2"
                                                        title="Delete"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => handleToDesign(mall)}
                                                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none"
                                                        title="Add Design"
                                                    >
                                                        To Design
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                                            {filteredMalls.length === 0 && (
                                            <tr>
                        <td colSpan="8" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                    No mall records found. Click the + button to add one.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sticky + button at the bottom center */}
                <button
                    onClick={handleNavigate}
                    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-4 text-3xl font-bold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"
                    title="Add new mall"
                >
                    +
                </button>
            </div>
        </AuthenticatedLayout>
    );
}

