import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

export default function Show({ auth, salary }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Salary Details</h2>}
        >
            <Head title="Salary Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Employee Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Employee Information</h3>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <dl className="space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                                            <dd className="text-sm text-gray-900 dark:text-gray-100">{salary.employee.name}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</dt>
                                            <dd className="text-sm text-gray-900 dark:text-gray-100">{salary.employee.position}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Month</dt>
                                            <dd className="text-sm text-gray-900 dark:text-gray-100">{format(new Date(salary.month), 'MMMM yyyy')}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Attendance Summary */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Attendance Summary</h3>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <dl className="space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Days Present</dt>
                                            <dd className="text-sm text-gray-900 dark:text-gray-100">{salary.days_present} days</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Hours</dt>
                                            <dd className="text-sm text-gray-900 dark:text-gray-100">{salary.total_hours} hours</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Salary Breakdown */}
                            <div className="space-y-4 md:col-span-2">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Salary Breakdown</h3>
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <dl className="space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Base Salary</dt>
                                            <dd className="text-sm text-gray-900 dark:text-gray-100">
                                                Rs. {Number(salary.base_salary).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bonus Amount</dt>
                                            <dd className="text-sm text-green-600 dark:text-green-400">
                                                + Rs. {Number(salary.bonus_amount).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                            <div className="flex justify-between">
                                                <dt className="text-base font-medium text-gray-900 dark:text-gray-100">Total Salary</dt>
                                                <dd className="text-base font-bold text-gray-900 dark:text-gray-100">
                                                    Rs. {Number(salary.total_salary).toLocaleString()}
                                                </dd>
                                            </div>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}