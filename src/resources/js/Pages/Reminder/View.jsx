/* eslint-disable no-undef */
import getSession from '@/Helpers/session';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { DateTime } from "luxon";
import { React, useState } from 'react';

export default function ReminderView() {
    const [reminder, setReminder] = useState({});
    const urlString = window.location.href;
    const url = new URL(urlString);
    const [,, reminderId ] = url.pathname.split('/');
    const today = Math.floor(DateTime.now().toSeconds());

    const deleteReminder = async (id) => {
        const token = await getSession();
        const response = await axios.delete(route('reminders.destroy', id), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.data.ok === true) {
            window.location.href = route('dashboard');
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
            setReminder(data.data);
        }
    }
    async function checkCookie() {
        const token = await getSession();
        if (token) {
            getReminder(token);
        }
    }
    React.useEffect(() => {
        checkCookie();
    }, []);
    return (
        <AuthenticatedLayout>
            <Head title={`Remind me - ${reminder.title}`} />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div>
                    <div className="grid grid-cols-1 gap-6 lg:gap-8">
                        <div className='scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500 justify-between'>
                            <div className='w-full'>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {reminder.title}
                                </h2>
                                <div className="mt-1 mb-4 text-red-500">
                                    {DateTime.fromSeconds(parseInt(reminder.event_at)).toLocaleString({
                                        month: 'long',
                                        year: 'numeric',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        weekday: 'long'
                                    })}
                                </div>
                                <div className='text-gray-900 dark:text-white'>{reminder.description}</div>
                            </div>
                        </div>
                    </div>
                    {
                        reminder.remind_at > today && (
                            <div className="my-4 border py-1 px-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 text-sm">
                                You will get email notification at {DateTime.fromSeconds(parseInt(reminder.remind_at)).toLocaleString({
                                    month: 'long',
                                    year: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    weekday: 'long'
                                })}
                            </div>
                        )
                    }

                    <div className='flex justify-between items-center'>
                        <div className='w-24'>
                            <button className='bg-red-50 w-full dark:bg-red-800/20 rounded py-1 px-2 text-red-500' onClick={() => deleteReminder(reminderId)}>Delete</button>
                        </div>
                        <div className='mt-2 w-24'>
                            <div className='bg-yellow-50 w-full dark:bg-yellow-800/20 rounded py-1 px-2 text-center'>
                                <a className='text-yellow-500' href={route('reminder.form', reminderId)}>Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
