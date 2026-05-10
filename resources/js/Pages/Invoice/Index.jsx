import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2>}
        >
            <Head title="Invoices" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Invoice list will go here */}
                            <div className="mb-4">
                                <h3 className="text-lg font-medium">All Invoices</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border">Invoice #</th>
                                            <th className="py-2 px-4 border">Date</th>
                                            <th className="py-2 px-4 border">Party Name</th>
                                            <th className="py-2 px-4 border">Amount</th>
                                            <th className="py-2 px-4 border">Status</th>
                                            <th className="py-2 px-4 border">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Sample row - replace with actual data */}
                                        <tr>
                                            <td className="py-2 px-4 border">INV-0001</td>
                                            <td className="py-2 px-4 border">2025-09-21</td>
                                            <td className="py-2 px-4 border">Sample Party</td>
                                            <td className="py-2 px-4 border">$1,000.00</td>
                                            <td className="py-2 px-4 border">
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                    Paid
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 border">
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
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