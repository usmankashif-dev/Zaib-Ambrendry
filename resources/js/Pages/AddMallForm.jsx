import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AddMallForm() {
    const { data, setData, post, processing, errors } = useForm({
        partyName: '',
        gazana: '',
        thanAmount: '',
        partyArrivalTime: '',
        frontLength: '',
        backLength: '',
        dupattaLength: '',
        lot: '',
        colorAmount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data being submitted:', data);
        
        post(route('mall.store'), {
            onSuccess: () => {
                console.log('Form submission successful');
                // Form submission was successful
                setData({
                    partyName: '',
                    gazana: '',
                    thanAmount: '',
                    partyArrivalTime: '',
                    frontLength: '',
                    backLength: '',
                    dupattaLength: '',
                    lot: '',
                    colorAmount: ''
                });
            },
            onError: (errors) => {
                console.error('Form submission failed:', errors);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Mall Form
                </h2>
            }
        >
            <Head title="Add Mall Form" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Party Name */}
                                    <div>
                                        <label htmlFor="partyName" className="block text-sm font-medium">
                                            Party Name
                                        </label>
                                        <input
                                            type="text"
                                            id="partyName"
                                            name="partyName"
                                            value={data.partyName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                    {/* Gazana */}
                                    <div>
                                        <label htmlFor="gazana" className="block text-sm font-medium">
                                            Gazana
                                        </label>
                                        <input
                                            type="number"
                                            id="gazana"
                                            name="gazana"
                                            value={data.gazana}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                   

                                    {/* Than Amount */}
                                    <div>
                                        <label htmlFor="thanAmount" className="block text-sm font-medium">
                                            Amount of Than
                                        </label>
                                        <input
                                            type="number"
                                            id="thanAmount"
                                            name="thanAmount"
                                            value={data.thanAmount}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                    {/* Party Arrival Time */}
                                    <div>
                                        <label htmlFor="partyArrivalTime" className="block text-sm font-medium">
                                            Party Arrival Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            id="partyArrivalTime"
                                            name="partyArrivalTime"
                                            value={data.partyArrivalTime}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                    {/* Front */}
                                    <div>
                                        <label htmlFor="frontLength" className="block text-sm font-medium">
                                            Front
                                        </label>
                                        <input
                                            type="text"
                                            id="frontLength"
                                            name="frontLength"
                                            value={data.frontLength}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                    {/* Back */}
                                    <div>
                                        <label htmlFor="backLength" className="block text-sm font-medium">
                                            Back
                                        </label>
                                        <input
                                            type="text"
                                            id="backLength"
                                            name="backLength"
                                            value={data.backLength}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                    {/* Dupatta */}
                                    <div>
                                        <label htmlFor="dupattaLength" className="block text-sm font-medium">
                                            Dupatta
                                        </label>
                                        <input
                                            type="text"
                                            id="dupattaLength"
                                            name="dupattaLength"
                                            value={data.dupattaLength}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                    {/* Lot */}
                                    <div>
                                        <label htmlFor="lot" className="block text-sm font-medium">
                                            Lot
                                        </label>
                                        <input
                                            type="text"
                                            id="lot"
                                            name="lot"
                                            value={data.lot}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>

                                    {/* Color Amount */}
                                    <div>
                                        <label htmlFor="colorAmount" className="block text-sm font-medium">
                                            Amount of Color
                                        </label>
                                        <input
                                            type="number"
                                            id="colorAmount"
                                            name="colorAmount"
                                            value={data.colorAmount}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                            processing ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {processing ? 'Saving...' : 'Save Mall Details'}
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
