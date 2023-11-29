


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
    const [status,setStatus] = useState('found')
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
        <div className="flex-col md:w-[40%] items-center sm:mx-auto mx-2 p-10 border-2 rounded-md mt-10 mb-5 border-black ">
            <div className="text-center mb-5">
                INSERT
            </div>
            <div className="my-2">
                <Input crossOrigin='' label="Item Name"  onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className="my-2">
                <Input crossOrigin='' label="Location"  onChange={(e) => {setLoc(e.target.value)}} />
            </div>
            <div className="my-2">
                    <Textarea label="Message"  onChange={(e) => {setDesc(e.target.value)}}/>
            </div>
            <div className="my-2">
                <Input crossOrigin='' type="date" label="Location"  onChange={(e) => {setTanggal(e.target.value)}} />
            </div>
            <div className="my-2">
            <Select label="Kategori" variant="outlined">
                <Option  onSelect={(e) => {setStatus('found')}}>FOUND</Option>
                <Option  onSelect={(e) => {setStatus('lost')}}>LOST</Option>
            </Select>
            </div>
            <div className="mt-8 flex justify-between">
                <Button color="blue" className="rounded-md" onClick={insertData}>ADD</Button>
                
            </div>
        </div>
    )
}