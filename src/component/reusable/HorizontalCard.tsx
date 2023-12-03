import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export function HorizontalCard({ props }: any) {
  const timestamp = new Date(props?.date)
  const date = timestamp.toISOString().split('T')[0]
  return (
    <div className="flex justify-center m-5">

      <div className="bg-gray-800/20 rounded-lg w-full">
        <div className="m-4 flex flex-col sm:flex-row gap-5">
          <div className="bg-cover max-h-32 bg-gray-200/20 rounded-lg">
            <img src="../hp.jpg" alt="" className="max-h-32 rounded-lg" />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-gray-200 sm:text-xl">
                {props?.item_name}
              </h1>
              <div className="flex gap-2 items-center">
                <div className="">
                  <a href={'/list/filter?='+ props?.status} className="bg-red-500 p-2 font-bold px-4 rounded-md text-white">{props?.status}</a>
                </div>
                <a href={"/list/item/" + props?.id} className="hidden sm:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 sm:w-9 sm:h-9 text-white bg-blue-500 rounded-md p-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 h-full">
              <p className="text-gray-300">{props?.description}</p>
              <div className="text-gray-300 text-sm">
                Ditemukan di{" "}
                <span className="bg-red-500 rounded-md px-10 mx-2">
                  {" "}
                  {props?.location}
                </span>
                Oleh {props?.user_info.username}, 
                <span className="">{' ' + date}</span>
              </div>
            </div>
            <div className="flex mt-5 sm:justify-end justify-between gap-2">
              <div className="block sm:hidden">
                <a
                  href={"/list/item/" + props.id}
                  className="font-bold text-gray-200 bg-blue-500 rounded-md px-10 p-2"
                >
                  Edit
                </a>
              </div>
              <div className="">
                <a
                  href="
                wa.me"
                  className="font-bold text-gray-200 bg-green-800 rounded-md px-10 p-2"
                >
                  Hubungi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
