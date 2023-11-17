import { FamDefData } from './FamDefData';
import { ScheduleData } from './ScheduleData';
import { BenefitData } from 'app/interfaces/DataTemplates/BenefitData';
import { InsuredLivesData } from 'app/interfaces/DataTemplates/InsuredLivesData';

/**Object representation of the parsed JSON file retrieved from the database*/
export interface CessionData {
  cessionId: number;
  cdTypCess: string;
  stCess: string;
  dtStCess: string;
  noDoc: number;
  cdCompCess: string;
  noPol: string;
  extNoPol: string;
  dtAnnPol: string;
  dtEffPol: string;
  cdCessAutFac: string;
  dtEffCess: string;
  cdProdCess: string;
  cdPlanCess: string;
  cdEntrModCess: string;
  txtCess: string;
  insuredLives: InsuredLivesData[];
  benefits: BenefitData[];
}
