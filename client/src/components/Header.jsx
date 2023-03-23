import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo_Arvato_Systems_Original_RGB.png";
import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

export default function Example() {
  //Props
  const [openNav, setOpenNav] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //On logout event
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  //useEffect
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "flex items-center px-4 -mb-1 border-b-2 border-transparent"
              : isActive
              ? "font-bold flex items-center px-4 -mb-1 border-b-2 border-blue-500"
              : "flex items-center px-4 -mb-1 border-b-2 border-transparent"
          }
          to="/"
        >
          Home
        </NavLink>
      </Typography>
      {user && user.role === "admin" ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center px-4 -mb-1 border-b-2 border-transparent"
                  : isActive
                  ? "font-bold flex items-center px-4 -mb-1 border-b-2 border-blue-500"
                  : "flex items-center px-4 -mb-1 border-b-2 border-transparent"
              }
              to="/create-resource"
            >
              Create resource
            </NavLink>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center px-4 -mb-1 border-b-2 border-transparent"
                  : isActive
                  ? "font-bold flex items-center px-4 -mb-1 border-b-2 border-blue-500"
                  : "flex items-center px-4 -mb-1 border-b-2 border-transparent"
              }
              to="/create-team"
            >
              Create team resource
            </NavLink>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex items-center px-4 -mb-1 border-b-2 border-transparent"
                  : isActive
                  ? "font-bold flex items-center px-4 -mb-1 border-b-2 border-blue-500"
                  : "flex items-center px-4 -mb-1 border-b-2 border-transparent"
              }
              to="/team-members"
            >
              Team members
            </NavLink>
          </Typography>
        </>
      ) : (
        <></>
      )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "flex items-center px-4 -mb-1 border-b-2 border-transparent"
              : isActive
              ? "font-bold flex items-center px-4 -mb-1 border-b-2 border-blue-500"
              : "flex items-center px-4 -mb-1 border-b-2 border-transparent"
          }
          to="/faq"
        >
          FAQ
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 mb-12">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
          onClick={() => navigate("/")}
        >
          <span>
            <img
              src={Logo}
              alt="Company logo"
              className="object-cover w-46 h-20"
            />
          </span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          onClick={onLogout}
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
        >
          <span>Logout</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button
            onClick={onLogout}
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
          >
            <span>Logout</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
