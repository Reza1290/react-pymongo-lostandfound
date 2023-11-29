
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
export default function EditForm() {
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
      const fetchData = async () => {
        try {
          
          const response = await axios.get('http://127.0.0.1:8080/lostfound/'+params.id,{
          headers: {
            Authorization: `Bearer ${token}`,
          }});

          if(response.status == 200){
            setData(response.data.data);
            setName(data.item_name)
            setDesc(data.description)
            setLoc(data.location)
            setStatus(data.status)
          }
          
        } catch (error:any) {
          setErrMsg('Not Yours :(')
            if(error.response.status == 403){
                    nav(-1)
            }
        }
      };
      
      fetchData();
    }, []);


    const updateData = async () => {
        try{
            const response = await axios.put('http://127.0.0.1:8080/lostfound/'+params.id, {
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
            if(error.response.status == 403){
                    nav(-1)
            }
        }
    }

    const deleteData = async () => {
        try{
            const response = await axios.delete('http://127.0.0.1:8080/lostfound/'+params.id, {
                headers: {
                    Authorization : `Bearer ${token}`
                },
            })

            alert('Berhasil!')
            nav(-1)
            handleOpen()
        }catch(error){
            console.error(error)
            alert('GAGAL!')

        }
    }

    return(
        <div className="flex-col md:w-[40%] items-center sm:mx-auto mx-2 p-10 border-2 rounded-md mt-10 mb-5 border-black ">
            <div className="text-center mb-5">
                Edit 
            </div>
            <div className="my-2">
                <Input crossOrigin='' label="Item Name" defaultValue={data.item_name || ''} onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className="my-2">
                <Input crossOrigin='' label="Location" defaultValue={data.location || ''} onChange={(e) => {setLoc(e.target.value)}} />
            </div>
            <div className="my-2">
                    <Textarea label="Message" defaultValue={data.description} onChange={(e) => {setDesc(e.target.value)}}/>
            </div>
            <div className="my-2">
                <Input crossOrigin='' type="date" label="Location" defaultValue={data.date || ''} onChange={(e) => {setTanggal(e.target.value)}} />
            </div>
            <div className="my-2">
            <Select label="Kategori" variant="outlined" onChange={(e) => {setStatus('found')}}>
                <Option defaultValue={'found'} >FOUND</Option>
                <Option defaultValue={'lost'}>LOST</Option>
            </Select>
            </div>
            <div className="mt-8 flex justify-between">
                <Button color="blue" className="rounded-md" onClick={updateData}>EDIT</Button>
                <div>
                <Button onClick={handleOpen} variant="gradient" className="rounded-md">
                    Delete
                </Button>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Delete?.</DialogHeader>
                    <DialogBody>
                    Delete Bersifat Permanen Yakin Delete?
                    </DialogBody>
                    <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1 border-2"
                        
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={deleteData}>
                        <span>Confirm</span>
                    </Button>
                    </DialogFooter>
                </Dialog>
                </div>
            </div>
        </div>
    )
}