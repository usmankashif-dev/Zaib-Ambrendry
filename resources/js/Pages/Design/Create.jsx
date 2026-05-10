import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth, mall }) {
    const { data, setData, post, errors, processing } = useForm({
        design_number: '',
        stitch_amount: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('design.store', { mall: mall.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add Design Details</h2>}
        >
            <Head title="Add Design" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Mall Details:
                                </h3>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    <p>Party Name: {mall.partyName}</p>
                                    <p>Gazana: {mall.gazana}</p>
                                    <p>Than Amount: {mall.thanAmount}</p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="design_number" value="Design Number" />
                                    <TextInput
                                        id="design_number"
                                        type="text"
                                        name="design_number"
                                        value={data.design_number}
                                        className="mt-1 block w-full"
                                        autoComplete="design_number"
                                        isFocused={true}
                                        onChange={e => setData('design_number', e.target.value)}
                                    />
                                    <InputError message={errors.design_number} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="stitch_amount" value="Stitch Amount" />
                                    <TextInput
                                        id="stitch_amount"
                                        type="number"
                                        name="stitch_amount"
                                        value={data.stitch_amount}
                                        className="mt-1 block w-full"
                                        autoComplete="stitch_amount"
                                        onChange={e => setData('stitch_amount', e.target.value)}
                                    />
                                    <InputError message={errors.stitch_amount} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Save Design
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
