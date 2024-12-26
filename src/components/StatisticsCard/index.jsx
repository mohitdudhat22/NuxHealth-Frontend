import React from 'react';
import { NHCard } from '..';

export const StatisticsCard = ({ title, count, icon }) => {
    return (
        <NHCard>
            <div className="flex items-center">
                <div className="text-blue-500 mr-9">
                    {icon}
                </div>
                <div>
                    <h3 className="text-gray-500 text-sm">{title}</h3>
                    <p className="text-2xl font-bold text-gray-800">{count}</p>
                </div>

            </div>
        </NHCard>
    );
}; 