


import { Input , Textarea, Select, Option, Button} from "@material-tailwind/react";

import {Routes,Route,useParams,useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react"

import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import axios from 'axios'
import useAuth from "../hooks/useAuth";
export default function InsertPage() {
    const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

    const params = useParams();

    const [data, setData]:any = useState({});


    const [err,setErrMsg] = useState('')
    const [item_name,setName] = useState('')
    const [description,setDesc] = useState('')
    const [location,setLoc] = useState('')
    const [date,setTanggal] = useState('')
    const [status,setStatus] = useState('')
    const {auth}:any = useAuth()
    const nav = useNavigate()
    const token = auth?.access_token
    
    useEffect(() => {
        // window.location.reload();
    }, [])
    

    const insertData = async () => {
        try{
            const response = await axios.post('http://127.0.0.1:8080/lostfound', {
                item_name,
                description,
                date,
                location,
                status,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`
                },
            });
            
            alert('Berhasil!')
            nav(-1)

        }catch(error:any){
            setErrMsg('ERRNO')
            alert('gagal')
            console.error(error)
            if(error.response?.status == 403){
                    nav(-1)
            }
        }
    }

    

    return(
        <div className="bg-main flex-col md:w-[50%] items-center sm:mx-auto mx-2 p-10 rounded-md mt-10 mb-5 border-gray-200/20 border ">
                <div className="text-center mb-5 text-3xl font-bold text-gray-200">
                Edit
            </div>
            <div className="my-2">
                <label className="text-gray-200">Nama Barang</label>
                <input className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 " defaultValue={data.item_name || ''} onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className="my-2">
                <label className="text-gray-200">Lokasi</label>
                <input className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 " defaultValue={data.location || ''} onChange={(e) => {setLoc(e.target.value)}} />
            </div>
            <div className="my-2">
            <label className="text-gray-200">Deskripsi</label>
                    <textarea className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 " defaultValue={data.description} onChange={(e) => {setDesc(e.target.value)}}></textarea>
            </div>
            <div className="my-2">
            <label className="text-gray-200">Tanggal Kejadian</label>
                <input type="date" className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 " defaultValue={date || ''} onChange={(e) => {setTanggal(e.target.value)}} />
            </div>
            <div className="my-2">
            <label className="text-gray-200">Kategori</label>
            <select value={status} className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 " onChange={(e) => {setStatus(e.target.value)}}>
                <option value={'lost'}>LOST</option>
                <option value={'found'}>FOUND</option>
            </select>
            </div>
            <div className="mt-8 flex justify-between">
                <button color="blue" className="rounded-md bg-blue-500 p-1 font-bold px-5 text-white" onClick={insertData}>ADD</button>
            </div>
        </div>
    )
}