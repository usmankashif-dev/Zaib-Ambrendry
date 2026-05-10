import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FaCheck, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Index({ auth, employees = [], date }) {
    const { post, processing } = useForm();

    const handleCheckIn = (employeeId) => {
        post(route('attendance.checkIn', employeeId));
    };

    const handleCheckOut = (employeeId) => {
        post(route('attendance.checkOut', employeeId));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Daily Attendance</h2>}
        >
            <Head title="Daily Attendance" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Attendance for {new Date(date).toLocaleDateString()}</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href={route('attendance.create')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    >
                                        Manual Entry
                                    </a>
                                    <a
                                        href={route('attendance.history')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        View History
                                    </a>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check In</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check Out</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hours</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {employees.map((employee) => {
                                            const attendance = employee.attendances[0] || null;
                                            return (
                                                <tr key={employee.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{employee.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {attendance?.check_in ? new Date(attendance.check_in).toLocaleTimeString() : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {attendance?.check_out ? new Date(attendance.check_out).toLocaleTimeString() : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {attendance?.hours_worked ? `${attendance.hours_worked} hrs` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            attendance?.status === 'present'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                        }`}>
                                                            {attendance?.status || 'Not Marked'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            {!attendance?.check_in ? (
                                                                <button
                                                                    onClick={() => handleCheckIn(employee.id)}
                                                                    disabled={processing}
                                                                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                                                                >
                                                                    <FaSignInAlt className="w-5 h-5" />
                                                                </button>
                                                            ) : !attendance?.check_out ? (
                                                                <button
                                                                    onClick={() => handleCheckOut(employee.id)}
                                                                    disabled={processing}
                                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                                                                >
                                                                    <FaSignOutAlt className="w-5 h-5" />
                                                                </button>
                                                            ) : (
                                                                <FaCheck className="w-5 h-5 text-green-500" />
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {employees.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                    No employees found.
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