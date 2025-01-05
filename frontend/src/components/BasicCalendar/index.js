import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function BasicDateCalendar({ date, setDate }) {

  const handleDateChange = (selectedDate) => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    setDate(formattedDate); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={handleDateChange} value={dayjs(date)} />
    </LocalizationProvider>
  );
}
