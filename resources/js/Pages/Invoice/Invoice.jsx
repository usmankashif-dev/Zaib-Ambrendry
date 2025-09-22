import React from 'react';

export default function Invoice({ invoiceData }) {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Invoice</h1>
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600">Lot:</p>
                        <p className="font-medium">{invoiceData?.lot}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Item Name:</p>
                        <p className="font-medium">{invoiceData?.itemName}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Design #:</p>
                        <p className="font-medium">{invoiceData?.designNumber}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Shape:</p>
                        <p className="font-medium">{invoiceData?.shape}</p>
                    </div>
                </div>
            </div>

            <table className="min-w-full mb-8">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Stitches</th>
                        <th className="px-4 py-2 text-left">Head Length</th>
                        <th className="px-4 py-2 text-left">Rate/1000 Stitch</th>
                        <th className="px-4 py-2 text-left">Rate Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 border-b">{invoiceData?.quantity}</td>
                        <td className="px-4 py-2 border-b">{invoiceData?.stitches}</td>
                        <td className="px-4 py-2 border-b">{invoiceData?.headLength}</td>
                        <td className="px-4 py-2 border-b">{invoiceData?.ratePerThousandStitch}</td>
                        <td className="px-4 py-2 border-b">{invoiceData?.rateValue}</td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-end">
                <div className="w-64">
                    <div className="flex justify-between py-2">
                        <span className="font-medium">Total Value:</span>
                        <span className="font-bold">${invoiceData?.rateValue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}