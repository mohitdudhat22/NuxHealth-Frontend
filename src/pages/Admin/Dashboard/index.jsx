import React from 'react';
import { StatisticsCard, AppointmentsList, BillingCard, PatientDistributionCard } from '@/components';
import { LineChart } from '@/components/Charts';
import Icons from '@/constants/icons';
import { useDashboard } from '@/hook/Admin/Dashboard';

export const Dashboard = () => {
  const {
    totalPatients,
    totalDoctors,
    loading,
  } = useDashboard();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticsCard
          title="Total Patients"
          count={totalPatients}
          icon={Icons.Patient}
        />
        <StatisticsCard
          title="Total Doctors"
          count={totalDoctors}
          icon={Icons.Doctor}
        />
        <StatisticsCard
          title="Today's Appointments"
          count="1080"
          icon={Icons.Appointment}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <LineChart />
        </div>
        <div className="md:col-span-2">
          <BillingCard />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <AppointmentsList />
        </div>
        <div className="md:col-span-2">
          <PatientDistributionCard />
        </div>
      </div>
    </div>
  );
};
