export default function Invoice() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 shadow p-6 text-sm font-sans">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h1 className="text-xl font-bold">Zaib Embroidery</h1>
          <p className="text-xs">Nishat Abad near Total pump 
Faisalabad</p>
          <p className="text-xs">Phone(s): +92 322 7832249</p>
        </div>
        <div className="text-right">
          <span className="border px-3 py-1 rounded text-blue-600 font-semibold text-sm">
            Sales Invoice
          </span>
          <p className="mt-4 text-xs">DATE: <span className="font-semibold">14-Dec-2019</span></p>
        </div>
      </div>

      {/* Invoice + Party */}
      <div className="flex justify-between mt-2 mb-4">
        <p className="text-xs">INVOICE NO: <span className="font-semibold">1159</span></p>
        <p className="text-xs">PARTY NAME: <span className="font-semibold">SHERAZ DESIGNER</span></p>
      </div>

      {/* Table */}
      <table className="w-full border border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border p-1">Loth</th>
            <th className="border p-1">Item Name</th>
            <th className="border p-1">Design #</th>
            <th className="border p-1">Shape</th>
            <th className="border p-1">Than</th>
            <th className="border p-1">Qty</th>
            <th className="border p-1">Stitches</th>
            <th className="border p-1">Head Length</th>
            <th className="border p-1">Rate/1000 Stitch</th>
            <th className="border p-1">Rate</th>
            <th className="border p-1">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border p-1">0</td>
            <td className="border p-1">COLORED TISSUE</td>
            <td className="border p-1">SR-379</td>
            <td className="border p-1">GALA</td>
            <td className="border p-1">6</td>
            <td className="border p-1">84</td>
            <td className="border p-1">42,665</td>
            <td className="border p-1">0.00</td>
            <td className="border p-1">32.00</td>
            <td className="border p-1">2,688.00</td>
          </tr>
          <tr className="text-center">
            <td className="border p-1">0</td>
            <td className="border p-1">COLORED TISSUE</td>
            <td className="border p-1">SR-379</td>
            <td className="border p-1">LACE</td>
            <td className="border p-1">6</td>
            <td className="border p-1">84</td>
            <td className="border p-1">132,539</td>
            <td className="border p-1">0.05</td>
            <td className="border p-1">99.40</td>
            <td className="border p-1">8,350.00</td>
          </tr>
          <tr className="text-center">
            <td className="border p-1">0</td>
            <td className="border p-1">LILEN</td>
            <td className="border p-1">SR-379</td>
            <td className="border p-1">FRONT</td>
            <td className="border p-1">6</td>
            <td className="border p-1">108</td>
            <td className="border p-1">32,550</td>
            <td className="border p-1">2.77</td>
            <td className="border p-1">67.62</td>
            <td className="border p-1">7,303.00</td>
          </tr>
          <tr className="text-center">
            <td className="border p-1">0</td>
            <td className="border p-1">LILEN</td>
            <td className="border p-1">SR-379</td>
            <td className="border p-1">DOPATA MP</td>
            <td className="border p-1">6</td>
            <td className="border p-1">207</td>
            <td className="border p-1">5,042</td>
            <td className="border p-1">2.77</td>
            <td className="border p-1">10.47</td>
            <td className="border p-1">2,168.00</td>
          </tr>
         
          {/* Total */}
          <tr className="text-center font-semibold">
            <td colSpan={4} className="border p-1 text-right">Total</td>
            <td className="border p-1">24</td>
            <td className="border p-1">483</td>
            <td colSpan={4} className="border p-1"></td>
            <td className="border p-1">20,509.00</td>
          </tr>
        </tbody>
      </table>

      {/* Remarks */}
      <div className="mt-4 text-xs">
        <p>Remarks: <span className="font-semibold">84 SUIT TISSUE GALA DAMAN, FRONT</span></p>
      </div>

      {/* Balance */}
      <div className="mt-4 text-xs">
        <p>Pre. Balance <span className="float-right">0.00</span></p>
        <p>Current Bill: <span className="float-right">20,509.00</span></p>
        <p className="font-semibold">Current Balance: <span className="float-right">20,509.00</span></p>
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