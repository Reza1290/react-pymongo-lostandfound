import { useContext, useState } from "react"
import useAuth from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"

import React from "react"
import axios from "axios"



export default function AuthPage(){

    const {setAuth}:any = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [nama,setNama] = useState('')
    const [address,setAddress] = useState('')
    const [noTelp,setNoTelp] = useState('')
    const [birthDate,setBirtDate] = useState('')

    const [errorMsg, setErrorMsg] = useState('')


    const nav = useNavigate()
    async function handleSubmitLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            // Make API call to authenticate user
            const response = await axios.post('http://127.0.0.1:8080/login', {
                username:nama,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                // Authentication successful, handle accordingly (e.g., redirect)
                const authInfo = {
                    access_token : response.data.access_token
                }
                setAuth(authInfo);

                
                localStorage.setItem('access',response.data.access_token)
                nav('/list'); // Redirect to dashboard or another page
            } else {
                // Handle authentication failure
                setErrorMsg(response.data.message);
            }
        } catch (error:any) {
            console.error('Error during login:', error);
            setErrorMsg(error.response.data.message);
        }
    }

    
    async function handleSubmitRegister(e:any) {
        e.preventDefault()

        try {
            const response = await axios.post('http://127.0.0.1:8080/register', {
                username:nama,
                password,
                email,
                telephone:noTelp,
                address,
                birthdate:birthDate,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 201) {
                
                setErrorMsg('Success!')
            } else {
                
                setErrorMsg('Registration failed: '+ response.data.message)
            }
        } catch (error) {
            setErrorMsg('Registration Error! ')
        }
       
    }


    const [login, setLogin] = useState(true);

    const toggleAuthMode = () => {
      setLogin(!login);
      setErrorMsg('')
    };


    return(
        <div className="min-h-screen flex items-center justify-center border border-gray-200/20 rounded-xl text-gray-200">
        <div className="p-8 rounded w-96">
          <h2 className="text-2xl font-bold mb-4">
            {login ? 'Log In' : 'Register'}
          </h2>
          <h1 className="my-1 text-xs text-red-500">
                {
                    errorMsg && (
                        <>
                        {errorMsg}
                        </>
                    )
                }
          </h1>
          <form>
            

            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="nama">
                Username
              </label>
              <input
                className="w-full px-3 py-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800 "
                type="text"
                id="nama"
                placeholder="username"
                value={nama}
                onChange={(e) => {setNama(e.target.value)}}
              />
            </div>
            { !login && (
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800 "
                type="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800 "
                type="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
            { !login && (
                <>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                    Password
                    </label>
                    <input
                    className="w-full px-3 py-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800 "
                    type="password"
                    id="repassword"
                    placeholder="Your password again"
                    value={repassword}
                    onChange={(e) => {setRePassword(e.target.value)}}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                    Alamat
                    </label>
                    <input
                    className="w-full px-3 py-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800 "
                    type="text"
                    id="alamat"
                    placeholder="Alamat Lengkap"
                    value={address}
                    onChange={(e) => {setAddress(e.target.value)}}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                    No Telepon
                    </label>
                    <input
                    className="w-full px-3 py-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800 "
                    type="number"
                    id="telepon"
                    placeholder="Tanpa +"
                    value={noTelp}
                    onChange={(e) => {setNoTelp(e.target.value)}}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                    Tanggal Lahir
                    </label>
                    <input
                    className="w-full px-3 py-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800 "
                    type="date"
                    id="birth"
                    placeholder="yyyy-mm-dd"
                    value={birthDate}
                    onChange={(e) => {setBirtDate(e.target.value)}}
                    />
                </div>
                    </>
            )}

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
              onClick={login? handleSubmitLogin : handleSubmitRegister}
            >
              {login ? 'Log In' : 'Register'}
            </button>
          </form>
          <p className="mt-4 text-center">
            {login ? 'Don’t have an account? ' : 'Already have an account? '}
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={toggleAuthMode}
            >
              {login ? 'Register' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    )
}