// import { useState } from "react"
// import { BottomWarning } from "../components/BottomWarning"
// import { Button } from "../components/Button"
// import { Heading } from "../components/Heading"
// import { InputBox } from "../components/InputBox"
// import { SubHeading } from "../components/SubHeading"
// import axios from "axios";
// import { useNavigate } from "react-router-dom"

// export const Signup = () => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     return <div className="bg-slate-300 h-screen flex justify-center">
//     <div className="flex flex-col justify-center">
//       <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//         <Heading label={"Sign up"} />
//         <SubHeading label={"Enter your infromation to create an account"} />
//         <InputBox onChange={e => {
//           setFirstName(e.target.value);
//         }} placeholder="John" label={"First Name"} />
//         <InputBox onChange={(e) => {
//           setLastName(e.target.value);
//         }} placeholder="Doe" label={"Last Name"} />
//         <InputBox onChange={e => {
//           setUsername(e.target.value);
//         }} placeholder="harkirat@gmail.com" label={"Email"} />
//         <InputBox onChange={(e) => {
//           setPassword(e.target.value)
//         }} placeholder="123456" label={"Password"} />
//         <div className="pt-4">
//           <Button onClick={async () => {
//             const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
//               username,
//               firstName,
//               lastName,
//               password
//             });
//             localStorage.setItem("token", response.data.token)
//             navigate("/dashboard")
//           }} label={"Sign up"} />
//         </div>
//         <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
//       </div>
//     </div>
//   </div>
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        // Basic validation
        if (!firstName.trim()) {
            alert("Please enter your first name");
            return;
        }
        if (!lastName.trim()) {
            alert("Please enter your last name");
            return;
        }
        if (!username.trim()) {
            alert("Please enter your email");
            return;
        }
        if (!password.trim()) {
            alert("Please enter a password");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            
            const signupData = {
                username: username.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                password: password.trim()
            };
            
            console.log("Sending signup data:", signupData);

            const response = await axios.post("http://localhost:3000/api/v1/user/signup", signupData);

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
            
        } catch (error) {
            console.error("Signup error:", error.response?.data);
            
            if (error.response?.status === 411) {
                if (error.response.data.message.includes("Email already taken")) {
                    alert("This email is already registered. Please use a different email or try signing in.");
                } else {
                    alert("Please check your input format. Make sure all fields are filled correctly.");
                }
            } else {
                alert("Error while signing up: " + (error.response?.data?.message || "Something went wrong"));
            }
        } finally {
            setLoading(false);
        }
    };

    return <div className="bg-green-200 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox 
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John" 
                    label={"First Name"} 
                    value={firstName}
                />
                <InputBox 
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe" 
                    label={"Last Name"} 
                    value={lastName}
                />
                <InputBox 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="john@gmail.com" 
                    label={"Email"} 
                    value={username}
                />
                <InputBox 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password" 
                    label={"Password"}
                    type="password"
                    value={password}
                />
                <div className="pt-4">
                    <Button 
                        onClick={handleSignup} 
                        label={loading ? "Signing up..." : "Sign up"} 
                        disabled={loading}
                    />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}