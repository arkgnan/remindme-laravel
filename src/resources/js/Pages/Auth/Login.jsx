/* eslint-disable no-undef */
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DateTime } from "luxon";
import { React, useEffect, useState } from 'react';

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const isAuthenticated = !!Cookies.get('isLoggedIn');
    if (isAuthenticated) {
        window.location.href = route('dashboard');
    }

    useEffect(() => {
        return () => {
            setData((prevState) => ({
                ...prevState,
                password: ''
            }))
        };
    }, []);

    const submit = (e) => {
        setLoading(true);
        setError(false);
        e.preventDefault();
        const userData = {
            email: data.email,
            password: data.password
        };
        axios.post(route('generate.token'), JSON.stringify(userData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 200 && response.data.ok === true) {
                    const result = response.data.data;
                    const dt = DateTime.now();
                    Cookies.set('authExpiration', 1, { expires: dt.plus({seconds: 20}).toJSDate() });
                    Cookies.set('access_token', result.access_token);
                    Cookies.set('refresh_token', result.refresh_token);
                    Cookies.set('isLoggedIn', 1);
                    localStorage.setItem('user', JSON.stringify(result.user));
                } else {
                    setError(response.data.msg);
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {error && <div className="mb-4 font-medium text-sm text-red-600">{error}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData((prevState) => ({
                            ...prevState,
                            email: e.target.value
                        }))}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData((prevState) => ({
                            ...prevState,
                            password: e.target.value
                        }))}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={loading}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
