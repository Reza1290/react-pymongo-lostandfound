import { NavbarWithMegaMenu } from "../component/NavBar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";

export default function MainLayout(isAuth: any) {
  const path = useLocation();
  return (
    <div className="">
      <div className="max-w-[56rem] mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}
