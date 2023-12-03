import {
  input,
  Textarea,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";

import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import axios from "axios";
import useAuth from "../hooks/useAuth";
export default function EditForm() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const params = useParams();

  const [data, setData]: any = useState({});

  const [err, setErrMsg] = useState("");
  const [item_name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [location, setLoc] = useState("");
  const [date, setTanggal] = useState("");
  const [status, setStatus] = useState("");
  const { auth }: any = useAuth();
  const nav = useNavigate();
  const token = auth?.access_token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/lostfound/" + params.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          const timestamp = new Date(response.data.data?.date);
          const waktu = timestamp.toISOString().split("T")[0];
          console.log(response.data.data.date);
          setData(response.data.data);
          setName(response.data.data.item_name);
          setTanggal(waktu);
          setDesc(response.data.data.description);
          setLoc(response.data.data.location);
          setStatus(response.data.data.status);
        }
      } catch (error: any) {
        setErrMsg("Not Yours :(");
        if (error.response.status == 403) {
          nav(-1);
        }
      }
    };

    fetchData();
  }, []);

  const updateData = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8080/lostfound/" + params.id,
        {
          item_name,
          description,
          date,
          location,
          status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Berhasil!");
      nav(-1);
    } catch (error: any) {
      setErrMsg("ERRNO");
      alert("gagal");
      console.error(error);
      if (error?.data.response?.status == 403) {
        nav(-1);
      }
    }
  };

  const deleteData = async () => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:8080/lostfound/" + params.id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Berhasil!");
      nav(-1);
      handleOpen();
    } catch (error) {
      console.error(error);
      alert("GAGAL!");
    }
  };

  return (
    <div className="bg-main flex-col md:w-[50%] items-center sm:mx-auto mx-2 p-10 rounded-md mt-10 mb-5 border-gray-200/20 border ">
      <div className="text-center mb-5 text-3xl font-bold text-gray-200">
        Edit
      </div>
      <div className="my-2">
        <label className="text-gray-200">Nama Barang</label>
        <input
          className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 "
          defaultValue={data.item_name || ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="my-2">
        <label className="text-gray-200">Lokasi</label>
        <input
          className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 "
          defaultValue={data.location || ""}
          onChange={(e) => {
            setLoc(e.target.value);
          }}
        />
      </div>
      <div className="my-2">
        <label className="text-gray-200">Deskripsi</label>
        <textarea
          className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 "
          defaultValue={data.description}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="my-2">
        <label className="text-gray-200">Tanggal Kejadian</label>
        <input
          type="date"
          className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 "
          defaultValue={date || ""}
          onChange={(e) => {
            setTanggal(e.target.value);
          }}
        />
      </div>
      <div className="my-2">
        <label className="text-gray-200">Kategori</label>
        <select
          value={status}
          className="w-full rounded-md p-1 bg-gray-800 border border-gray-200/20 text-gray-200 "
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value={"lost"}>LOST</option>
          <option value={"found"}>FOUND</option>
        </select>
      </div>
      <div className="mt-8 flex justify-between">
        <button
          className="rounded-md p-1 px-4 bg-blue-500 text-white font-bold"
          onClick={updateData}
        >
          EDIT
        </button>
        <div>
          <button
            onClick={handleOpen}
            className="rounded-md bg-red-500 p-1 px-4 text-white font-bold"
          >
            DELETE
          </button>
          
            <Dialog open={open} handler={handleOpen} className="w-64 absolute top-[30%] left-[30%]  sm:left-[45%] flex flex-col justify-center">
              <DialogHeader>Delete ?</DialogHeader>
              <DialogBody>Delete Bersifat Permanen Yakin Delete?</DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1 border-2 p-2 text-xl bg-black text-white font-bold"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="red" onClick={deleteData}
                className="mr-1 border-2 p-2 text-xl bg-red-500 text-white font-bold"
                >
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          
        </div>
      </div>
    </div>
  );
}
