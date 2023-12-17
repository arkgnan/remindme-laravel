import Card from '@/Components/Reminder/Card';
import getSession from '@/Helpers/session';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { React, useEffect, useState } from 'react';

export default function Dashboard() {
    const [reminders, setReminders] = useState([]);
    const urlString = window.location.href;
    const url = new URL(urlString);
    const limit = url.searchParams.get("limit") ?? 10;

    const getReminders = async (token) => {
        // eslint-disable-next-line no-undef
        const {data} = await axios.get(route('reminders.index')+'?limit='+limit, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (data.ok === true) {
            setReminders(data.data.reminders);
        }
    }
    async function checkCookie() {
        const token = await getSession();
        if (token) {
            getReminders(token);
        }
    }
    useEffect(() => {
        checkCookie();
    }, []);
    return (
        <AuthenticatedLayout>
            <Head title="Event Reminder" />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {
                            reminders?.map((reminder) => (
                                <Card
                                    // eslint-disable-next-line no-undef
                                    url={route('dashboard')+'/reminders/'+reminder.id}
                                    key={reminder.id}
                                    title={reminder.title}
                                    event_at={reminder.event_at}
                                >
                                    {`${reminder.description.substring(0, 250)}...`}
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
