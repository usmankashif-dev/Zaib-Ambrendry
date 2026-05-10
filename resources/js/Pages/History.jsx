import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function History({ history }) {
    const getActionColor = (action) => {
        switch ((action || '').toLowerCase()) {
            case 'create':
                return 'text-green-600';
            case 'update':
                return 'text-blue-600';
            case 'delete':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Mall History</h2>}
        >
            <Head title="Mall History" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Action</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {history.map((record) => (
                                            <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(record.created_at).toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`font-medium ${getActionColor(record.action)}`}>{record.action}</span></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.user_name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                    {record.action === 'update' ? (
                                                        <div>
                                                            <p className="font-medium">Changes:</p>
                                                            <ul className="list-disc list-inside">
                                                                {Object.keys(record.new_data || {}).map(key => {
                                                                    const oldValue = record.old_data?.[key];
                                                                    const newValue = record.new_data[key];
                                                                    if (oldValue !== newValue) {
                                                                        return (
                                                                            <li key={key}>{key}: {String(oldValue)} → {String(newValue)}</li>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </ul>
                                                        </div>
                                                    ) : record.action === 'create' ? (
                                                        <div>
                                                            <p className="font-medium">New Mall Created</p>
                                                            <p>Party Name: {record.new_data?.partyName}</p>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <p className="font-medium">Mall Deleted</p>
                                                            <p>Party Name: {record.old_data?.partyName}</p>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
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
