import { HorizontalCard } from "../component/reusable/HorizontalCard";
import {useEffect, useState} from "react"
import axios from "axios"
import useAuth from "../hooks/useAuth";
import { IconButton } from "@material-tailwind/react";

export default function MainPage(){
    const [data, setData] = useState([]);
    const [err,setErrMsg] = useState('')
    const {auth}:any = useAuth()
    const token = auth?.access_token
    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const response = await axios.get('http://127.0.0.1:8080/lostfound',{
          headers: {
            Authorization: `Bearer ${token}`,
          }});
          setData(response.data);
        } catch (error) {
          setErrMsg('Login Lagi Dong :(')
        }
      };
      
      fetchData();
    }, []);

    return(
        <div className="relative">

        <div className="flex-col justify-center items-center p-4">
            <div className="flex justify-center m-10 text-xl font-medium">
                LIST BARANG HILANG DAN DITEMUKAN DALAM 24 JAM
                
            </div>
            {
                err && (<div className="text-center">{err}</div>)
            }
            <div className="mb-20">

                {data.map((entry, index) => (
                    <HorizontalCard key={index} props={entry} />
                    ))}
            </div>
            
            </div>
            <div className="absolute bottom-10 right-10  ">
                <IconButton size="lg" >
                    <a href="/list/add">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </a>
                </IconButton>
            </div>
        </div>
    )
}