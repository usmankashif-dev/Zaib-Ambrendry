import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';

export default function Generate({ auth, employees }) {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();

    const { data, setData, post, processing, errors } = useForm({
        month: currentMonth,
        year: currentYear,
        employee_ids: [],
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setData('employee_ids', employees.map(emp => emp.id));
        } else {
            setData('employee_ids', []);
        }
    };

    const handleEmployeeCheck = (empId) => {
        const newIds = data.employee_ids.includes(empId)
            ? data.employee_ids.filter(id => id !== empId)
            : [...data.employee_ids, empId];
        setData('employee_ids', newIds);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('salaries.process'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Generate Monthly Salaries</h2>}
        >
            <Head title="Generate Salaries" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="month" value="Month" />
                                        <select
                                            id="month"
                                            name="month"
                                            value={data.month}
                                            onChange={e => setData('month', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        >
                                            {months.map(month => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="year" value="Year" />
                                        <select
                                            id="year"
                                            name="year"
                                            value={data.year}
                                            onChange={e => setData('year', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        >
                                            {[currentYear - 1, currentYear, currentYear + 1].map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            id="select-all"
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            checked={data.employee_ids.length === employees.length}
                                            onChange={handleCheckAll}
                                        />
                                        <label htmlFor="select-all" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            Select All Employees
                                        </label>
                                    </div>

                                    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-8"></th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Base Salary</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                {employees.map((employee) => (
                                                    <tr key={employee.id}>
                                                        <td className="px-6 py-4">
                                                            <input
                                                                type="checkbox"
                                                                checked={data.employee_ids.includes(employee.id)}
                                                                onChange={() => handleEmployeeCheck(employee.id)}
                                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                            {employee.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {employee.position}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {Number(employee.base_salary).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        disabled={processing || data.employee_ids.length === 0}
                                    >
                                        Generate Salaries
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