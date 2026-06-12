import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { FC, useState } from 'react';
import { WeekPickerProps } from './types';
import { calendarStyle, CustomPickerDay } from './style';
import { isInSameWeek } from './utils';

dayjs.extend(isBetweenPlugin);

export const WeekPicker: FC<WeekPickerProps> = ({ currentDate, onSelectWeek }) => {
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
  const [value] = useState<Dayjs | null>(dayjs(currentDate));

  //TODO: reprendre style/logique comme dans le CustomDateCalendar + le remove d'ailleurs
  const getDayComponent = (
    props: PickersDayProps<Dayjs> & {
      selectedDay?: Dayjs | null;
      hoveredDay?: Dayjs | null;
    },
  ) => {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
      <CustomPickerDay
        {...other}
        day={day}
        selected={false}
        isSelected={isInSameWeek(day, selectedDay)}
        isHovered={isInSameWeek(day, hoveredDay)}
      />
    );
  }

  return (
    <DateCalendar
      value={value}
      onChange={(newValue, _, selectedView) => {
        if (selectedView === 'day') {
          onSelectWeek(newValue.toDate());
        }
      }}
      showDaysOutsideCurrentMonth
      slots={{ day: getDayComponent }}
      slotProps={{
        day: (ownerState) =>
          ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }) as any,
      }}
      sx={calendarStyle}
    />
  );
}
