// import "./Header.css";
import { IoIosArrowForward } from "react-icons/io";
import { useGlobal } from "../hooks/useGlobal";
import {
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Breadcrumbs,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { Notifications, ArrowDropDown, Search } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { breadcrumbNames } from "./constants";
import { useAuth } from "../hooks/useAuth";
import { IoHomeSharp } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import NotificationBox from "../NotificaitionBox";
import { Home, List } from "lucide-react";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedOption, setSelectedOption } = useGlobal();
  const { searchTerm, setSearchTerm } = useGlobal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setserchOpen] = useState(false);
  const { userData, getAdminProfile } = useGlobal();
  const [notification, setNoticiation] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) {
      setSelectedOption(option);
    }
    setAnchorEl(null);
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?type=${selectedOption}&query=${searchTerm}`);
    }
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  useEffect(() => {
    getAdminProfile(user.id);
  }, []);
  const userName = `${userData?.firstName || "User"} ${
    userData?.lastName || "Name"
  }`;
  const userRole = userData?.role || "Role";
  const userAvatar = userData?.avatar || "/img/avtar.png";

  const drawerContent = (
    <div className="w-64 p-4">
      <List>
        <ListItem button component={Link} to="/patient">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Avatar src={userAvatar} alt="User Image" />
          </ListItemIcon>
          <ListItemText
            primary={`${user.firstName} ${user.lastName}`}
            secondary={user.role}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="bg-white sticky top-0 flex flex-wrap items-center justify-between sm:w-full min-w-[230px]">
      <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
        {/* <IconButton className="sm:hidden mr-2" onClick={toggleDrawer(true)}>
        <MdMenu />
      </IconButton> */}
        <Breadcrumbs
          aria-label="breadcrumb"
          className="bg-[#f8fcfe] p-2 rounded-full text-xs sm:text-sm hidden sm:block md:hidden lg:block"
        >
          <Link
            underline="hover"
            color="inherit"
            to="/patient"
            className="flex items-center"
          >
            <IoHomeSharp />
            <IoIosArrowForward className="text-lg text-[#A7A7A7] me-1" />
            <p>Home</p>
          </Link>
          {location.pathname !== "/" && (
            <Link to={"/patient"} className="text-[#0EABEB]">
              patient
            </Link>
          )}
          {location.pathname !== "/" && (
            <Link
              to={location.pathname.split("/")[2]}
              className="text-[#0EABEB]"
            >
              <Typography variant="body2" color="textPrimary">
                {breadcrumbNames[location.pathname.split("/")[2]]}
              </Typography>
            </Link>
          )}
        </Breadcrumbs>
      </div>

      <div className="flex items-center justify-center w-full sm:w-auto">
        <div ref={searchRef} className="relative">
          {/* Mobile Search Icon */}
          <button
            onClick={toggleSearch}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>

          {/* Search Bar - Hidden on mobile unless clicked */}
          <div
            className={`
        ${
          isSearchOpen
            ? "absolute top-0 left-0 w-[calc(100vw-2rem)] z-50"
            : "hidden"
        } 
        md:relative md:block md:w-auto
      `}
          >
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-1 sm:w-full w-3/5">
              <Search className="sm:text-lg text-gray-500 mr-2 flex-shrink-0 text-sm" />
              <input
                type="text"
                placeholder="Quick Search"
                className="bg-transparent w-[60px] sm:w-[200px] sm:text-sm text-gray-600 placeholder-gray-400 text-[10px] border-0 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton aria-label="dropdown" onClick={handleClick}>
                <span className="text-sm">{selectedOption}</span>
                <ArrowDropDown />
              </IconButton>
              {/* Close button - only shown on mobile when search is open */}
              {isSearchOpen && (
                <button
                  onClick={toggleSearch}
                  className="md:hidden p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <IoCloseCircleOutline className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          aria-label="notifications"
          // className="bg-gray-200 rounded-full p-2 mx-2 relative"
        >
          <Badge color="secondary">
            <NotificationBox />
          </Badge>
        </button>
        <NavLink to={"/profile"}>
        <div className=" flex items-center ml-4">
          <Avatar src={userAvatar} alt="User Image" />
          <div className="hidden sm:inline-block sm:ml-2">
            <Typography variant="body2" fontWeight="bold">
              {userName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {userRole}
            </Typography>
          </div>
        </div>
        </NavLink>
      </div>

      {/* Collapsible search bar for small screens */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex items-center bg-gray-200 rounded-full px-4">
              <InputBase
                placeholder="Quick Search"
                inputProps={{ "aria-label": "search" }}
                className="flex-grow text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
              <IconButton aria-label="dropdown" onClick={handleClick}>
                <span className="text-sm">{selectedOption}</span>
                <ArrowDropDown />
              </IconButton>
            </div>
            <IconButton
              className="absolute top-2 right-2"
              onClick={toggleSearch}
            >
              <Close />
            </IconButton>
          </div>
        </div>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        <MenuItem onClick={() => handleClose("All")}>All</MenuItem>
        <MenuItem onClick={() => handleClose("Doctor")}>Doctor</MenuItem>
        <MenuItem onClick={() => handleClose("Patient")}>Patient</MenuItem>
      </Menu>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Header;
