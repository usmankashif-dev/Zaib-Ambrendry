import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create({ auth, employees }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        amount: '',
        reason: '',
        date: new Date().toISOString().split('T')[0],
        remarks: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bonuses.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add Bonus</h2>}
        >
            <Head title="Add Bonus" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="employee_id" value="Employee" />
                                    <select
                                        id="employee_id"
                                        name="employee_id"
                                        value={data.employee_id}
                                        onChange={e => setData('employee_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map(employee => (
                                            <option key={employee.id} value={employee.id}>
                                                {employee.name} - {employee.position}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.employee_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="amount" value="Amount" />
                                    <TextInput
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        value={data.amount}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={e => setData('amount', e.target.value)}
                                    />
                                    <InputError message={errors.amount} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="reason" value="Reason" />
                                    <TextInput
                                        id="reason"
                                        type="text"
                                        name="reason"
                                        value={data.reason}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('reason', e.target.value)}
                                    />
                                    <InputError message={errors.reason} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="date" value="Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('date', e.target.value)}
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="remarks" value="Remarks (Optional)" />
                                    <textarea
                                        id="remarks"
                                        name="remarks"
                                        value={data.remarks}
                                        onChange={e => setData('remarks', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        rows="3"
                                    ></textarea>
                                    <InputError message={errors.remarks} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        disabled={processing}
                                    >
                                        Add Bonus
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