import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Select from '@/components/Select';

const FORMAT = 'YYYY-MM-DD';
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const StyledDiv = styled.div`
  position: relative;
  font-size: 14px;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 28px;
    height: 28px;
    background: transparent;
    transition: background 300ms;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 50%;
  }
  &:hover {
    color: rgba(0, 0, 0, 0.88);
  }
  &:hover:before {
    background: rgba(0, 0, 0, 0.04);
  }

  &.today {
    &:before {
      border: 1px solid #1677ff;
    }
  }

  &.selectedDate {
    color: #fff;
    &:before {
      background: #1677ff;
    }
    &:hover:before {
      background: #1677ff;
      opacity: 0.8;
    }
  }

  &.marked {
    color: #fff;
    &:before {
      background: #ff4d4f;
    }
    &:hover:before {
      background: #ff4d4f;
      opacity: 0.8;
    }
  }

  &.disabled {
    color: #d1d1e1;
    pointer-events: none;
  }
`;
interface MiniCalendarProps {
  value?: Dayjs | null;
  onClick?: (date: Dayjs) => void;
  markedDays?: Dayjs[];
  markedInfos?: Record<string, string>;
}
const MiniCalendar = (props: MiniCalendarProps) => {
  const { value, markedDays = [], markedInfos = {}, onClick } = props;
  const [selectedDate, setSelectedDate] = useState<Dayjs>(value || dayjs());

  const selectedYear = useMemo(() => {
    return selectedDate.year();
  }, [selectedDate]);

  const selectedMonth = useMemo(() => {
    return selectedDate.month() + 1;
  }, [selectedDate]);
  // console.log(`selectedMonth: ${selectedMonth}`);

  const yearOptions = useMemo(() => {
    const options: number[] = [];
    for (let i = selectedYear - 10; i < selectedYear + 10; i++) {
      options.push(i);
    }
    return options;
  }, [selectedYear]);

  const calendar = useMemo(() => {
    let day = 1;
    let currMonth = selectedMonth;
    const daysInMonth = selectedDate.daysInMonth();
    // console.log(`daysInMonth: ${daysInMonth}`);
    const firstDayOfMonth = selectedDate.startOf('month'); // 获取当月第一天
    const firstDayOfWeek = firstDayOfMonth.day(); // 获取星期几，0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // console.log(`firstDayOfWeek: ${firstDayOfWeek}`);
    const weeks: Dayjs[][] = [];
    for (let i = 0; i < 6; i++) {
      const week: Dayjs[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0) {
          if (j < firstDayOfWeek) {
            week.push(
              dayjs(`${selectedYear}-${selectedMonth}`).subtract(
                firstDayOfWeek - j,
                'day',
              ),
            );
            continue;
          }
        }
        week.push(dayjs(`${selectedYear}-${currMonth}-${day}`));
        day++;
        if (day > daysInMonth) {
          currMonth += 1;
          day = 1;
        }
      }
      weeks.push(week);
    }
    return weeks;
  }, [selectedDate, selectedYear, selectedMonth]);
  //   console.log(calendar);

  const handleYearChange = useCallback(
    (val: string | number) => {
      setSelectedDate((prevDate) => {
        const day = prevDate.date();
        return dayjs(`${val}-${selectedMonth}-${day}`);
      });
    },
    [selectedMonth],
  );

  const handleMonthChange = useCallback(
    (val: string | number) => {
      setSelectedDate((prevDate) => {
        const day = prevDate.date();
        return dayjs(`${selectedYear}-${val}-${day}`);
      });
    },
    [selectedYear],
  );

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => {
      return dayjs(prevDate).subtract(1, 'month');
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      return dayjs(prevDate).add(1, 'month');
    });
  };

  const handleClick = (date: Dayjs) => {
    // console.log(date);
    setSelectedDate(date);
    if (onClick) {
      onClick(date);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[1000px]">
      <div className="w-[300px] border border-solid rounded-lg">
        <div className="p-2 flex justify-center items-center border-b">
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            options={yearOptions.map((item) => ({
              label: `${item}年`,
              value: item,
            }))}
          />
          <div
            className="w-8 flex justify-center items-center cursor-pointer"
            onClick={handlePrevMonth}
          >
            &lt;
          </div>
          <Select
            className="!w-[70px]"
            value={selectedMonth}
            onChange={handleMonthChange}
            options={months.map((item) => ({
              label: `${item}月`,
              value: item,
            }))}
          />
          <div
            className="w-8 flex justify-center items-center cursor-pointer"
            onClick={handleNextMonth}
          >
            &gt;
          </div>
        </div>
        <div>
          <div className="flex h-[30px] text-sm">
            {weekDays.map((item) => {
              return (
                <div
                  key={item}
                  className="flex-1 flex justify-center items-center"
                >
                  {item}
                </div>
              );
            })}
          </div>
          {calendar.map((c, index) => {
            return (
              <div key={index} className="flex">
                {c.map((item, i) => {
                  const isCurrMonth = item.format('M') === `${selectedMonth}`;
                  const isMarked = markedDays.find((markedDay) =>
                    markedDay.isSame(item, 'date'),
                  );
                  return (
                    <StyledDiv
                      key={`${index}-${i}`}
                      className={`flex-1 flex justify-center items-center h-[30px] ${isMarked ? 'marked' : ''} ${item.isSame(dayjs(), 'date') ? 'today' : ''} ${selectedDate && selectedDate.isSame(item, 'date') && isCurrMonth ? 'selectedDate' : ''} ${isCurrMonth ? 'cursor-pointer' : 'disabled'}`}
                      title={item.format(FORMAT)}
                      onClick={() => {
                        handleClick(item);
                      }}
                    >
                      <div className="relative z-1">{item.format('D')}</div>
                    </StyledDiv>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {selectedDate ? (
        <div className="mt-3">
          <div>当前选择的日期是：{selectedDate.format(FORMAT)}</div>
          {markedInfos[selectedDate.format(FORMAT)] && (
            <div className="mt-3">
              备注：{markedInfos[selectedDate.format(FORMAT)]}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default MiniCalendar;
