import { useState, useEffect, ReactNode, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaUserCircle, FaSignOutAlt, FaTasks } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import logo from "../assets/laborly-logo.png";
import { IUser } from "@/types/auth";
import LogoutModal from "@/Components/modals/Logout";
import { BiSupport } from "react-icons/bi";
import useMediaQuery from "@mui/material/useMediaQuery";
import ClientHamMenu from "@/Components/common/ClientHamMenu";
import { useAppSelector, useAppThunkDispatch } from "@/redux/store";
import { getClientProfilePicture } from "@/redux/client/thunkActions";

const ClientLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(getClientProfilePicture(""));
  }, [dispatch]);
  const { clientProfilePicture } = useAppSelector(({ client }) => client);

  const user: IUser = useMemo(() => {
    return JSON.parse(localStorage.getItem(`user`) || "{}");
  }, []);

  // Handle screen size for collapsibility
  function useIsMediumUp() {
    const [isMediumUp, setIsMediumUp] = useState(window.innerWidth >= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMediumUp(window.innerWidth >= 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMediumUp;
  }

  const isMediumUp = useIsMediumUp();

  // Collapsed state management based on screen size
  useEffect(() => {
    setCollapsed(!isMediumUp);
  }, [isMediumUp]);
  const location = useLocation();
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    setLogout(!logout);
  };

  const SidebarLink = ({
    to,
    icon,
    label,
  }: {
    to: string;
    icon: ReactNode;
    label: string;
  }) => {
    const isActive = location.pathname === to;

    return (
      <MenuItem
        icon={icon}
        className="relative group"
        onClick={() => {
          navigate(to);
          if (window.innerWidth < 768) setCollapsed(true);
        }}
      >
        {!collapsed ? (
          <span
            className={`text-sm ${
              isActive ? "text-primary font-semibold" : ""
            }`}
          >
            {label}
          </span>
        ) : (
          <span
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap 
                        bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 z-50"
          >
            {label}
          </span>
        )}
      </MenuItem>
    );
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      {isDesktop && (
        <Sidebar
          collapsed={collapsed}
          onMouseEnter={() => isMediumUp && setCollapsed(false)}
          onMouseLeave={() => isMediumUp && setCollapsed(true)}
          className={`bg-white soft-shadow text-darkPrimary transition-all duration-300 
                ${collapsed ? "w-10" : isMediumUp ? "w-[250px]" : "w-[80px]"} 
                fixed md:relative z-30 h-full overflow-hidden`}
        >
          <div className="mt-4 py-3">
            <img
              src={logo}
              alt="Laborly Logo"
              className="w-[80%] sm:w-full max-w-[100px] mx-auto"
            />
          </div>

          <div className="rounded-full w-16 h-16 mx-auto">
            <Avatar className="w-full h-full">
              <AvatarImage src={clientProfilePicture} alt="pic" />
              <AvatarFallback className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {user.first_name?.charAt(0)}
                {user.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Menu Items */}
          <Menu className="text-sm overflow-hidden">
            <SidebarLink
              to="/client/dashboard"
              icon={<HiHome />}
              label="Home"
            />
            <SidebarLink to="jobs" icon={<FaTasks />} label="My Jobs" />
            <SidebarLink
              to="/client/messages"
              icon={<BsChatDotsFill />}
              label="Messages"
            />
            <SidebarLink
              to="/client/profile"
              icon={<FaUserCircle />}
              label="Profile"
            />
            <SidebarLink
              to="/client/reviews"
              icon={<BiSupport />}
              label="Reviews"
            />

            <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
              Log out
            </MenuItem>
          </Menu>
        </Sidebar>
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden transition-all duration-300 pl-2 sm:pl-8">
        {/* Top bar */}
        <div className="bg-white soft-shadow w-full p-4 rounded-lg sticky top-0 z-20 flex justify-between items-center">
          <p className="text-darkPrimary font-bold text-lg">
            Welcome , {user.first_name} {user.last_name}
          </p>
          {!isDesktop && (
            <div>
              <ClientHamMenu />
            </div>
          )}
        </div>

        {/* Main outlet */}
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded-xl mt-4">
          <Outlet />
        </div>
      </main>
      {logout && <LogoutModal setLogoutModal={setLogout} />}
    </div>
  );
};

export default ClientLayout;
