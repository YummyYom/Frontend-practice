import { FamDefData } from './FamDefData';
import { ScheduleData } from './ScheduleData';
import { TecData } from 'app/interfaces/DataTemplates/TecData';
import { cdTypFttBen } from 'app/BlockInputFieldTemplates/FamDefFields';

/**Object representation of the parsed JSON file retrieved from the database*/
export interface MemData {
  noFtt: number;
  cdGenMtt: string;
  cdSmoMtt: string;
  pcMinMortMtt: number;
  pcMaxMortMtt: number;
  minAmtMtt: number;
  maxAmtMtt: number;
  cdClsMtt: string;
  duMinXprMtt: number;
  duMaxXprMtt: number;
  pcTecht: number;
  noTecht: number;
  cdOccMtt: string;
  memberRates: TecData[];
}

export interface FttMemListData {
  cdTypFttBen: string;
  members: MemData[];
}
