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
                {
                    reminders.length == 0 && (
                        // eslint-disable-next-line no-undef
                        <a href={route('reminder.form')}>
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 62 65" className="h-16 w-auto bg-gray-100 dark:bg-gray-900">
                                    <path
                                        fill="#FF2D20"
                                        d="M61.855 14.625c.023.085.035.173.035.26v13.676a.996.996 0 01-.501.866L49.91 36.035v13.099a1 1 0 01-.498.865l-23.96 13.793c-.055.03-.115.05-.175.072-.022.007-.043.021-.067.027a1.003 1.003 0 01-.51 0c-.028-.007-.053-.022-.08-.032-.054-.02-.112-.038-.164-.067L.501 49.999A.998.998 0 010 49.134V8.107c0-.09.012-.177.035-.262.007-.029.025-.055.035-.084.018-.052.036-.106.063-.154.02-.033.046-.059.069-.089.029-.04.055-.08.088-.116.03-.028.066-.05.099-.074.036-.03.068-.063.11-.087L12.478.346a1 1 0 01.997 0l11.978 6.897h.003c.04.024.073.056.11.084.032.025.068.048.097.075.034.036.06.077.09.117.02.03.05.056.067.089.028.05.044.102.064.154.01.029.028.055.035.085.023.085.035.173.035.26v25.626l9.981-5.748v-13.1c0-.087.013-.175.035-.259.01-.03.025-.056.035-.085.02-.052.038-.105.065-.154.019-.032.046-.059.068-.088.03-.04.054-.082.09-.116.028-.03.064-.05.096-.075.038-.03.07-.063.11-.086l11.98-6.897a.998.998 0 01.998 0l11.978 6.897c.042.025.075.056.112.084.031.025.067.048.096.075.035.037.06.078.09.117.022.03.05.057.067.089.029.049.045.102.065.155.011.028.027.054.035.084zm-1.962 13.36V16.611l-4.192 2.413-5.79 3.334v11.373l9.983-5.748h-.001zM47.915 48.556v-11.38l-5.696 3.253-16.266 9.283V61.2l21.962-12.643zM1.997 9.833v38.724l21.96 12.642V49.715l-11.473-6.493-.004-.003-.005-.002c-.038-.023-.07-.055-.107-.082-.03-.025-.067-.045-.095-.073l-.002-.003c-.032-.031-.055-.07-.082-.105-.025-.034-.055-.062-.075-.097l-.001-.004c-.023-.037-.036-.082-.053-.125-.016-.037-.037-.072-.047-.112-.012-.047-.015-.098-.02-.147-.005-.037-.015-.075-.015-.112V15.58l-5.79-3.335-4.191-2.412zm10.98-7.471l-9.98 5.745 9.978 5.744 9.98-5.746-9.98-5.743h.003zm5.19 35.852l5.79-3.333V9.833l-4.191 2.413-5.791 3.334v25.048l4.193-2.414zM48.914 9.14l-9.979 5.745 9.98 5.745 9.977-5.746-9.978-5.744zm-.998 13.218l-5.791-3.334-4.192-2.413v11.372l5.79 3.333 4.193 2.415V22.359zM24.953 47.987l14.637-8.356 7.316-4.175-9.97-5.742-11.482 6.61-10.463 6.024 9.962 5.639z"
                                    ></path>
                                </svg>
                            </div>
                            <div className='flex justify-center text-red-500 text-xl font-bold mt-4'>Remind Me</div>
                        </a>
                    )
                }
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
