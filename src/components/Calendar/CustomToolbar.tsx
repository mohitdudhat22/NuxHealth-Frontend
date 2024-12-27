import React from 'react';
import { NavigateAction, ToolbarProps } from 'react-big-calendar';
import { format } from 'date-fns';

export const CustomToolbar: React.FC<ToolbarProps> = ({
  date,
  onNavigate,
}) => {
  const formattedDate = format(date, "dd MMM, yyyy' - 'dd MMM, yyyy");

  return (
    <div className="custom-toolbar">
      <button
        className="nav-button"
        onClick={() => onNavigate('PREV' as NavigateAction)}
      >
        ‹
      </button>
      <span className="date-label">{formattedDate}</span>
      <button
        className="nav-button"
        onClick={() => onNavigate('NEXT' as NavigateAction)}
      >
        ›
      </button>
    </div>
  );
};