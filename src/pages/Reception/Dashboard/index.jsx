import React from 'react';
import { StatisticsCard, AppointmentsList, BillingCard, PatientDistributionCard } from '@/components';
import { LineChart } from '@/components/Charts';
import Icons from '@/constants/icons';
import { useDashboardAndReport } from '@/hook/Admin/DashboardAndReport';

export const Dashboard = () => {
  const { data } = useDashboardAndReport();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticsCard
          title="Total Patients"
          count={data?.totalPatients}
          icon={Icons.Patient}
        />
        <StatisticsCard
          title="Total Doctors"
          count={data?.totalDoctors}
          icon={Icons.Doctor}
        />
        <StatisticsCard
          title="Today's Appointments"
          count={data?.todaysTotalAppointments}
          icon={Icons.Appointment}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <LineChart data={data?.patientStats} />
        </div>
        <div className="md:col-span-2">
          <BillingCard data={data?.billdata} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <AppointmentsList data={data?.appointments} />
        </div>
        <div className="md:col-span-2">
          <PatientDistributionCard data={data?.patientSummary} />
        </div>
      </div>
    </div>
  );
};