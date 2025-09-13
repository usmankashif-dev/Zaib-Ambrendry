import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Design({ auth, designs = [], success }) {
    const [filters, setFilters] = useState({
        partyName: '',
        designNumber: '',
        stitchAmount: '',
        lot: '',
        thanAmount: ''
    });

    const filteredDesigns = designs.filter(design => {
        return (
            (!filters.partyName || design.mall.partyName.toLowerCase().includes(filters.partyName.toLowerCase())) &&
            (!filters.designNumber || design.design_number.toString().includes(filters.designNumber)) &&
            (!filters.stitchAmount || design.stitch_amount.toString().includes(filters.stitchAmount)) &&
            (!filters.lot || design.mall.lot.toLowerCase().includes(filters.lot.toLowerCase())) &&
            (!filters.thanAmount || design.mall.thanAmount.toString().includes(filters.thanAmount))
        );
    });

    const handleSearch = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this design?')) {
            router.delete(route('design.destroy', id));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Design</h2>}
        >
            <Head title="Design" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
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
                                        Design Number
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.designNumber}
                                        onChange={(e) => handleSearch('designNumber', e.target.value)}
                                        placeholder="Search by design number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Stitch Amount
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.stitchAmount}
                                        onChange={(e) => handleSearch('stitchAmount', e.target.value)}
                                        placeholder="Search by stitch amount"
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
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Party Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Design Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Measurements</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Additional Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                                        {filteredDesigns.map((design) => (
                                            <tr key={design.id}>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Party:</span> {design.mall.partyName}</p>
                                                        <p><span className="font-medium">Gazana:</span> {design.mall.gazana}</p>
                                                        <p><span className="font-medium">Than Amount:</span> {design.mall.thanAmount}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Design Number:</span> {design.design_number}</p>
                                                        <p><span className="font-medium">Stitch Amount:</span> {design.stitch_amount}</p>
                                                        <p><span className="font-medium">Added:</span> {new Date(design.created_at).toLocaleString()}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Front:</span> {design.mall.frontLength}</p>
                                                        <p><span className="font-medium">Back:</span> {design.mall.backLength}</p>
                                                        <p><span className="font-medium">Dupatta:</span> {design.mall.dupattaLength}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Lot:</span> {design.mall.lot}</p>
                                                        <p><span className="font-medium">Color Amount:</span> {design.mall.colorAmount}</p>
                                                        <p><span className="font-medium">Party Time:</span> {new Date(design.mall.partyArrivalTime).toLocaleString()}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => router.get(route('design.edit', design.id))}
                                                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => router.post(route('design.return', design.id))}
                                                            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md"
                                                        >
                                                            Return
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(design.id)}
                                                            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!filteredDesigns || filteredDesigns.length === 0) && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                    No designs found. Add a design from the mall dashboard.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
