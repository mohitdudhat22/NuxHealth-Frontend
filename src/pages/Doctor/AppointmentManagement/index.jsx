import { NHCard, NHHead, NHTabs } from "@/components";
import { TodayAppointments } from "./TodaysAppointment";
import { PreviousAppointments } from "./PreviousAppointment";
import { UpcomingAppointments } from "./UpcomingAppointment";
import { CancelAppointments } from "./CancelAppointment";
import { useDecodeToken } from "@/hook";

export const AppointmentManagement = () => {
  const tabItems = [
    {
      key: "today",
      label: "Today Appointment",
      children: <TodayAppointments />,
    },
    {
      key: "upcoming",
      label: "Upcoming Appointment",
      children: <UpcomingAppointments />,
    },
    {
      key: "previous",
      label: "Previous Appointment",
      children: <PreviousAppointments />,
    },
    {
      key: "cancel",
      label: "Cancel Appointment",
      children: <CancelAppointments />,
    },
  ];

  const { token } = useDecodeToken();
  console.log(token);

  return (
    <>
      <NHHead title="Appointment Management" />
      <NHCard>
        <NHTabs items={tabItems} defaultActiveKey="today" />
      </NHCard>
    </>
  );
};
