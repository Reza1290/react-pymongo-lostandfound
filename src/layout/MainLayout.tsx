import { NavbarWithMegaMenu } from "../component/NavBar";
import { Outlet } from "react-router-dom"
import {useLocation} from 'react-router-dom'

import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
  } from "@material-tailwind/react";

export default function MainLayout(isAuth:any) {
    const path = useLocation()
    return (
        <>
            <NavbarWithMegaMenu login={isAuth}/>
            
            <Outlet/>
            {
                path.pathname == '/' && (
                    <div className="flex-col md:w-[40%] items-center sm:mx-auto">
                        <div className="pt-20">
                        <div className="w-[32rem]">
                            <Timeline>
                                <TimelineItem>
                                <TimelineConnector />
                                <TimelineHeader className="h-3">
                                    <TimelineIcon />
                                    <Typography variant="h6" color="blue-gray" className="leading-none">
                                    Tambahkan Barang.
                                    </Typography>
                                </TimelineHeader>
                                <TimelineBody className="pb-8">
                                    <Typography variant="small"  className="font-normal text-gray-600">
                                    Tambahkan Barang Yang anda temukan atau disaat anda kehilangan barang, masukkan nama barang detail
                                    lokasi anda menemukan barang dan tanggal ditemukannya!
                                    </Typography>
                                </TimelineBody>
                                </TimelineItem>
                                <TimelineItem>
                                <TimelineConnector />
                                <TimelineHeader className="h-3">
                                    <TimelineIcon />
                                    <Typography variant="h6" color="blue-gray" className="leading-none">
                                    Listing Barang.
                                    </Typography>
                                </TimelineHeader>
                                <TimelineBody className="pb-8">
                                    <Typography variant="small" className="font-normal text-gray-600">
                                    Barang yang Hiland dan ditemukan terdapat pada menu Resources - Terbaru disana anda dapat menemukan barang 
                                    yang Hilang atau Ditemukan
                                    </Typography>
                                </TimelineBody>
                                </TimelineItem>
                                <TimelineItem>
                                <TimelineHeader className="h-3">
                                    <TimelineIcon />
                                    <Typography variant="h6" color="blue-gray" className="leading-none">
                                    Terhapus dalam 24Jam.
                                    </Typography>
                                </TimelineHeader>
                                <TimelineBody>
                                    <Typography variant="small"  className="font-normal text-gray-600">
                                    Listing barang akan otomatis terhapus dalam kurun waktu 24 JAM Terhitung saat Pertama kali
                                    memposting barang dan mengedit
                                    </Typography>
                                </TimelineBody>
                                </TimelineItem>
                            </Timeline>
                            </div>      
                        </div>
                    </div>
                )
            }
        </>
    )
}