/* eslint-disable no-undef */
import axios from "axios";
import Cookies from "js-cookie";
import { DateTime } from "luxon";

export default async function getSession() {
    const isLoggedIn = !!Cookies.get("isLoggedIn");
    if (isLoggedIn) {
        const isAuthenticated = !!Cookies.get("authExpiration");
        if (!isAuthenticated) {
            return await refreshToken();
        } else {
            return Cookies.get("access_token");
        }
    } else {
        window.location.href = route("login");
    }
}

async function refreshToken() {
    const token = await Cookies.get("refresh_token");
    const { data } = await axios.put(route("refresh.token"), {}, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    if (data.ok === true) {
        const response = data.data;
        const dt = DateTime.now();
        Cookies.set("authExpiration", 1, {
            expires: dt.plus({ seconds: 20 }).toJSDate(),
        });
        Cookies.set("access_token", response.access_token);
        return response.access_token;
    }
}
