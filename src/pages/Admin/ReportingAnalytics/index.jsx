import React from 'react';
import { StatisticsCard, AppointmentsList, BillingCard, DepartmentCard, PatientDistributionCard } from '@/components';
import { LineChart } from '@/components/Charts';
import Icons from '@/constants/icons';

export const ReportingAnalytics = () => {
  const departmentData = [
    { key: '1', name: 'Cardiology', count: '105' },
    { key: '2', name: 'Endocrinologist', count: '254' },
    { key: '3', name: 'Gastroenterologist', count: '657' },
    { key: '4', name: 'Anesthesiologist', count: '02' },
    { key: '5', name: 'Pediatrician', count: '784' },
    { key: '6', name: 'Ophthalmologist', count: '254' },
  ]
      return (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatisticsCard
              title="Total Patients"
              count="1500"
              icon={Icons.Patient}
            />
            <StatisticsCard
              title="Repeat Patients"
              count="500"
              icon={Icons.Doctor}
            />
            <StatisticsCard
              title="Admitted Patient"
              count="1080"
              icon={Icons.AdmittedPatient }
            />
              <StatisticsCard
              title="Total Claim"
              count="180"
              icon={Icons.TotalClaim}
            />
           

          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <LineChart />
            </div>
            <div className="md:col-span-2">
            <LineChart />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="md:col-span-2">
            <DepartmentCard 
    title="Patients Count Department" 
    departments={departmentData} 
  />
            </div>
            <div className="md:col-span-2">
            <DepartmentCard 
    title="Patients Count Department" 
    departments={departmentData} 
  />
            </div>
            <div className="md:col-span-2">
            <PatientDistributionCard />
            </div>
          </div>
        </div>
      );
 
}
