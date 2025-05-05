import moment from 'moment';
import React, { useState } from 'react';

const today = new Date();

const getDateRange = (): Date[] => {
  const daysBefore = 10;
  const daysAfter = 10;
  const result: Date[] = [];
  for (let i = -daysBefore; i <= daysAfter; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    result.push(d);
  }
  return result;
};

const weekdayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CustomDatePickerProps {
  availableDates: string[];
  unavailableDates: string[];
  onSelected: (selectedDate: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onSelected }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dates: Date[] = getDateRange();
  const monthName: string = today.toLocaleString('default', { month: 'long' });
  const year: number = today.getFullYear();

  const isEnabled = (date: Date): boolean => {
    // Example: only even-numbered dates are enabled
    return date.getDate() % 2 === 0;
  };

  const handleSelect = (date: Date): void => {
    if (isEnabled(date)) {
      setSelectedDate(date);
      onSelected(date);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 font-sans text-gray-800">
      {/* Header Row: Month/Year + Legend */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">
          {monthName} {year}
        </h3>

        {/* Legend (right side) */}
        <div className="flex items-center gap-4 text-xs text-gray-700">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded border border-amber-300 bg-amber-100" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-gray-200 line-through" />
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded bg-amber-600" />
            <span>Selected</span>
          </div>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-gray-500">
        {weekdayNames.map((day: string) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date: Date) => {
          const enabled: boolean = isEnabled(date);
          const isSelected: boolean = moment(selectedDate).isSame(date, 'day');

          const baseClasses = 'text-center py-2 rounded select-none text-sm transition';

          const enabledClasses = enabled
            ? 'bg-amber-200 text-gray-800 hover:bg-amber-400 cursor-pointer'
            : 'bg-gray-100 text-gray-400 line-through cursor-not-allowed';

          const selectedClasses = isSelected ? 'bg-amber-600 hover:bg-amber-600  text-white' : '';

          return (
            <div
              key={date.getUTCMilliseconds.toString()}
              className={`${baseClasses} ${enabledClasses} ${selectedClasses}`}
              onClick={() => enabled && handleSelect(date)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <p className="text-md mt-4 text-gray-700">
          Selected date:{' '}
          <span className="font-medium">{moment(selectedDate).format('MMMM Do YYYY')}</span>
        </p>
      )}
    </div>
  );
};

export default CustomDatePicker;
