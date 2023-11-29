import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function HorizontalCard({props}:any) {
    return (
      <div className="flex justify-center m-5">
      <Card className="w-full max-w-[48rem] flex-row shadow-none border-2 border-black">
        <CardBody className="w-full">
          <Typography variant="h6" color="gray" className="mb-4 uppercase flex justify-between ">
            <div>
              {props?.user_info.username}
            </div>
            <div className="flex items-center">
            <div className="border-2 border-black rounded-md p-2 text-xs bg-red-400 text-gray-200">
              {props?.location}
            </div>
            <a href={'/list/item/'+props.id} className="p-1 mx-2 border-2 border-black rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </a>
            </div>
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {props?.item_name}
          </Typography>
          <Typography color="gray" className="mb-2 font-normal">
            {props?.description}
          </Typography>
          <a href={`https://wa.me/${props?.user_info.telephone}`} className="bg-green-400 rounded-md border-2 border-black p-2 flex items-center text-white gap-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
            Chat 
          </a>
        </CardBody>
      </Card>
      </div>
    );
  }