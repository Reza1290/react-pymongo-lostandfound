import { HorizontalCard } from "../component/reusable/HorizontalCard";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export default function MainPage() {
  const [data, setData] = useState([]);
  const [err, setErrMsg] = useState("");
  const { auth }: any = useAuth();
  const token = auth?.access_token;
  const loc = useLocation();
  const path = loc.pathname;
  const [param] = useSearchParams();
  const params = param.get("filter");

  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/lostfound", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setErrMsg("Sesi Kamu Habis Login Lagi dong :(");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      <div className="flex-col justify-center items-center p-4">
        <div className="flex justify-center mt-10 text-xl font-medium bg-main w-full border border-gray-200/20 rounded-lg py-5  text-gray-200">
          <h1 className="text-2xl font-bold">
            LIST BARANG HILANG DAN DITEMUKAN
          </h1>
          <div className="absolute right-0">
            <div className="bg-red-500 rounded-md py-1 text-lg font-bold px-10 mt-8">
              24 JAM
            </div>
          </div>
        </div>

        <div className="h-16 mt-10 flex justify-between items-center">
          <div className="hover:rotate-[10deg]">
            <a
              href="
                  /list/add"
              className="bg-blue-400 py-2 px-10 rounded-lg text-gray-200 "
            >
              Tambahkan
            </a>
          </div>
          <div className="flex gap-5 font-bold">
            <a
              href="list"
              className={` ${
                params == null
                  ? "border-b-2 text-sky-500 border-sky-500"
                  : "text-gray-200 hover:border-b-2 "
              }`}
            >
              Semua
            </a>
            <a
              href="list?filter=lost"
              className={` ${
                params == "lost"
                  ? "border-b-2 text-sky-500 border-sky-500"
                  : "text-gray-200 hover:border-b-2 "
              }`}
            >
              Lost
            </a>
            <a
              href="list?filter=found"
              className={` ${
                params == "found"
                  ? "border-b-2 text-sky-500 border-sky-500"
                  : "text-gray-200 hover:border-b-2 "
              }`}
            >
              Found
            </a>
          </div>
        </div>
        {err && (
          <div className="text-center bg-red-500 rounded-lg px-10 py-2 text-gray-200 mt-10">
            {err}
          </div>
        )}
        <div className="mb-20 mt-10">
          {data.map(
            (entry:any, index) =>
              (entry.status === params || params == null) && (
                <HorizontalCard key={index} props={entry} />
              )
          )}
        </div>
      </div>
    </div>
  );
}
