import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Form({ auth, design, machine, errors: pageErrors }) {
    const isEditing = !!machine;

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        employee_name: machine?.employee_name || '',
        production_time: machine?.production_time 
            ? new Date(machine.production_time).toISOString().slice(0, 16)
            : new Date().toISOString().slice(0, 16)
    });

    useEffect(() => {
        if (!design && !machine) {
            window.history.back();
        }
    }, [design, machine]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            patch(route('machine.update', machine.id), {
                onSuccess: () => {
                    window.location.href = route('machine.index');
                },
                preserveScroll: true,
            });
        } else {
            post(route('machine.store', design.id), {
                onSuccess: () => {
                    reset();
                    window.location.href = route('machine.index');
                },
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {isEditing ? 'Edit Machine Record' : 'Add to Machine'}
            </h2>}
        >
            <Head title={isEditing ? 'Edit Machine Record' : 'Add to Machine'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Design Information */}
                            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Design Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Party Name</p>
                                        <p className="font-medium">{isEditing ? machine?.design?.mall?.partyName : design?.mall?.partyName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Design Number</p>
                                        <p className="font-medium">{isEditing ? machine?.design?.design_number : design?.design_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Stitch Amount</p>
                                        <p className="font-medium">{isEditing ? machine?.design?.stitch_amount : design?.stitch_amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Lot</p>
                                        <p className="font-medium">{isEditing ? machine?.design?.mall?.lot : design?.mall?.lot}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Employee Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.employee_name}
                                        onChange={(e) => setData('employee_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        required
                                    />
                                    {errors.employee_name && <div className="text-red-500">{errors.employee_name}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Production Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.production_time}
                                        onChange={(e) => setData('production_time', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        required
                                    />
                                    {errors.production_time && <div className="text-red-500">{errors.production_time}</div>}
                                </div>

                                {pageErrors && (
                                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                                        <p className="font-medium">Please correct the following errors:</p>
                                        <ul className="mt-2 list-disc list-inside">
                                            {Object.values(pageErrors).map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex items-center justify-end mt-4 space-x-4">
                                    <Link
                                        href={route('design.index')}
                                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 dark:hover:bg-blue-600 focus:bg-blue-700 dark:focus:bg-blue-600 active:bg-blue-900 dark:active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                    >
                                        {processing ? 'Processing...' : (isEditing ? 'Update Record' : 'Add to Machine')}
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