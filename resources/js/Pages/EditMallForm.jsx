import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EditMallForm({ mall }) {
    const { data, setData, patch, processing, errors } = useForm({
        partyName: mall.partyName,
        gazana: mall.gazana,
        thanAmount: mall.thanAmount,
        partyArrivalTime: mall.partyArrivalTime.split('T')[0], // Format date for input
        frontLength: mall.frontLength,
        backLength: mall.backLength,
        dupattaLength: mall.dupattaLength,
        lot: mall.lot,
        colorAmount: mall.colorAmount,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('mall.update', { mall: mall.id }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Mall Details
                </h2>
            }
        >
            <Head title="Edit Mall" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Party Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.partyName}
                                            onChange={(e) => setData('partyName', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.partyName && <div className="text-red-500">{errors.partyName}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Gazana
                                        </label>
                                        <input
                                            type="number"
                                            value={data.gazana}
                                            onChange={(e) => setData('gazana', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.gazana && <div className="text-red-500">{errors.gazana}</div>}
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Than Amount
                                        </label>
                                        <input
                                            type="number"
                                            value={data.thanAmount}
                                            onChange={(e) => setData('thanAmount', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.thanAmount && <div className="text-red-500">{errors.thanAmount}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Front
                                        </label>
                                        <input
                                            type="text"
                                            value={data.frontLength}
                                            onChange={(e) => setData('frontLength', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.frontLength && <div className="text-red-500">{errors.frontLength}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Back
                                        </label>
                                        <input
                                            type="text"
                                            value={data.backLength}
                                            onChange={(e) => setData('backLength', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.backLength && <div className="text-red-500">{errors.backLength}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Dupatta
                                        </label>
                                        <input
                                            type="text"
                                            value={data.dupattaLength}
                                            onChange={(e) => setData('dupattaLength', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.dupattaLength && <div className="text-red-500">{errors.dupattaLength}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Lot
                                        </label>
                                        <input
                                            type="text"
                                            value={data.lot}
                                            onChange={(e) => setData('lot', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.lot && <div className="text-red-500">{errors.lot}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Color Amount
                                        </label>
                                        <input
                                            type="number"
                                            value={data.colorAmount}
                                            onChange={(e) => setData('colorAmount', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.colorAmount && <div className="text-red-500">{errors.colorAmount}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Party Arrival Time
                                        </label>
                                        <input
                                            type="date"
                                            value={data.partyArrivalTime}
                                            onChange={(e) => setData('partyArrivalTime', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 sm:text-sm"
                                        />
                                        {errors.partyArrivalTime && <div className="text-red-500">{errors.partyArrivalTime}</div>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
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
