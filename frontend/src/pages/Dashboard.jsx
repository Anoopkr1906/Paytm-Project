import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        // Fetch user data
        axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            setUser(response.data.user);
        })
        .catch(error => {
            console.error("Failed to fetch user:", error);
        });

        // Fetch balance
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error("Failed to fetch balance:", error);
        });
    }, []);

    return <div className="min-h-screen bg-green-100">
        <Appbar user={user} />
        <div className="m-8">
            <Balance value={parseFloat(balance).toFixed(2)} />
            <Users />
        </div>
    </div>
}