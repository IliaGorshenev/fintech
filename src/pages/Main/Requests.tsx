import MainLayout from '@/layouts/MainLayout';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import DatePicker from 'react-datepicker';

// Add these styled components after your existing styled components

const DatePickerContainer = styled.div`
  padding: 16px;
  width: 600px;
  max-width: 90vw;

  .react-datepicker {
    width: 100%;
    border: none;
    background: transparent;
    font-family: inherit;
  }

  .react-datepicker__month-container {
    float: left;
    width: 50%;
  }

  .react-datepicker__header {
    background-color: var(--background);
    border-bottom: 1px solid var(--border);
  }

  .react-datepicker__current-month {
    color: var(--foreground);
    font-weight: 600;
  }

  .react-datepicker__day-name {
    color: var(--grey-700);
    width: 36px;
    margin: 2px;
  }

  .react-datepicker__day {
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin: 2px;
    border-radius: 50%;
    color: var(--foreground);
  }

  .react-datepicker__day:hover {
    background-color: var(--bg-menu-item);
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .react-datepicker__day--keyboard-selected {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .react-datepicker__day--disabled {
    color: var(--grey-600);
  }
`;

const DatePickerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ApplyButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--primary);
  color: var(--primary-foreground);
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DateFilterPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--primary);
  color: var(--primary-foreground);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const PageContainer = styled.div`
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--foreground);
  text-decoration: none;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: var(--foreground);
`;

const CalendarButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  overflow-x: auto;
  padding-bottom: 16px;
  margin-bottom: 16px;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const FilterPill = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ $active }) =>
    $active
      ? `
    background: var(--primary);
    color: white;
    border: none;
  `
      : `
    background: transparent;
    color: var(--primary);
    border: 1px solid var(--primary);
  `}
`;

const CloseIcon = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const RequestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RequestCard = styled.div`
  background: var(--secondary-100);
  border-radius: 12px;
  padding: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--foreground);
`;

const CardDate = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const DetailItem = styled.div`
  font-size: 14px;
  color: var(--foreground);
`;

const StatusBadge = styled.div<{ $status: 'review' | 'approved' | 'rejected' | 'canceled' }>`
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;

  ${({ $status }) => {
    switch ($status) {
      case 'review':
        return `
          background: var(--yellow-100);
          color: var(--yellow-900);
        `;
      case 'approved':
        return `
          background: var(--green-100);
          color: var(--green-900);
        `;
      case 'rejected':
        return `
          background: var(--error-light);
          color: var(--error);
        `;
      case 'canceled':
        return `
          background: var(--grey-200);
          color: var(--grey-800);
        `;
      default:
        return `
          background: var(--grey-200);
          color: var(--grey-800);
        `;
    }
  }}
