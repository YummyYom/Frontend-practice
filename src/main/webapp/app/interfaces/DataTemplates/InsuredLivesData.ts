import { InsuredLifeData } from 'app/interfaces/DataTemplates/InsuredLifeData';

export interface InsuredLivesData {
  cessionId: number;
  insuredLife: InsuredLifeData;
  smoker: string;
  rate: number;
  occupationCode: string;
}
