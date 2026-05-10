import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function InvoiceForm() {
    const { data, setData, post, processing, errors } = useForm({
        partyName: '',
        previousBalance: '0',
        remarks: '',
        rows: [{
            lot: '',
            itemName: '',
            designNumber: '',
            shape: '',
            quantity: '',
            stitches: '',
            headLength: '',
            ratePerThousandStitch: '',
            rateValue: '',
            than: '1',
            rate: '',
        }]
    });

    const addNewRow = () => {
        setData('rows', [
            ...data.rows,
            {
                lot: '',
                itemName: '',
                designNumber: '',
                shape: '',
                quantity: '',
                stitches: '',
                headLength: '',
                ratePerThousandStitch: '',
                rateValue: '',
                than: '1',
                rate: '',
            }
        ]);
    };

    const removeRow = (index) => {
        const newRows = [...data.rows];
        newRows.splice(index, 1);
        setData('rows', newRows);
    };

    const updateRowField = (index, field, value) => {
        const newRows = [...data.rows];
        newRows[index][field] = value;
        
        if (field === 'stitches' || field === 'ratePerThousandStitch') {
            const stitches = parseFloat(newRows[index].stitches) || 0;
            const rate = parseFloat(newRows[index].ratePerThousandStitch) || 0;
            const stitchesInThousands = stitches / 1000;
            const rateValue = (stitchesInThousands * rate).toFixed(2);
            newRows[index].rateValue = rateValue;
            newRows[index].rate = rate;
        }
        
        setData('rows', newRows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('invoice.store'), {
            onSuccess: () => {
                console.log('Success - form submitted');
            },
            onError: (errors) => {
                console.log('Errors:', errors);
            },
            preserveScroll: true
        });
    };

    const calculateRateValue = () => {
        const stitchesInThousands = parseFloat(data.stitches) / 1000;
        const ratePerThousand = parseFloat(data.ratePerThousandStitch);
        if (!isNaN(stitchesInThousands) && !isNaN(ratePerThousand)) {
            const value = (stitchesInThousands * ratePerThousand).toFixed(2);
            setData('rateValue', value);
            setData('rate', ratePerThousand); // Also set the rate field
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Party Name</label>
                        <input
                            type="text"
                            value={data.partyName}
                            onChange={e => setData('partyName', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Previous Balance</label>
                        <input
                            type="number"
                            value={data.previousBalance}
                            onChange={e => setData('previousBalance', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <input
                            type="text"
                            value={data.remarks}
                            onChange={e => setData('remarks', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {data.rows.map((row, index) => (
                        <div key={index} className="border p-4 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Row {index + 1}</h3>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRow(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove Row
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Lot</label>
                                    <input
                                        type="text"
                                        value={row.lot}
                                        onChange={e => updateRowField(index, 'lot', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                    <input
                                        type="text"
                                        value={row.itemName}
                                        onChange={e => updateRowField(index, 'itemName', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Design #</label>
                                    <input
                                        type="text"
                                        value={row.designNumber}
                                        onChange={e => updateRowField(index, 'designNumber', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Shape</label>
                                    <input
                                        type="text"
                                        value={row.shape}
                                        onChange={e => updateRowField(index, 'shape', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={e => updateRowField(index, 'quantity', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stitches</label>
                                    <input
                                        type="number"
                                        value={row.stitches}
                                        onChange={e => updateRowField(index, 'stitches', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Head Length</label>
                                    <input
                                        type="number"
                                        value={row.headLength}
                                        onChange={e => updateRowField(index, 'headLength', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rate/1000 Stitch</label>
                                    <input
                                        type="number"
                                        value={row.ratePerThousandStitch}
                                        onChange={e => updateRowField(index, 'ratePerThousandStitch', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rate Value</label>
                                    <input
                                        type="text"
                                        value={row.rateValue}
                                        readOnly
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Than</label>
                                    <input
                                        type="number"
                                        value={row.than}
                                        onChange={e => updateRowField(index, 'than', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={addNewRow}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Add Another Row
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                    >
                        {processing ? 'Generating...' : 'Generate Invoice'}
                    </button>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                    >
                        {processing ? 'Generating...' : 'Generate Invoice'}
                    </button>
                </div>
            </form>
        </div>
    );
}