`;

type RequestType = 'all' | 'completed' | 'active' | 'exchange' | 'reshuffle' | 'invoice';

interface Request {
  id: string;
  type: 'exchange' | 'reshuffle' | 'invoice';
  title: string;
  date: string;
  details: string[];
  status: 'review' | 'approved' | 'rejected' | 'canceled';
  statusText: string;
}

export const RequestsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<RequestType>('all');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'completed', label: 'Завершённые' },
    { id: 'active', label: 'Активные' },
    { id: 'exchange', label: 'Обмен' },
    { id: 'reshuffle', label: 'Перестановка' },
    { id: 'invoice', label: 'Инвойс' },
  ];

  const requests: Request[] = [
    {
      id: '1282789',
      type: 'exchange',
      title: 'Обмен №1282789',
      date: '21.04.2025',
      details: ['Москва, Вишнёвая роща, 42к1, офис 410', 'Отдаёте: 200 000 ₽', 'Получаете: 3002,64 USDT'],
      status: 'review',
      statusText: 'На рассмотрении',
    },
    {
      id: '1245678',
      type: 'exchange',
      title: 'Обмен №1245678',
      date: '20.04.2025',
      details: ['Москва, Вишнёвая роща, 42к1, офис 410', 'Отдаёте: 150 000 ₽', 'Получаете: 2250,48 USDT'],
      status: 'canceled',
      statusText: 'Отмена фиксации',
    },
    {
      id: '12456789',
      type: 'invoice',
      title: 'Инвойс №12456789',
      date: '18.03.2025',
      details: ['Россия', 'Москва, Вишнёвая роща, 42к1, офис 410', 'Наименование: Покупка автомобиля', 'Валюта оплаты: ETH', 'Сумма оплаты: 18.18 ETH'],
      status: 'approved',
      statusText: 'Одобрена',
    },
    {
      id: '12456790',
      type: 'reshuffle',
      title: 'Перестановка №12456790',
      date: '18.03.2025',
      details: [
        'Россия',
        'Приём: Вишнёвая роща, 42к1, офис 410',
        'Получение: Viale del Giardini, 42, Piano Terra',
        'Валюта к передаче: ₽',
        'Желаемая сумма к получению: 18.18 ETH',
      ],
      status: 'rejected',
      statusText: 'Отклонена',
    },
  ];

  const handleFilterChange = (filter: RequestType) => {
    setActiveFilter(filter);
  };
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    // Add filtering logic based on date range
  };
  const filteredRequests = requests.filter((request) => {
    // First apply type/status filter
    let passesTypeFilter = true;
    if (activeFilter === 'all') {
      passesTypeFilter = true;
    } else if (activeFilter === 'completed') {
      passesTypeFilter = ['approved', 'rejected', 'canceled'].includes(request.status);
    } else if (activeFilter === 'active') {
      passesTypeFilter = request.status === 'review';
    } else {
      passesTypeFilter = request.type === activeFilter;
    }

    // Then apply date filter if dates are selected
    let passesDateFilter = true;
    if (dateRange[0] && dateRange[1]) {
      const requestDate = new Date(request.date.split('.').reverse().join('-'));
      passesDateFilter = requestDate >= dateRange[0] && requestDate <= dateRange[1];
    }

    return passesTypeFilter && passesDateFilter;
  });
  return (
    <MainLayout>
      <PageContainer>
        <Header>
          <HeaderLeft>
            <BackButton to="/dashboard">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BackButton>
            <Title>Мои заявки</Title>
          </HeaderLeft>

          <Popover placement="bottom-end">
            <PopoverTrigger>
              <CalendarButton>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07954 2.5 5.00001V16.6667C2.5 17.5872 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5872 17.5 16.6667V5.00001C17.5 4.07954 16.7538 3.33334 15.8333 3.33334Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M13.3333 1.66666V4.99999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.66669 1.66666V4.99999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 8.33334H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </CalendarButton>
            </PopoverTrigger>
            <PopoverContent>
              <DatePickerContainer>
                <DatePicker
                  selected={dateRange[0]}
                  onChange={(dates) => {
                    setDateRange(dates as [Date | null, Date | null]);
                  }}
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  selectsRange
                  inline
                  monthsShown={2}
                  locale={ru}
                  dateFormat="dd.MM.yyyy"
                  calendarClassName="custom-calendar"
                />
                <DatePickerActions>
                  <ClearButton onClick={() => setDateRange([null, null])} disabled={!dateRange[0] && !dateRange[1]}>
                    Очистить
                  </ClearButton>
                  <ApplyButton
                    onClick={() => document.body.click()} // Close popover
                    disabled={!dateRange[0] || !dateRange[1]}>
                    Применить
                  </ApplyButton>
                </DatePickerActions>
              </DatePickerContainer>
            </PopoverContent>
          </Popover>
        </Header>

        {dateRange[0] && dateRange[1] && (
          <DateFilterPill>
            {format(dateRange[0], 'dd.MM.yyyy', { locale: ru })} - {format(dateRange[1], 'dd.MM.yyyy', { locale: ru })}
            <CloseIcon onClick={() => setDateRange([null, null])}>×</CloseIcon>
          </DateFilterPill>
        )}

        <FilterContainer>
          {filters.map((filter) => (
            <FilterPill key={filter.id} $active={activeFilter === filter.id} onClick={() => handleFilterChange(filter.id as RequestType)}>
              {filter.label}
              {activeFilter === filter.id && activeFilter !== 'all' && <CloseIcon onClick={() => handleFilterChange('all')}>×</CloseIcon>}
            </FilterPill>
          ))}
        </FilterContainer>

        <RequestsList>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <RequestCard key={request.id}>
                <CardHeader>
                  <CardTitle>{request.title}</CardTitle>
                  <CardDate>{request.date}</CardDate>
                </CardHeader>

                <CardDetails>
                  {request.details.map((detail, index) => (
                    <DetailItem key={index}>{detail}</DetailItem>
                  ))}
                </CardDetails>

                <StatusBadge $status={request.status}>{request.statusText}</StatusBadge>
              </RequestCard>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--grey-700)' }}>Нет заявок, соответствующих выбранным фильтрам</div>
          )}
        </RequestsList>
      </PageContainer>
    </MainLayout>
  );
};
