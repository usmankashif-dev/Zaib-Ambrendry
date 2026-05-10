import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create({ auth, employees }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        check_in: new Date().toISOString().slice(0, 16),
        check_out: '',
        hours_worked: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };

    // Calculate hours worked when both check-in and check-out are set
    const calculateHours = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return;
        const startTime = new Date(checkIn);
        const endTime = new Date(checkOut);
        const diff = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
        return Math.round(diff * 100) / 100; // Round to 2 decimal places
    };

    // Update hours worked when check-in or check-out changes
    const handleTimeChange = (field, value) => {
        setData(field, value);
        if (field === 'check_in' || field === 'check_out') {
            const hours = calculateHours(
                field === 'check_in' ? value : data.check_in,
                field === 'check_out' ? value : data.check_out
            );
            if (hours) {
                setData('hours_worked', hours);
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Record Attendance</h2>}
        >
            <Head title="Record Attendance" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                                {employee.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.employee_id} className="mt-2" />
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
                                    <InputLabel htmlFor="check_in" value="Check In Time" />
                                    <TextInput
                                        id="check_in"
                                        type="datetime-local"
                                        name="check_in"
                                        value={data.check_in}
                                        className="mt-1 block w-full"
                                        onChange={e => handleTimeChange('check_in', e.target.value)}
                                    />
                                    <InputError message={errors.check_in} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="check_out" value="Check Out Time" />
                                    <TextInput
                                        id="check_out"
                                        type="datetime-local"
                                        name="check_out"
                                        value={data.check_out}
                                        className="mt-1 block w-full"
                                        onChange={e => handleTimeChange('check_out', e.target.value)}
                                    />
                                    <InputError message={errors.check_out} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="hours_worked" value="Hours Worked" />
                                    <TextInput
                                        id="hours_worked"
                                        type="number"
                                        step="0.01"
                                        name="hours_worked"
                                        value={data.hours_worked}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('hours_worked', e.target.value)}
                                        readOnly
                                    />
                                    <InputError message={errors.hours_worked} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        disabled={processing}
                                    >
                                        Record Attendance
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