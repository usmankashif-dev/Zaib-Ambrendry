import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import axios from 'axios';

export default function NewItem({ auth, itemNames }) {
    const [showNewNameInput, setShowNewNameInput] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [availableNames, setAvailableNames] = useState(itemNames || []);
    const { data, setData, post, processing, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        name: '',
        shade: '',
        quantity: '',
        total_price: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('items.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">New Item</h2>}
        >
            <Head title="New Item" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="mb-4 text-lg font-medium">Add New Item</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                                <div>
                                    <InputLabel htmlFor="date" value="Date" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="name" value="Item Name" />
                                    {!showNewNameInput ? (
                                        <div className="flex gap-2">
                                            <select
                                                id="name"
                                                value={data.name}
                                                onChange={e => {
                                                    if (e.target.value === '+') {
                                                        setShowNewNameInput(true);
                                                    } else {
                                                        setData('name', e.target.value);
                                                    }
                                                }}
                                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                                required
                                            >
                                                <option value="">Select an item</option>
                                                {availableNames.map((item) => (
                                                    <option key={item.id} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                                <option value="+">+ Add new item</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 items-start mt-1">
                                            <TextInput
                                                type="text"
                                                value={newItemName}
                                                onChange={e => setNewItemName(e.target.value)}
                                                className="block w-full"
                                                placeholder="Enter new item name"
                                            />
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (newItemName.trim()) {
                                                        try {
                                                            const response = await axios.post('/api/item-names', {
                                                                name: newItemName.trim()
                                                            });
                                                            setAvailableNames([...availableNames, response.data]);
                                                            setData('name', newItemName.trim());
                                                            setNewItemName('');
                                                            setShowNewNameInput(false);
                                                        } catch (error) {
                                                            console.error('Failed to add new item name:', error);
                                                        }
                                                    }
                                                }}
                                                className="px-3 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-500 dark:hover:bg-green-600 transition-colors"
                                            >
                                                Add
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowNewNameInput(false);
                                                    setNewItemName('');
                                                }}
                                                className="px-3 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-md hover:bg-gray-500 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="shade" value="Shade" />
                                    <TextInput
                                        id="shade"
                                        type="text"
                                        value={data.shade}
                                        onChange={e => setData('shade', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.shade} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="quantity" value="Quantity" />
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        value={data.quantity}
                                        onChange={e => setData('quantity', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                        min="1"
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="total_price" value="Total Price" />
                                    <TextInput
                                        id="total_price"
                                        type="number"
                                        step="0.01"
                                        value={data.total_price}
                                        onChange={e => setData('total_price', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                        min="0"
                                    />
                                    <InputError message={errors.total_price} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Add Item
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}