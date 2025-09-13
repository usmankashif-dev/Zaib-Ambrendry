import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, history }) {
    const formatData = (data) => {
        if (!data) return null;
        return (
            <div className="space-y-4">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="flex space-x-4">
                        <span className="font-medium">{key}:</span>
                        <span>{JSON.stringify(value)}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">History Details</h2>}
        >
            <Head title="History Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <Link
                                    href={route('history.index')}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    ← Back to History
                                </Link>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium">Action</h3>
                                    <p className="mt-1">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${history.action === 'create' ? 'bg-green-100 text-green-800' : 
                                            history.action === 'update' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'}`}>
                                            {history.action}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium">Description</h3>
                                    <p className="mt-1">{history.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium">User</h3>
                                    <p className="mt-1">{history.user_name}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium">Date</h3>
                                    <p className="mt-1">{new Date(history.created_at).toLocaleString()}</p>
                                </div>

                                {history.old_data && (
                                    <div>
                                        <h3 className="text-lg font-medium">Old Data</h3>
                                        <div className="mt-1 bg-gray-50 p-4 rounded">
                                            {formatData(history.old_data)}
                                        </div>
                                    </div>
                                )}

                                {history.new_data && (
                                    <div>
                                        <h3 className="text-lg font-medium">New Data</h3>
                                        <div className="mt-1 bg-gray-50 p-4 rounded">
                                            {formatData(history.new_data)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
