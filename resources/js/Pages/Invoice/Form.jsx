import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function InvoiceForm() {
    const { data, setData, post } = useForm({
        lot: '',
        itemName: '',
        designNumber: '',
        shape: '',
        quantity: '',
        stitches: '',
        headLength: '',
        ratePerThousandStitch: '',
        rateValue: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/invoice', data);
    };

    const calculateRateValue = () => {
        const stitchesInThousands = parseFloat(data.stitches) / 1000;
        const rate = parseFloat(data.ratePerThousandStitch);
        if (!isNaN(stitchesInThousands) && !isNaN(rate)) {
            const value = (stitchesInThousands * rate).toFixed(2);
            setData('rateValue', value);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lot</label>
                        <input
                            type="text"
                            value={data.lot}
                            onChange={e => setData('lot', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Name</label>
                        <input
                            type="text"
                            value={data.itemName}
                            onChange={e => setData('itemName', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Design #</label>
                        <input
                            type="text"
                            value={data.designNumber}
                            onChange={e => setData('designNumber', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shape</label>
                        <input
                            type="text"
                            value={data.shape}
                            onChange={e => setData('shape', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stitches</label>
                        <input
                            type="number"
                            value={data.stitches}
                            onChange={e => {
                                setData('stitches', e.target.value);
                                calculateRateValue();
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Head Length</label>
                        <input
                            type="number"
                            value={data.headLength}
                            onChange={e => setData('headLength', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rate/1000 Stitch</label>
                        <input
                            type="number"
                            value={data.ratePerThousandStitch}
                            onChange={e => {
                                setData('ratePerThousandStitch', e.target.value);
                                calculateRateValue();
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rate Value</label>
                        <input
                            type="text"
                            value={data.rateValue}
                            readOnly
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Generate Invoice
                    </button>
                </div>
            </form>
        </div>
    );
}