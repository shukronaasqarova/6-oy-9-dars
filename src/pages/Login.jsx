import React  from 'react';
import { Link } from 'react-router-dom';
import { useRef} from 'react';
import { useNavigate} from 'react-router-dom';

export default function Login() {  
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();


    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert("Username is not valid!");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'red';
            return false;
        }


        return true;
    }

    function handleRegister(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            "username": usernameRef.current.value,
            "password": passwordRef.current.value
        };

        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message == 'User Not found.' ||data.message == 'Invalid Password!' ){
                alert(data.message)
            }

            if(data.id){
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem("user",JSON.stringify(data))
                navigate('/')
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign In</h2>
                <input className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-all duration-200 placeholder-gray-400" ref={usernameRef} type="text" placeholder="Enter username" autoComplete="current-username" />
                <input className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-all duration-200 placeholder-gray-400" ref={passwordRef} type="password" placeholder="Enter password" autoComplete="current-password"/>
                <button onClick={handleRegister} className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-all duration-200 w-full font-semibold">LOGIN</button>

                <Link to="/register" className="text-indigo-600 text-center mt-4 hover:underline transition-all duration-200">Registerga o'tish</Link>

            </form>
        </div>
    );
}
