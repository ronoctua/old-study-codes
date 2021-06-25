import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../models/IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const utcEndDate = this.convertToUTC(endDate);
    const utcStartDate = this.convertToUTC(startDate);

    return dayjs(utcEndDate).diff(utcStartDate, 'hours');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const utcEndDate = this.convertToUTC(endDate);
    const utcStartDate = this.convertToUTC(startDate);

    return dayjs(utcEndDate).diff(utcStartDate, 'days');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export { DayjsDateProvider };
