import moment from 'moment';
import React, { useState } from 'react';

const today = new Date();

const getDateRange = (): Date[] => {
  const daysAfter = 29;
  const result: Date[] = [];
  for (let i = 0; i <= daysAfter; i++) {
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
  const firstDayOfWeek = dates[0].getDay();

  const isEnabled = (date: Date): boolean => {
    return date.getDate() % 2 === 0; // Even dates enabled for demo
  };

  const handleSelect = (date: Date): void => {
    if (isEnabled(date)) {
      setSelectedDate(date);
      onSelected(date);
    }
  };

  // Group dates by month
  const datesByMonth: { [key: string]: Date[] } = {};
  dates.forEach((date) => {
    const monthKey = moment(date).format('YYYY-MM');
    if (!datesByMonth[monthKey]) {
      datesByMonth[monthKey] = [];
    }
    datesByMonth[monthKey].push(date);
  });

  // Get all month keys in order
  const monthKeys = Object.keys(datesByMonth).sort();

  return (
    <div className="mx-auto max-w-md p-4 font-sans text-gray-800">
      {/* Legend and Labels */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">Date Picker</div>
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

      {/* Render calendar by month */}
      {monthKeys.map((monthKey, monthIndex) => {
        const monthDates = datesByMonth[monthKey];
        const firstDateOfMonth = monthDates[0];
        const firstDayOfMonthWeekday =
          monthIndex === 0 ? firstDayOfWeek : firstDateOfMonth.getDay();

        return (
          <div key={monthKey} className="mb-4">
            {/* Month Divider */}
            <div className="col-span-7 mb-2 flex items-center gap-2">
              <div className="flex-grow border-t border-gray-300" />
              <span className="text-sm font-medium whitespace-nowrap text-gray-600">
                {moment(firstDateOfMonth).format('MMMM YYYY')}
              </span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            {/* Weekday Header for this month */}
            <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-gray-500">
              {weekdayNames.map((day) => (
                <div key={`${monthKey}-${day}`}>{day}</div>
              ))}
            </div>

            {/* Calendar Grid for this month */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for first week */}
              {Array.from({ length: firstDayOfMonthWeekday }).map((_, idx) => (
                <div key={`${monthKey}-empty-${idx}`} />
              ))}

              {/* Date cells */}
              {monthDates.map((date) => {
                const enabled = isEnabled(date);
                const isSelected = selectedDate && moment(selectedDate).isSame(date, 'day');

                const baseClasses = 'text-center py-2 rounded select-none text-sm transition';
                const enabledClasses = enabled
                  ? 'bg-amber-200 text-gray-800 hover:bg-amber-400 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 line-through cursor-not-allowed';
                const selectedClasses = isSelected
                  ? 'bg-amber-600 hover:bg-amber-600 text-white'
                  : '';

                return (
                  <div
                    key={moment(date).format('YYYY-MM-DD')}
                    className={`${baseClasses} ${enabledClasses} ${selectedClasses}`}
                    onClick={() => enabled && handleSelect(date)}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

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
