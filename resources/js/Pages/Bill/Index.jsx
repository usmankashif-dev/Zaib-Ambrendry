import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Index({ auth, bills = [] }) {
    const [filters, setFilters] = useState({
        partyName: '',
        designNumber: '',
        employeeName: '',
        lot: ''
    });

    const filteredBills = bills.filter(bill => {
        return (
            (!filters.partyName || bill.machine?.design?.mall?.partyName?.toLowerCase().includes(filters.partyName.toLowerCase())) &&
            (!filters.designNumber || bill.machine?.design?.design_number?.toString().includes(filters.designNumber)) &&
            (!filters.employeeName || bill.machine?.employee_name?.toLowerCase().includes(filters.employeeName.toLowerCase())) &&
            (!filters.lot || bill.machine?.design?.mall?.lot?.toLowerCase().includes(filters.lot.toLowerCase()))
        );
    });

    const handleSearch = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Bills</h2>}
        >
            <Head title="Bills" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Search Forms */}
                            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                                        Employee Name
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.employeeName}
                                        onChange={(e) => handleSearch('employeeName', e.target.value)}
                                        placeholder="Search by employee name"
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
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Party Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Design Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bill Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Machine Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                                        {filteredBills.map((bill) => (
                                            <tr key={bill.id}>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Party:</span> {bill.machine?.design?.mall?.partyName}</p>
                                                        <p><span className="font-medium">Lot:</span> {bill.machine?.design?.mall?.lot}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Design Number:</span> {bill.machine?.design?.design_number}</p>
                                                        <p><span className="font-medium">Stitch Amount:</span> {bill.machine?.design?.stitch_amount}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Than Amount:</span> {bill.than_amount}</p>
                                                        <p><span className="font-medium">Bill Amount:</span> Rs. {bill.bill_amount}</p>
                                                        <p><span className="font-medium">Return Time:</span> {new Date(bill.return_time).toLocaleString()}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="space-y-1">
                                                        <p><span className="font-medium">Employee:</span> {bill.machine?.employee_name}</p>
                                                        <p><span className="font-medium">Production Time:</span> {new Date(bill.machine?.production_time).toLocaleString()}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => router.visit(route('bill.edit', bill.id))}
                                                            className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-100 rounded-lg dark:text-blue-400 dark:hover:bg-blue-700"
                                                        >
                                                            <FaEdit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this bill?')) {
                                                                    router.delete(route('bill.destroy', bill.id));
                                                                }
                                                            }}
                                                            className="inline-flex items-center p-2 text-red-600 hover:bg-red-100 rounded-lg dark:text-red-400 dark:hover:bg-red-700"
                                                        >
                                                            <FaTrash className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!bills || bills.length === 0) && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                    No bills found.
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