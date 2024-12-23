import React  from "react";

export const getFormattedDateTime = ({ includeDate = true, includeTime = true } = {}) => {
  const currentTime = new Date();

  const formattedDate = `${currentTime.getDate().toString().padStart(2, '0')}/${(currentTime.getMonth() + 1).toString().padStart(2, '0')}/${currentTime.getFullYear()}`;
  const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;


  return {
    date: includeDate ? formattedDate : null,
    time: includeTime ? formattedTime : null,
  };
};