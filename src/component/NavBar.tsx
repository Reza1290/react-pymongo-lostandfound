import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import useAuth from "../hooks/useAuth";

const navListMenuItems = [
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
    ke: "/about",
  },
  {
    title: "Services",
    description: "Apa Tujuan Website?",
    icon: SunIcon,
    ke: "/service",
  },
  {
    title: "Terbaru",
    description: "Buka Informasi Terbaru Tentang Barang Hilang dan Ditemukan",
    icon: NewspaperIcon,
    ke: "/list",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, ke }, key) => (
      <a href={ke} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export function NavbarWithMegaMenu(props:any) {
  const { auth, setAuth }: any = useAuth();

  const nav = useNavigate();
  const path = useLocation();
  const login = props.login
  
  const logout = () => {
    setAuth({})
    localStorage.removeItem('access')
    nav('/')
  }

  return path?.pathname != "/login" ? (
    <main className="py-10 ">
      <nav className="mx-auto max-w-[56rem] py-2 my-2 rounded-lg w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-gray-200 text-3xl font-bold">HilangTemu</h1>
          </div>
          <div className="">
            {!login ? (
              <a
                href="/login"
                className="cursor-pointer	 bg-blue-400 p-1.5 rounded-md px-5 text-gray-200"
              >
                Login
              </a>
            ) : (
              <a
                onClick={logout}
                className="cursor-pointer	 bg-gray-800 p-1.5 rounded-md px-5 text-gray-200"
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
      <footer className="mx-auto max-w-[56rem] py-2 my-2 rounded-lg w-full mt-20">
        <div className="flex flex-col ">
          <div className="group relative overflow-hidden bg-no-repeat bg-cover h-16 rounded-2xl bg-main border-gray-200/20 border">
            <img
              src="../purple.png"
              className=" -right-4 absolute h-64 group-hover -top-20 group-hover:h-max group-hover:-top-[200px] transition-scale duration-700 delay-800 ease-out-in"
              alt="Louvre"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden opacity-0 transition duration-700 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-50"></div>
          </div>
          <div className="flex text-white gap-4 justify-center mt-5">
            <div>
              <a href="">Home</a>
            </div>
            <div>
              <a href="">List</a>
            </div>
            <div>
              <a href="">Github</a>
            </div>
          </div>
          <div className="flex text-gray-400 gap-4 justify-center mt-2 text-sm">
            Created with ❤️ By Reza1290
          </div>
        </div>
      </footer>
    </main>
  ) : (
    <></>
  );
}
