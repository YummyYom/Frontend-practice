export interface SeqScheduleData {
  noSched: number;
  seqSchedBenDu: number;
  seqSchedBenPer: number;
  amtSchedBen: number;
  prmSchedBen: number;
  comSchedBen: number;
  xprSchedBen: number;
  xcmSchedBen: number;
}

export interface ScheduleData {
  noSched: number;
  typSched: string;
  amtRefSche: number;
  freqSched: number;
  cessionId: number;
  benefitNumber: number;
  dtEffBen: Date;
  typGenOn: string;
  seqSchedules: SeqScheduleData[];
}

export interface SchedulesData {
  schedules: ScheduleData[];
}
