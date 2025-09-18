import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Form({ auth, machine, bill, isEditing = false }) {
    const { data, setData, post, patch, processing, errors } = useForm({
        than_amount: bill?.than_amount || '',
        return_time: bill?.return_time ? new Date(bill.return_time).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        bill_amount: bill?.bill_amount || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            patch(route('bill.update', bill.id), {
                onSuccess: () => {
                    window.location.href = route('bill.index');
                },
                preserveScroll: true,
            });
        } else {
            post(route('bill.store', machine.id), {
                onSuccess: () => {
                    window.location.href = route('bill.index');
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEditing ? 'Edit Bill' : 'Create Bill'}</h2>}
        >
            <Head title={isEditing ? 'Edit Bill' : 'Create Bill'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Machine Information */}
                            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Machine Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Party Name</p>
                                        <p className="font-medium">{(isEditing ? bill?.machine?.design?.mall?.partyName : machine?.design?.mall?.partyName)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Design Number</p>
                                        <p className="font-medium">{(isEditing ? bill?.machine?.design?.design_number : machine?.design?.design_number)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Than Amount</p>
                                        <p className="font-medium">{(isEditing ? bill?.than_amount : machine?.than_remaining)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Employee Name</p>
                                        <p className="font-medium">{(isEditing ? bill?.machine?.employee_name : machine?.employee_name)}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Than Amount
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={machine?.than_remaining}
                                        value={data.than_amount}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            if (value <= machine?.than_remaining) {
                                                setData('than_amount', value);
                                            }
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Available: {machine?.than_remaining} thans
                                    </p>
                                    {errors.than_amount && <div className="text-red-500">{errors.than_amount}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Return Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.return_time}
                                        onChange={(e) => setData('return_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        required
                                    />
                                    {errors.return_time && <div className="text-red-500">{errors.return_time}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Bill Amount
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.bill_amount}
                                        onChange={(e) => setData('bill_amount', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        required
                                    />
                                    {errors.bill_amount && <div className="text-red-500">{errors.bill_amount}</div>}
                                </div>

                                <div className="flex items-center justify-end mt-4 space-x-4">
                                    <Link
                                        href={route('machine.index')}
                                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-blue-600 focus:bg-blue-700 dark:focus:bg-blue-600 active:bg-blue-900 dark:active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                    >
                                        {processing ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Bill' : 'Create Bill')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}