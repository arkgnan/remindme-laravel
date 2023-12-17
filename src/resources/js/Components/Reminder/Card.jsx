/* eslint-disable react/prop-types */
import { DateTime } from "luxon";
import { React } from 'react';

export default function Checkbox({ className = '', ...props }) {
    const event_at = DateTime.fromSeconds(props.event_at).toISO();
    return (
        <a
            href={props.url}
            className={
            'scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500 justify-between' +
                className
            }
        >
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {props.title}
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {props.children}
                </p>
                <div className="mt-4 bg-red-50 dark:bg-red-800/20 rounded py-1 px-2 text-red-500">
                    {DateTime.fromISO(event_at).toLocaleString({
                        month: 'long',
                        year: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        inute: '2-digit',
                        weekday: 'long'
                    })}
                </div>
            </div>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
            </svg>
        </a>
    );
}
