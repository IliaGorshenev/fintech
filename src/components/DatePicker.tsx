import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';

const DatePickerWrapper = styled.div`
  .react-datepicker {
    font-family: 'Inter', sans-serif;
    background-color: var(--calendar-bg);
    border: 1px solid var(--calendar-border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .react-datepicker__header {
    background-color: var(--calendar-bg);
    border-bottom: 1px solid var(--calendar-border);
    padding-top: 12px;
  }

  .react-datepicker__current-month {
    color: var(--calendar-header-text);
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .react-datepicker__day-name {
    color: var(--calendar-day-names);
    font-size: 12px;
    width: 36px;
    margin: 2px;
  }

  .react-datepicker__day {
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin: 2px;
    border-radius: 50%;
    color: var(--calendar-text);
    font-size: 14px;
  }

  .react-datepicker__day:hover {
    background-color: var(--calendar-hover-bg);
    border-radius: 50%;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range {
    background-color: var(--calendar-selected-bg);
    color: var(--calendar-selected-text);
  }

  .react-datepicker__day--in-selecting-range {
    background-color: var(--calendar-range-bg);
  }

  .react-datepicker__day--today {
    background-color: var(--calendar-today-bg);
    color: var(--calendar-today-text);
    font-weight: 600;
  }

  .react-datepicker__day--disabled {
    color: var(--calendar-disabled-text);
    cursor: not-allowed;
  }

  .react-datepicker__day--weekend {
    color: var(--calendar-weekend-text);
  }

  .react-datepicker__navigation {
    top: 12px;
  }

  .react-datepicker__navigation--previous {
    left: 12px;
  }

  .react-datepicker__navigation--next {
    right: 12px;
  }

  .react-datepicker__month-container {
    float: left;
    margin: 8px;
  }
`;

const DateInputField = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--input-borders);
  background-color: var(--background);
  color: var(--foreground);
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const CalendarIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
  pointer-events: none;
`;

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  placeholderText?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onChange, placeholderText = 'Выберите период' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (dates: [Date | null, Date | null]) => {
    onChange(dates);
    if (dates[0] && dates[1]) {
      setIsOpen(false);
    }
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'dd.MM.yyyy', { locale: ru })} - ${format(endDate, 'dd.MM.yyyy', { locale: ru })}`;
    }
    return '';
  };

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        locale={ru}
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholderText}
        open={isOpen}
        onInputClick={() => setIsOpen(true)}
        onClickOutside={() => setIsOpen(false)}
        customInput={
          <DateInputField>
            <StyledInput value={formatDateRange()} placeholder={placeholderText} readOnly />
            <CalendarIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4.00001V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4.00001C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M10.6667 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.33333 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </CalendarIcon>
          </DateInputField>
        }
      />
    </DatePickerWrapper>
  );
};
