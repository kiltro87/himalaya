
import { getTripDay } from './date-utils';
import { tripConfig } from './trip-config';
import { parseISO } from 'date-fns';

describe('getTripDay', () => {
  const tripStartDate = parseISO(tripConfig.trip.startDate);
  const tripEndDate = parseISO(tripConfig.trip.endDate);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the correct day number during the trip', () => {
    const simulatedDate = new Date(tripStartDate);
    simulatedDate.setDate(simulatedDate.getDate() + 2); // Simulate Day 3
    jest.setSystemTime(simulatedDate);
    expect(getTripDay()).toBe(3);
  });

  it('should return 1 if the date is before the trip starts', () => {
    const simulatedDate = new Date(tripStartDate);
    simulatedDate.setDate(simulatedDate.getDate() - 5); // 5 days before the trip
    jest.setSystemTime(simulatedDate);
    expect(getTripDay()).toBe(1);
  });

  it('should return the last day if the date is after the trip ends', () => {
    const simulatedDate = new Date(tripEndDate);
    simulatedDate.setDate(simulatedDate.getDate() + 5); // 5 days after the trip
    jest.setSystemTime(simulatedDate);
    expect(getTripDay()).toBe(tripConfig.trip.duration);
  });
});
