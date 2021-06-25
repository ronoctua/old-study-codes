import { container } from 'tsyringe';

import { DayjsDateProvider } from './implementations/DayjsDateProvider';
import { IDateProvider } from './models/IDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
