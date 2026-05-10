import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { useState, useMemo } from 'react';

export default function ItemsHistory({ auth, items }) {
    const [expandedYears, setExpandedYears] = useState(new Set([new Date().getFullYear()]));
    const [expandedMonths, setExpandedMonths] = useState(new Set());

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PKR'
        }).format(price);
    };

    const toggleYear = (year) => {
        const newExpanded = new Set(expandedYears);
        if (newExpanded.has(year)) {
            newExpanded.delete(year);
        } else {
            newExpanded.add(year);
        }
        setExpandedYears(newExpanded);
    };

    const toggleMonth = (yearMonth) => {
        const newExpanded = new Set(expandedMonths);
        if (newExpanded.has(yearMonth)) {
            newExpanded.delete(yearMonth);
        } else {
            newExpanded.add(yearMonth);
        }
        setExpandedMonths(newExpanded);
    };

    const organizedItems = useMemo(() => {
        const organized = {};
        items.forEach(item => {
            const date = parseISO(item.date);
            const year = date.getFullYear();
            const month = date.getMonth();
            
            if (!organized[year]) {
                organized[year] = {};
            }
            if (!organized[year][month]) {
                organized[year][month] = [];
            }
            organized[year][month].push(item);
        });
        return organized;
    }, [items]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Items History</h2>}
        >
            <Head title="Items History" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Items History</h3>
                                <a 
                                    href={route('items.new')} 
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
                                >
                                    Add New Item
                                </a>
                            </div>

                            <div className="space-y-4">
                                {Object.entries(organizedItems)
                                    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                                    .map(([year, months]) => (
                                        <div key={year} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                                            <div
                                                className="bg-gray-100 dark:bg-gray-800 px-4 py-3 cursor-pointer flex items-center"
                                                onClick={() => toggleYear(Number(year))}
                                            >
                                                <svg
                                                    className={`h-5 w-5 transform transition-transform ${expandedYears.has(Number(year)) ? 'rotate-90' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Year {format(new Date(year, 0), 'yyyy')}</span>
                                            </div>
                                            
                                            {expandedYears.has(Number(year)) && (
                                                <div className="p-4 space-y-3">
                                                    {Object.entries(months)
                                                        .sort(([monthA], [monthB]) => Number(monthB) - Number(monthA))
                                                        .map(([month, monthItems]) => {
                                                            const yearMonth = `${year}-${month}`;
                                                            return (
                                                                <div key={month} className="border dark:border-gray-700 rounded-lg">
                                                                    <div
                                                                        className="bg-gray-50 dark:bg-gray-700 px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                                                        onClick={() => toggleMonth(yearMonth)}
                                                                    >
                                                                        <svg
                                                                            className={`h-4 w-4 transform transition-transform ${expandedMonths.has(yearMonth) ? 'rotate-90' : ''}`}
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                        </svg>
                                                                        <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                                                                            Year {format(new Date(year, month), 'yyyy - MMMM')}
                                                                        </span>
                                                                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                                            ({monthItems.length} items)
                                                                        </span>
                                                                    </div>

                                                                    {expandedMonths.has(yearMonth) && (
                                                                        <div className="overflow-x-auto">
                                                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                                                <thead className="bg-gray-50 dark:bg-gray-700">
                                                                                    <tr>
                                                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item Name</th>
                                                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Shade</th>
                                                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                                                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Price</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                                                                                    {monthItems.map((item) => (
                                                                                        <tr key={item.id}>
                                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                                                {format(parseISO(item.date), 'MMM d, yyyy')}
                                                                                            </td>
                                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                                                {item.name}
                                                                                            </td>
                                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                                                {item.shade}
                                                                                            </td>
                                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                                                {item.quantity}
                                                                                            </td>
                                                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                                                {formatPrice(item.total_price)}
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                {Object.keys(organizedItems).length === 0 && (
                                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                        No items found. Start by adding a new item.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}