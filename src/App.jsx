import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import "./pages/pages.css";
import routesConfig from "./routesConfig.jsx";
import { Loading } from "./imports/index.js";
import AddRecord from "./pages/doctroPanel/AddRecord.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import SendNotificationForm from "./SendNotificationForm.jsx";
import NotificationBox from "./NotificaitionBox.jsx";
import { ReceptionPanel } from "./pages/ReceptionPanel/ReceptionPanel.jsx";
import PatientRegistration from "./pages/PatientRegistration.jsx";
import { ReceptionPatientRegistration } from "./pages/ReceptionPanel/ReceptionPatientRegistration.jsx";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/doctor/addRecord" element={<AddRecord />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/notification" element={<SendNotificationForm />} />
        <Route path="/notificationbox" element={<NotificationBox />} />
        {routesConfig.map((route, index) => {
          if (route.children) {
            return (
              <Route key={index} path={route.path} element={route.element}>
                {route.children.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            );
          }
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
