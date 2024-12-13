import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { Notifications, ArrowDropDown } from "@mui/icons-material";
import admin from "../../assets/admin-image.png";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";
import { Home, List, Search } from "lucide-react";
import { FaAngleRight } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import NotificationBox from "../../NotificaitionBox";
import { IoIosArrowForward } from "react-icons/io";

const DoctorHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedOption, setSelectedOption } = useGlobal();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setserchOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, getDoctorProfile } = useGlobal();
  const { user } = useAuth();
  const searchRef = useRef(null);

  const userName = `${userData?.name || "User"}`;
  const userRole = userData?.role || "Role";
  const userAvatar = userData?.avatar || "/img/avtar.png";

  useEffect(() => {
    getDoctorProfile(user.id);
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) {
      setSelectedOption(option);
    }
    setAnchorEl(null);
  };
  const breadcrumbNames = {
    doctorManagement: "Doctor Management",
    patient: "Patient Management",
    profile: "Profile Setting",
    monitorBilling: "Monitor Billing",
    patientManagement: "Patient Management",
    insuranceClaims: "Insurance Claims",
    reportingAndAnalytics: "Reporting & Analytics",
    paymentMethod: "Payment Method",
    patientRecordAccesst: "Patient Record Accesst",
    createPrescriptionTools: "Create Prescription Tools",
    managePrescriptionTools: "Manage Presciption Tools",
    teleconsultationModule: "Teleconsultation Module",
    chatScreen: "Chat Screen",
  };
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?type=${selectedOption}&query=${searchTerm}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
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
    getDoctorProfile(user.id);
  }, []);

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
    <div className="header bg-white sticky top-0 z-50 flex items-center justify-between p-3 sm:w-full min-w-[230px]">
      {/* Breadcrumb */}
      <div>
        <Breadcrumbs
          aria-label="breadcrumb"
          className="bg-[#f8fcfe] border rounded-full py-2 px-3 text-lg font-normal"
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
          {location.pathname !== "/" && <Link to={"/doctor"}>doctor</Link>}
          {location.pathname !== "/" && (
            <NavLink to={location.pathname.split("/")[2]}>
              <Typography variant="body2" color="#0EABEB">
                {breadcrumbNames[location.pathname.split("/")[2]]}
              </Typography>
            </NavLink>
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
        <NavLink to={"/doctor/profile"}>
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

export default DoctorHeader;
