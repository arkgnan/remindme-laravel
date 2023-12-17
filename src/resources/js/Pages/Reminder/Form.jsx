/* eslint-disable no-undef */
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import getSession from '@/Helpers/session';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { DateTime } from "luxon";
import { React, useEffect, useState } from 'react';

export default function ReminderForm() {
    const [data, setData] = useState({
        title: '',
        description: '',
        remind_at: '',
        event_at: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const urlString = window.location.href;
    const url = new URL(urlString);
    const [,, reminderId ] = url.pathname.split('/');

    const dateToSecond = (e, propField = 'event_at') => {
        const timestamp = DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'HH:mm").toSeconds();
        if (propField == 'remind_at') {
            setData((prevState) => ({
                ...prevState,
                remind_at: timestamp
            }))
        } else {
            setData((prevState) => ({
                ...prevState,
                event_at: timestamp
            }))
        }

    }

    const getReminder = async (token) => {
        const {data} = await axios.get(route('reminders.show', reminderId), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (data.ok === true) {
            setData(data.data);
        }
    }

    async function checkCookie() {
        const token = await getSession();
        if (token && reminderId) {
            getReminder(token);
        }
    }

    useEffect(() => {
        checkCookie();
    }, []);

    const submit = async (e) => {
        setLoading(true);
        setError(false);
        e.preventDefault();
        const token = await getSession();
        if (reminderId) {
            const response = await axios.put(route('reminders.update', reminderId), JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.data.ok === true) {
                window.location.href = route('dashboard');
            } else {
                setError(response.data.msg)
            }
        } else {
            const response = await axios.post(route('reminders.store'), JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.data.ok === true) {
                window.location.href = route('dashboard');
            } else {
                setError(response.data.msg)
            }
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="Reminder Me" />
            <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
                <div className="w-full sm:max-w-lg mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                    {error && <div className="mb-4 font-medium text-sm text-red-600">{error}</div>}
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="title" value="title" />

                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData((prevState) => ({
                                    ...prevState,
                                    title: e.target.value
                                }))}
                                required
                            />
                        </div>
                        <div className='mt-4'>
                            <InputLabel htmlFor="description" value="description" />

                            <TextAreaInput
                                id="description"
                                name="description"
                                className="mt-1 block w-full"
                                onChange={(e) => setData((prevState) => ({
                                    ...prevState,
                                    description: e.target.value
                                }))}
                                required
                                value={data.description}
                            />
                        </div>
                        <div className='mt-4'>
                            <InputLabel htmlFor="remind_at" value="Remind At" />

                            <TextInput
                                id="remind_at"
                                name="remind_at"
                                value={data.remind_at && DateTime.fromSeconds(data.remind_at).toFormat("yyyy-MM-dd'T'HH:mm")}
                                type="datetime-local"
                                className="mt-1 block w-full"
                                onChange={(e) => dateToSecond(e, 'remind_at')}
                                required
                            />
                        </div>
                        <div className='mt-4'>
                            <InputLabel htmlFor="event_at" value="Event At" />

                            <TextInput
                                id="event_at"
                                name="event_at"
                                value={data.event_at && DateTime.fromSeconds(data.event_at).toFormat("yyyy-MM-dd'T'HH:mm")}
                                type="datetime-local"
                                className="mt-1 block w-full"
                                onChange={(e) => dateToSecond(e)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={loading}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}