// src/components/ui/DatePicker.tsx
import React from 'react';

interface DatePickerProps {
  selectedDate?: string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="mb-4 flex flex-col items-start">
      <label htmlFor="date" className="text-sm font-semibold text-gray-800 mb-2">
        Select Date:
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full border text-4xl border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      />
    </div>
  );
};

export default DatePicker;