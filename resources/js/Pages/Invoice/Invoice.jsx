import React from 'react';

export default function Invoice({ invoiceData }) {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
    return (
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 shadow p-4 text-sm font-sans print:shadow-none print:border-none">
            {/* Header */}
            <div className="border-b pb-2">
                <div className="text-center mb-2">
                    <h1 className="text-4xl">Zaib Embroidery</h1>
;
                    <p className="text-xs mt-1">Nishat Abad near Total pump 
Faisalabad</p>
                    <p className="text-xs">Phone(s): +92 322 7832249</p>
                </div>
                
                <div className="text-center mb-3">
                    <span className="border-2 px-6 py-1 rounded text-blue-600 font-semibold text-sm">
                        Sales Invoice
                    </span>
                </div>

                <div className="flex justify-between items-start px-2">
                    <div>
                        <p className="text-xs">INVOICE NO: <span className="font-semibold">{invoiceData.invoiceNo || '-'}</span></p>
                        <p className="text-xs mt-1">PARTY NAME: <span className="font-semibold">{invoiceData.partyName || '-'}</span></p>
                    </div>
                    <div>
                        <p className="text-xs">DATE: <span className="font-semibold">{currentDate}</span></p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <table className="w-full border border-collapse text-xs">
                <thead>
                    <tr className="bg-gray-100 text-center print:bg-gray-100">
                        <th className="border p-0.5">Lot</th>
                        <th className="border p-0.5">Item Name</th>
                        <th className="border p-0.5">Design #</th>
                        <th className="border p-0.5">Shape</th>
                        <th className="border p-0.5">Than</th>
                        <th className="border p-0.5">Qty</th>
                        <th className="border p-0.5">Stitches</th>
                        <th className="border p-0.5">Head Length</th>
                        <th className="border p-0.5">Rate/1000</th>
                        <th className="border p-0.5">Rate</th>
                        <th className="border p-0.5">Value</th>
                    </tr>
                </thead>
                <tbody>
          {/* Data rows */}
          {invoiceData?.rows.map((row, index) => (
            <tr key={index} className="text-center h-7">
              <td className="border p-1">{row?.lot || ''}</td>
              <td className="border p-1">{row?.itemName || ''}</td>
              <td className="border p-1">{row?.designNumber || ''}</td>
              <td className="border p-1">{row?.shape || ''}</td>
              <td className="border p-1">{row?.than || ''}</td>
              <td className="border p-1">{row?.quantity || ''}</td>
              <td className="border p-1">{row?.stitches ? Number(row.stitches).toLocaleString() : ''}</td>
              <td className="border p-1">{row?.headLength ? Number(row.headLength).toFixed(2) : ''}</td>
              <td className="border p-1">{row?.ratePerThousandStitch ? Number(row.ratePerThousandStitch).toFixed(2) : ''}</td>
              <td className="border p-1">{row?.rate ? Number(row.rate).toFixed(2) : ''}</td>
              <td className="border p-1">{row?.rateValue ? Number(row.rateValue).toFixed(2) : ''}</td>
            </tr>
          ))}
          {/* Empty rows to fill up to 20 */}
          {Array.from({ length: Math.max(0, 20 - (invoiceData?.rows?.length || 0)) }).map((_, index) => (
            <tr key={index} className="text-center h-7">
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
              <td className="border p-1">&nbsp;</td>
            </tr>
          ))}                    {/* Total */}
                    <tr className="text-center font-semibold">
                        <td colSpan={4} className="border p-1 text-right">Total</td>
                        <td className="border p-1">
                            {invoiceData?.rows?.reduce((sum, row) => sum + Number(row.than || 0), 0)}
                        </td>
                        <td className="border p-1">
                            {invoiceData?.rows?.reduce((sum, row) => sum + Number(row.quantity || 0), 0)}
                        </td>
                        <td colSpan={4} className="border p-1"></td>
                        <td className="border p-1">
                            {invoiceData?.rows?.reduce((sum, row) => sum + Number(row.rateValue || 0), 0).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Remarks */}
            <div className="mt-4 text-xs">
                <p>Remarks: <span className="font-semibold">{invoiceData.remarks || '-'}</span></p>
            </div>

            {/* Balance */}
            <div className="mt-4 text-xs">
                <p>Pre. Balance <span className="float-right">{invoiceData?.previousBalance ? Number(invoiceData.previousBalance).toFixed(2) : '0.00'}</span></p>
                <p>Current Bill: <span className="float-right">{invoiceData?.rateValue ? Number(invoiceData.rateValue).toFixed(2) : '0.00'}</span></p>
                <p className="font-semibold">Current Balance: <span className="float-right">
                    {invoiceData ? Number((invoiceData.previousBalance || 0) + Number(invoiceData.rateValue || 0)).toFixed(2) : '0.00'}
                </span></p>
            </div>

            {/* Signature */}
            <div className="flex justify-end mt-8">
                <div className="text-center">
                    <p className="underline">Signature</p>
                </div>
            </div>
    </div>
  )
}