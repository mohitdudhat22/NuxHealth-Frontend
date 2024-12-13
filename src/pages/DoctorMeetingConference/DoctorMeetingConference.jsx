import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useGlobal } from "../../hooks/useGlobal";

const DoctorMeetingConference = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const { userData, appointmentDone } = useGlobal();
  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  const room = getQueryParam("room");
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const initZegoCloudMeeting = async (element) => {
    const appID = 1757979495;
    const serverSecret = "04f46682ad34e9005b14d629441180e3";

    const roomID = room;
    const userID = "1";
    const userName = userData?.name;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      userName,
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      roomID: roomID,
      userID: userID,
      userName: userName,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onUserAvatarSetter: (userList) => {
        userList.forEach((user) => {
          user.setUserAvatar("/assets/images/Avatar-2.png");
        });
      },
    });
  };

  useEffect(() => {
    const videoCallDiv = document.getElementById("video-call-container");
    if (videoCallDiv && userData) {
      initZegoCloudMeeting(videoCallDiv);
      appointmentDone(room);
    }
  }, [userData]);

  return (
    <div className="d-flex">
      <div className="w-85 w-md-100">
        <div className="container-fluid meeting-conference-page py-4">
          <div
            id="video-call-container"
            className="video-call-container"
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "#718EBF",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMeetingConference;
