import './SimulateurPrime.scss';
import ContainerBlock, { ContainerType } from '../Commons/ContainerBlock';
import FormBlock from '../Commons/FormBlock';
import TableBlock from '../Commons/TableBlock';
import { FieldType } from '../interfaces/FieldDef';
import { CessionData } from '../interfaces/DataTemplates/CessionData';
import { ScheduleData, SeqScheduleData } from '../interfaces/DataTemplates/ScheduleData';
import { CESS_BASICS_FIELDS } from '../BlockInputFieldTemplates/CessBasicsFields';
import { CESS_BENEFITS_FIELDS } from '../BlockInputFieldTemplates/CessBenefitsFields';
import { CESS_BEN_SEQ_SCHEDULE_FIELDS } from '../BlockInputFieldTemplates/CessBenSeqScheduleFields';
import { useState } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { FAM_DEF_FIELDS } from '../BlockInputFieldTemplates/FamDefFields';
import { FamDefData } from '../interfaces/DataTemplates/FamDefData';
import { FieldNameListType, extractIndexFromFieldName } from '../Commons/Commons';
import { FieldValues, useFieldArray, UseFieldArrayReturn, useForm, UseFormReturn } from 'react-hook-form';
import {
  Button,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { ModalCodeDescFields, ModalCodeDescValues, ModalTableCodeDesc, SelectedRowInfo } from '../Commons/ModalBase';
import { MEMDEF_FIELDS } from '../BlockInputFieldTemplates/MemDefFields';
import { FttMemListData, MemData } from '../interfaces/DataTemplates/MemData';
import { TABTEC_FIELDS } from '../BlockInputFieldTemplates/TabTecFields';
import { INSURED_LIVES_FIELDS } from '../BlockInputFieldTemplates/InsuredLivesFields';
import { CESS_INSURED_LIVES_FIELDS } from '../BlockInputFieldTemplates/CessInsuredLivesFields';
import React from 'react';
import { translate } from 'react-jhipster';
import axios from 'axios';
import { BenefitData } from 'app/interfaces/DataTemplates/BenefitData';
import { InsuredLivesData } from 'app/interfaces/DataTemplates/InsuredLivesData';
import { TecData } from 'app/interfaces/DataTemplates/TecData';
import { AuxDescData } from 'app/interfaces/DataTemplates/AuxDescData';

function SimulateurPrime() {
  //Écran X.Y.Z
  const queryErrToast = useToast();


  //#region Generic query custom hooks
  function useSylQuery<DataType>(queryFn: () => Promise<DataType>, queryKeys: string[], enabledCondition: () => boolean) {
    const query = useQuery<DataType>({
      queryKey: queryKeys,
      queryFn: queryFn,
      //default setup to force manual refetching only
      enabled: enabledCondition(),
    });

    const queryErrToast = useToast();

    React.useEffect(() => {
      if (query.error) {
        //console.log((query.error as Error).message);
        queryErrToast({
          title: 'Query Error',
          description: (query.error as Error).message,
          status: 'error',
        });
      }
    }, [query.error]);

    return query;
  }

  async function refetchWithFormVals<FormFields, DataType>(
    queryHook: UseQueryResult<DataType, unknown>,
    queryKeyVal?: string,
    queryKeySetter?: (val: string) => void
  ) {
    queryKeySetter?.(queryKeyVal ?? '');
    //console.log('querykeyval:' + (queryKeyVal ?? ''));

    return queryHook.refetch();
  }

  //#endregion

  //#region Custom Query Definitions
  //#region Calc Prem Query
  let queryCalcPayload: string;

  async function fetchCalcObj(): Promise<ScheduleData> {
    //console.log('calculating fetch');
    let tmpCalcPayLoadObj: CalcPayload = CombineCessFam();
    if (tmpCalcPayLoadObj.cessionId) {
      queryCalcPayload = JSON.stringify(queryCalcPayload);
      const tmpCessData = await PostCalc(JSON.stringify(tmpCalcPayLoadObj));
      //console.log('received' + JSON.stringify(tmpCessData));

      const tmpSchedules = { schedules: tmpCessData };

      if (tmpSchedules?.schedules && tmpSchedules?.schedules.length > 0) {
        tmpSchedules.schedules[0].seqSchedules.sort(
          (a, b) => (a.seqSchedBenDu - b.seqSchedBenDu) * 100 + a.seqSchedBenPer - b.seqSchedBenPer
        );

        return tmpSchedules.schedules[0];
      } else {
        return {} as ScheduleData;
      }
    } else {
      useToastOnErrWithReset({
        title: 'Input Error',
        description: 'A cession number is required',
        status: 'error',
      });
    }
  }

  async function PostCalc(calcPayload: string) {
    const token = localStorage.getItem('jhi-authenticationToken'); //"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY5NjYyMDY0MCwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNjk0MDI4NjQwfQ.EVsUucy2WjhV-v6u8uLFm_A_RGfvTCaBStJtYQMg8uYHLWxd7d-FC2b7KC27545p9pFE_xXi_O61KL2NcI-grw"
    //console.log('final postcalc fetch:' + calcPayload);

    try {
      const res = await axios({
        method: 'POST',
        url: REACT_APP_API_ENDPOINT + '/api/premiumCalculation',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: calcPayload,
      });

      //console.log(JSON.stringify(json));

      return res.data;
    } catch (error) {
      //console.log(JSON.stringify(error));
      //console.log('check for syl err');

      queryErrToast({
        title: error.response.data?.errorCode,
        description: error.response.data.message,
        status: 'error',
      });
    }
  }

  async function refetchWithCalcFormVals(calcVals: CalcPayload) {
    //console.log('calculating refetch');
    if (calcVals.cessionId) {
      await refetchWithFormVals<SeqSchedFormFields, ScheduleData>(
        calcQuery,
        queryCalcPayload,
        val => (queryCalcPayload = JSON.stringify(CombineCessFam()))
      );
      //console.log(calcQuery.data);
    } else {
      useToastOnErrWithReset({
        title: 'Input Error',
        description: 'Cession info and families are required',
        status: 'error',
      });
    }
  }

  const calcQuery = useSylQuery<ScheduleData>(fetchCalcObj, ['PremCalc', queryCalcPayload], () => false);
  //#endregion

  //region Cess Query
  let queryParamcessionId: string;

  async function fetchCessObj(): Promise<CessionData> {
    //console.log('looking for cessionId of:' + (queryParamcessionId ?? '-').toString());
    if (queryParamcessionId) {
      //console.log('found cessionId of:' + tmpCessData?.cessionId?.toString());
      return GetCess(queryParamcessionId ?? '');
    } else {
      useToastOnErrWithReset({
        title: 'Input Error',
        description: 'A cession number is required',
        status: 'error',
      });
    }
  }


  async function GetBenPlan(benId: string) {
    const token = localStorage.getItem('jhi-authenticationToken');
    const res = await axios.get(REACT_APP_API_ENDPOINT + '/api/benefitPlan/' + benId, {
      headers: {
        method: 'GET',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      },
    });
  }


  async function GetCess(noCess: string) {
    const token = localStorage.getItem('jhi-authenticationToken');
    const res = await axios.get(REACT_APP_API_ENDPOINT + '/api/cession/' + noCess, {
      headers: {
        method: 'GET',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.data;
    const planObj =  await GetBenPlan(res.data?.benefits[0].idBenPlan ?? '');
    return Object.assign({} as CessionData, json, planObj);
  }

  async function refetchWithCessFormVals(cessVals: CessFormFields) {
    setQueryMode(false);
    if (cessVals?.cessionId) {
      await refetchWithFormVals<CessFormFields, CessionData>(cessQuery, cessVals.cessionId, val => (queryParamcessionId = val));
    } else {
      useToastOnErrWithReset({
        title: 'Input Error',
        description: 'A cession number is required',
        status: 'error',
      });
    }
  }

  const cessQuery = useSylQuery<CessionData>(fetchCessObj, ['cessionId', queryParamcessionId], () => false);
  //#endregion

  //#region FamDef Queries
  //TODO: Make memTec block update on manual changing of FAM NO in famblock after MODAL fix
  async function fetchFamDefListObj(): Promise<FamDefData[]> {
    // //console.log('FAM FETCH WITH:' + cessQuery.data?.benefits[0]?.idBenPlan.toString());

    if (cessQuery.data?.benefits[0]?.idBenPlan) {
      return GetFamList(cessQuery.data?.benefits[0]?.idBenPlan.toString());
    } else {
      return {} as FamDefData[];
    }
  }

  async function GetFamList(benId: string) {
    const token = localStorage.getItem('jhi-authenticationToken');
    const res = await axios.get(REACT_APP_API_ENDPOINT + '/api/benefitFamily/' + benId, {
      headers: {
        method: 'GET',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      },
    });
    // //console.log('fetched famlist: ' + JSON.stringify(jsonObj));
    return res.data;
  }

  const famDefListQuery = useSylQuery<FamDefData[]>(fetchFamDefListObj, ['famdef', cessQuery.data?.benefits[0]?.idBenPlan.toString()], () =>
    !!cessQuery.data
  );

  //reuse for single-ftt query getter?
  // const refetchFamDefForm = (fams: FamDefFormFieldArray) => {
  //   const listFams = fams.FamilyTableFieldArray.map(f => f.noFttBen).join();
  //
  //   refetchWithFormVals<FamDefFormFields, FamDefData[]>(famDefListQuery, listFams, val => (cessQuery.data?.benefits[0]?.idBenPlan.toString(), 'FamilyTable');
  // };
  //#endregion

  //#region Modal Queries
  let queryParamModalCodeDesc = '';
  let currentModalQueryFetch: (v: string) => Promise<ModalCodeDescValues[]>;

  async function FetchAllFamTypes(): Promise<ModalCodeDescValues[]> {
    //console.log('MODAL FETCH ALL FAMS WITH PARAM:' + queryParamModalCodeDesc);
    const token = localStorage.getItem('jhi-authenticationToken');
    const res = await axios.get(REACT_APP_API_ENDPOINT + '/api/auxiliaryDescriptions/' + queryParamModalCodeDesc, {
      headers: {
        method: 'GET',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.data;
    const retObj = [] as ModalCodeDescValues[];
    (json as AuxDescData[]).forEach(aux =>
      retObj.push({
        CODE: aux.cdAux,
        DESCRIPTION: aux.dsAux1,
      } as ModalCodeDescValues)
    );
    return retObj;
  }

  async function FetchAllFamNoPerType(): Promise<ModalCodeDescValues[]> {
    //console.log('MODAL FETCH ALL FAMS WITH PARAM:' + queryParamModalCodeDesc);
    const token = localStorage.getItem('jhi-authenticationToken');
    const res = await axios.get(REACT_APP_API_ENDPOINT + '/api/auxiliaryDescription/TABTYP/' + queryParamModalCodeDesc, {
      headers: {
        method: 'GET',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.data;
    const retObj = [] as ModalCodeDescValues[];
    (json as AuxDescData[]).forEach(aux =>
      retObj.push({
        CODE: aux.cdAux,
        DESCRIPTION: aux.dsAux1,
      } as ModalCodeDescValues)
    );
    return retObj;
  }

  async function fetchModalCodeDesc(): Promise<ModalCodeDescValues[]> {
    return currentModalQueryFetch(queryParamModalCodeDesc);
  }

  const modalCodeDescQuery = useSylQuery<ModalCodeDescValues[]>(
    fetchModalCodeDesc,
    ['modalCodeDesc', queryParamModalCodeDesc ?? ''],
    () => false
  );

  const refetchModalCodeDesc = (inputVal: string) => {
    refetchWithFormVals<ModalCodeDescFields, ModalCodeDescValues[]>(
      modalCodeDescQuery,
      inputVal ?? '',
      val => (queryParamModalCodeDesc = val)
    );
  };
  //#endregion

  //#region MemTecs Query
  let queryParamNoFttForMemTec: string;

  async function fetchMemTecObj(): Promise<FttMemListData[]> {
    const tmpMemTecDataArray: FttMemListData[] = [];
    for (const f of famDefListQuery.data) {
      if (f) {
        queryParamNoFttForMemTec = f.noFttBen.toString();
        const tmpMemTecDat = await GetMemTec(queryParamNoFttForMemTec);
        tmpMemTecDat.cdTypFttBen = f.cdTypFttBen;
        // //console.log('fetched memtec for fam ' + f.noFttBen + ' val ' + JSON.stringify(tmpMemTecDat).substring(0, 1200));

        tmpMemTecDataArray.push(tmpMemTecDat);
      }
    }

    // //console.log('fetched memtec' + (tmpMemTecDataArray ? JSON.stringify(tmpMemTecDataArray).substring(0, 1500) : ''));
    return tmpMemTecDataArray;
  }

  async function GetMemTec(noFtt: string) {
    const token = localStorage.getItem('jhi-authenticationToken');
    const res = await axios.get(REACT_APP_API_ENDPOINT + '/api/familyMembers/' + queryParamNoFttForMemTec, {
      headers: {
        method: 'GET',
        credentials: 'include',
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.data;
    const retObj = {} as FttMemListData;
    retObj.members = json;
    return retObj;
  }

  const memTecQuery = useSylQuery<FttMemListData[]>(fetchMemTecObj, ['memTec', queryParamNoFttForMemTec], () =>
    !!famDefListQuery.data
  );
  //#endregion

  //#region Main Field definitions

  // #region Custom field types for this screen
  const dateChg = {
    type: FieldType.INPUT,
    name: 'Chg Dt',
    labelName: 'Change Date',
    width: '10rem',
    inputSubType: 'date',
  } as const;
  //#endregion

  const cessInfoSchema = [
    CESS_BASICS_FIELDS.cessionId, //Normal field obtained from block
    CESS_BASICS_FIELDS.noPol,
    CESS_BASICS_FIELDS.extNoPol,
    CESS_BASICS_FIELDS.cdProdCess,
    // InputField with a (fake here) attribute override
    {
      ...CESS_BASICS_FIELDS.cdPlanCess,
      displayOptions: { readOnly: false },
    } as const,
  ];

  const benInfoSchema = [
    CESS_BENEFITS_FIELDS.dtEffBen,
    dateChg, //Custom InputField defined above for this screen only
    CESS_BENEFITS_FIELDS.noTrtBenCess,
    CESS_BENEFITS_FIELDS.noTrtAddBenCess,
    CESS_BENEFITS_FIELDS.amtFaceBenCess,
    CESS_BENEFITS_FIELDS.amtFaceBenPrmCal,
    CESS_BENEFITS_FIELDS.amtReinBenCess,
    CESS_BENEFITS_FIELDS.cdBenCess,
    CESS_BENEFITS_FIELDS.benefitNumber,
    CESS_BENEFITS_FIELDS.agePricedBenCess,
    CESS_BENEFITS_FIELDS.cdSmoPricedBenCess,
    CESS_BENEFITS_FIELDS.cdGenPricedBenCess,
    CESS_BENEFITS_FIELDS.pcRatingBenCess,
    CESS_BENEFITS_FIELDS.cdClsPricedBenCess,
    CESS_BENEFITS_FIELDS.pcCola,
    CESS_BENEFITS_FIELDS.cdTypDis,
    CESS_BENEFITS_FIELDS.cdOccPricedBenCess,
    CESS_BENEFITS_FIELDS.duBen,
    CESS_BENEFITS_FIELDS.cdDuCov,
    CESS_BENEFITS_FIELDS.duWai,
    CESS_BENEFITS_FIELDS.cdDuWai,
  ];

  const scheduleInfoSchema = [
    CESS_BEN_SEQ_SCHEDULE_FIELDS.seqSchedBenDu,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.seqSchedBenPer,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.amtSchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.prmSchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.comSchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.xprSchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.xcmSchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.pfSchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.bnsSchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.cbSchUpdTs,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.estRealFlg,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.ex1SchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.ex2SchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.ex3SchedBen,
    CESS_BEN_SEQ_SCHEDULE_FIELDS.lavSchedBen,
  ];

  const familyInfoSchema = [
    FAM_DEF_FIELDS.cdTypFttBen,
    {
      type: FieldType.BUTTON,
      name: 'cdTypFttBen_BUTTON',
      labelName: '',
      buttonText: '...',
      //Fetch static list of family types
      onClick: (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
        //console.log(('clicked modal button: ' + FamForm.getValues(id.replace('_BUTTON', ''))) as keyof FamDefFormFieldArray);

        queryParamModalCodeDesc = FamForm.getValues(id.replace('_BUTTON', '') as keyof FamDefFormFieldArray) as string;
        currentModalQueryFetch = FetchAllFamTypes;
        refetchModalCodeDesc('TABTYP');

        setModalFamInfo({
          name: 'cdTypFttBen',
          pickedValDestination: id.replace('_BUTTON', '') as keyof FamDefFormFieldArray,
          returnIndex: extractIndexFromFieldName(id),
        });
        modalDisclosure.onOpen();
      },
    } as const,
    FAM_DEF_FIELDS.noFttBen,
    {
      type: FieldType.BUTTON,
      name: 'noFttBen_BUTTON',
      labelName: '',
      buttonText: '...',
      //Fetch dynamic list of family numbers based on current family type (required)
      onClick: (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        // FAM_DEF[Number(id.match(/\.\d\./)[0].substring(2,3))]
        const famParam = FamForm.getValues(id.substring(0, id.lastIndexOf('.')) + '.cdTypFttBen') as string;
        //console.log('famparam: ' + id.substring(0, id.lastIndexOf('.')) + '.cdTypFttBen' + ' ' + famParam);

        queryParamModalCodeDesc = famParam;

        currentModalQueryFetch = FetchAllFamNoPerType;
        refetchModalCodeDesc(queryParamModalCodeDesc);

        // refetchFamDefForm(formVals);
        setModalFamInfo({
          name: 'noFttBen',
          pickedValDestination: id.replace('_BUTTON', '') as keyof FamDefFormFieldArray,
          returnIndex: extractIndexFromFieldName(id),
        });
        modalDisclosure.onOpen();
      },
    } as const,
    FAM_DEF_FIELDS.cdMethFttBen,
    {
      type: FieldType.BUTTON,
      name: 'cdMethFttBen_BUTTON',
      labelName: '',
      buttonText: '...',
      onClick: (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        setModalFamInfo({
          name: 'METH_FTT',
          pickedValDestination: id.replace('_BUTTON', '') as keyof FamDefFormFieldArray,
          returnIndex: extractIndexFromFieldName(id),
        });
        modalDisclosure.onOpen();
      },
    } as const,
    FAM_DEF_FIELDS.methFttArg1,
    FAM_DEF_FIELDS.methFttArg2,
    FAM_DEF_FIELDS.methFttArg3,
    FAM_DEF_FIELDS.methFttArg4,
    FAM_DEF_FIELDS.methFttArg5,
    {
      type: FieldType.INPUT,
      name: 'CD_SCC_ECC',
      labelName: 'SCC',
      width: '2em',
      inputSubType: 'string',
      displayOptions: { noLabel: true },
    } as const,
  ];

  //Create a list of pairs of MEMDEF+TABTEC that fit on a line
  //by fetching those table objects based on
  const memInfoSchema = [
    MEMDEF_FIELDS.cdGenMtt,
    MEMDEF_FIELDS.cdSmoMtt,
    MEMDEF_FIELDS.pcMinMortMtt,
    MEMDEF_FIELDS.pcMaxMortMtt,
    MEMDEF_FIELDS.minAmtMtt,
    MEMDEF_FIELDS.maxAmtMtt,
    MEMDEF_FIELDS.cdClsMtt,
    MEMDEF_FIELDS.cdOccMtt,
    MEMDEF_FIELDS.duMinXprMtt,
    MEMDEF_FIELDS.duMaxXprMtt,
    MEMDEF_FIELDS.pcTecht,
  ];

  const tabTecInfoSchema = [
    TABTEC_FIELDS.noTecht,
    TABTEC_FIELDS.minAgeBandTecht,
    TABTEC_FIELDS.maxAgeBandTecht,
    TABTEC_FIELDS.valTecht,
    MEMDEF_FIELDS.pcTecht,
  ];

  const FULL_NAME = {
    type: FieldType.INPUT,
    name: 'lifeName',
    labelName: 'Life Name',
    width: '12em',
    inputSubType: 'string',
  } as const;

  const insuredInfoSchema = [
    { ...INSURED_LIVES_FIELDS.idPerson, name: 'personId' } as const,
    FULL_NAME,
    { ...INSURED_LIVES_FIELDS.cdGenPerson, name: 'gender' } as const,
    CESS_INSURED_LIVES_FIELDS.cdClsPersonCess,
    { ...CESS_INSURED_LIVES_FIELDS.cdSmoPersonCess, name: 'smoker' } as const,
    { ...CESS_INSURED_LIVES_FIELDS.ratingPersonCess, name: 'rate' } as const,
    { ...CESS_INSURED_LIVES_FIELDS.cdOccPerson, name: 'occupationCode' } as const,
  ];
  //endregion

  //#region form types
  type CessFormFields = FieldNameListType<typeof cessInfoSchema>;
  type BenFormFields = FieldNameListType<typeof benInfoSchema>;
  type InsuredFormFields = FieldNameListType<typeof insuredInfoSchema>;

  type FamDefFormFields = FieldNameListType<typeof familyInfoSchema>;
  type FamDefFormFieldArray = { FamilyTableFieldArray: FamDefFormFields[] };

  type MemFormFields = FieldNameListType<typeof memInfoSchema>;
  type MemFormFieldArray = { FamilyTableFieldArray: MemFormFields[] };
  type TabTecFormFields = FieldNameListType<typeof tabTecInfoSchema>;
  type TabTecFormFieldArray = { FamilyTableFieldArray: TabTecFormFields[] };

  type SeqSchedFormFields = FieldNameListType<typeof scheduleInfoSchema>;
  type SeqSchedFormFieldArray = { SchedTableFieldArray: SeqSchedFormFields[] };

  interface BenefitFamList {
    benefitFamilies: FamDefFormFieldArray;
  }

  type CalcPayload = CessFormFields &
    BenFormFields & {
      benefitFamilies: (FamDefFormFields & { benefitId: number })[];
    };

  const CessForm = useForm();
  const BenForm = useForm();
  const FamForm = useForm();

  const FamModalForm = useForm();
  //For Mem/Tec forms, see the "MemTecBlocks()" body
  const Insured1Form = useForm();
  const Insured2Form = useForm();
  const SeqSchedForm = useForm();

  const FamFieldArray = useSylFieldArray(FamForm, 'FamilyTable');

  const resetForms = () => {
      setQueryMode(true);
      //TODO: understand why fam/seqForm need to be manually reset and not MemTecForm
      FamForm.reset();
      SeqSchedForm.reset();
    };

  function useToastOnErrWithReset(props: UseToastOptions) {
      queryErrToast(props);
      resetForms();
    }
  //Optional way to expose the field array in the parent level of a TableBlock child component, otherwise allow the TableBlock to create this fieldarray
  function useSylFieldArray(
    formHook: UseFormReturn<FieldValues, any, undefined>,
    name: string
  ): UseFieldArrayReturn<FieldValues, string, 'id'> {
    return useFieldArray({
      control: formHook.control,
      name: name + 'FieldArray',
      shouldUnregister: true,
    });
  }

  //#endregion

  //Modal state management, only one Modal (List of Values) can be shown at once
  const [modalFamInfo, setModalFamInfo] = useState(
    {} as {
      name: string;
      pickedValDestination: keyof FamDefFormFieldArray;
      returnIndex: number;
    }
  );
  const modalDisclosure = useDisclosure();

  //Main state to determine if we're displaying fetched data or not.
  const [queryMode, setQueryMode] = useState(true);
  const [familyList, setFamilyList] = useState([]);

  interface FlatInsuredLifeData {
    cessionId: number;
    personId: number;
    lifeName: string;
    dateOfBirth: Date;
    gender: string;
    smoker: string;
    rate: number;
    occupationCode: string;
  }

  const FlattenedInsuredData = (ins: InsuredLivesData): FlatInsuredLifeData => {
    const flatIns = {} as FlatInsuredLifeData;
    if (ins && ins.insuredLife) {
      flatIns.cessionId = ins.cessionId;
      flatIns.personId = ins.insuredLife.personId;
      flatIns.lifeName = ins.insuredLife.surnameAtBirth + ', ' + ins.insuredLife.firstName;
      flatIns.gender = ins.insuredLife.gender;
      flatIns.smoker = ins.smoker;
      flatIns.rate = ins.rate;
      flatIns.occupationCode = ins.occupationCode;
    }
    return flatIns;
  };

  interface MemProp {
    fmd: FttMemListData;
    usedIndex: number;
  }

  function MemBlock(family: MemProp) {
    const MemTecForm = useForm();
    let calcHeight = 8;
    if (family?.fmd?.members && family.fmd.members.length > 0) {
      if (family.fmd.members?.length > 4) {
        calcHeight = 8;
      } else {
        calcHeight = Math.max(family.fmd?.members.length * 2, 3);
      }
    } else {
      calcHeight = 8;
    }
    //console.log('row to highlight for ' + family.fmd.cdTypFttBen + ' ' + family.usedIndex);
    return (
      <TableBlock<MemData, MemFormFieldArray>
        formMethods={MemTecForm}
        name="MemTable"
        fieldDefs={memInfoSchema}
        fetchedData={family?.fmd.members ? family.fmd.members : ({} as MemData[])}
        hideQueryButtons={true}
        defaultRowCount={4}
        keyFieldNames={[
          'noFtt',
          'cdGenMtt',
          'cdSmoMtt',
          'pcMinMortMtt',
          'pcMaxMortMtt',
          'minAmtMtt',
          'maxAmtMtt',
          'cdClsMtt',
          'duMinXprMtt',
          'duMaxXprMtt',
          'pcTecht',
          'noTecht',
          'cdOccMtt',
        ]}
        highlightedRowIds={[family.usedIndex]}
        padding={'0.1em'}
        height={`${calcHeight}em`}
        overflowY="scroll"
      />
    );
  }

  function TecBlock(family: MemProp) {
    const TabTecForm = useForm();
    let calcHeight = 8;
    if (family?.fmd?.members && family.fmd.members.length > 0) {
      if (family.fmd.members[family.usedIndex].memberRates?.length > 4) {
        calcHeight = 8;
      } else {
        calcHeight = Math.max(family.fmd?.members[family.usedIndex].memberRates?.length * 2, 3);
      }
    } else {
      calcHeight = 8;
    }

    return (
      <TableBlock<TecData, TabTecFormFieldArray>
        formMethods={TabTecForm}
        name="TecTable"
        fieldDefs={tabTecInfoSchema}
        //TODO:SELECT PROPER MEMBER BASED ON CESS DATA?
        fetchedData={
          family?.fmd?.members && family.fmd.members.length > 0
            ? family.fmd.members[family.usedIndex].memberRates ?? ({} as TecData[])
            : ({} as TecData[])
        }
        hideQueryButtons={true}
        defaultRowCount={4}
        keyFieldNames={['noFtt', 'noTecht', 'minAgeBandTecht', 'maxAgeBandTecht', 'minPolyrBandTecht', 'maxPolyrBandTecht']}
        padding={'0.1em'}
        height={`${calcHeight}em`}
        overflowY="scroll"
      />
    );
  }

  function MemTecBlocks(fttMemList: FttMemListData[]) {
    let newSortedMemTecData: FttMemListData[] = [{}] as FttMemListData[];

    type Predicate<T> = (obj: T) => boolean;
    let calcFace = Math.max(cessQuery.data?.benefits[0].amtFaceBenCess, cessQuery.data?.benefits[0].amtFaceBenPrmCal ?? 0);
    const isInsideFaceAmt: Predicate<MemData> = (m: MemData) => calcFace >= m.minAmtMtt && calcFace <= m.maxAmtMtt;
    const isInsideMort: Predicate<MemData> = (m: MemData) =>
      cessQuery.data?.benefits[0].pcRatingBenCess >= m.pcMinMortMtt && cessQuery.data?.benefits[0].pcRatingBenCess <= m.pcMaxMortMtt;
    const isMatchedRisk: Predicate<MemData> = (m: MemData) =>
      m.cdClsMtt == 'AL' || m.cdClsMtt == cessQuery.data.benefits[0].cdClsPricedBenCess;
    const isMatchedOcc: Predicate<MemData> = (m: MemData) =>
      m.cdOccMtt == 'AL' || m.cdOccMtt == (cessQuery.data.benefits[0].cdOccPricedBenCess ?? 'XX');
    const isMatcheGender: Predicate<MemData> = (m: MemData) =>
      m.cdGenMtt == 'CO' || m.cdGenMtt == (cessQuery.data.benefits[0].cdGenPricedBenCess ?? 'XX');
    const isMatcheSmoker: Predicate<MemData> = (m: MemData) =>
      m.cdSmoMtt == 'CO' || m.cdSmoMtt == (cessQuery.data.benefits[0].cdSmoPricedBenCess ?? 'XX');

    //First, filter against most member criteria except gender and smoker. Second, run the remaining filters to find the exact member to use
    const memberViewFilters: Predicate<MemData>[] = [isInsideFaceAmt, isInsideMort, isMatchedRisk, isMatchedOcc];
    const memberRemainingFilters: Predicate<MemData>[] = [isMatcheGender, isMatcheSmoker];

    if (fttMemList && fttMemList[0] !== ({} as FttMemListData)) {
      //always sort family blocks so that PRM/COM are first
      fttMemList.sort((fma, fmb) => {
        return (fma.cdTypFttBen == 'PRM' ? 'AAAA' : fma.cdTypFttBen == 'COM' ? 'AAAB' : fma.cdTypFttBen) <
          (fmb.cdTypFttBen == 'PRM' ? 'AAAA' : fmb.cdTypFttBen == 'COM' ? 'AAAB' : fmb.cdTypFttBen)
          ? -1
          : 1;
      });

      // //console.log('procmemtecs:' + (fttMemList ? JSON.stringify(fttMemList?.map(f => f.cdTypFttBen)) : 'null')
      //   + ' with ' + (fttMemList ? fttMemList[0]?.members?.length : '0')
      //   + ' members and ' + (fttMemList[0]?.members ? fttMemList[0]?.members[0]?.memberRates?.length : '0') + ' rates per member');
      newSortedMemTecData = [] as FttMemListData[];

      fttMemList.forEach(md => {
        for (let f of memberViewFilters) {
          md.members = md.members?.filter(f);
        }

        newSortedMemTecData.push({
          cdTypFttBen: md.cdTypFttBen,
          members: md.members?.sort((a, b) => {
            if (a.cdGenMtt < b.cdGenMtt) return 1;
            if (a.cdSmoMtt < b.cdSmoMtt) return 1;
            if (a.pcMinMortMtt < b.pcMinMortMtt) return 1;
            if (a.pcMaxMortMtt < b.pcMaxMortMtt) return 1;
            if (a.minAmtMtt < b.minAmtMtt) return 1;
            if (a.maxAmtMtt < b.maxAmtMtt) return 1;
            if (a.cdClsMtt < b.cdClsMtt) return 1;
            if (a.cdOccMtt < b.cdOccMtt) return 1;
            if (a.duMinXprMtt < b.duMinXprMtt) return 1;
            if (a.duMaxXprMtt < b.duMaxXprMtt) return 1;
            if (a.pcTecht < b.pcTecht) return 1;
          }),
        });
      });

      // //console.log('procmemtecssorted:' + (fttMemList ? JSON.stringify(fttMemList?.map(f => f.cdTypFttBen)) : 'null')
      //   + ' with ' + (fttMemList ? fttMemList[0]?.members?.length : '0')
      //   + ' members and ' + (fttMemList[0]?.members ? fttMemList[0]?.members[0]?.memberRates?.length : '0') + ' rates per member');
    }

    // if (JSON.stringify(sortedMemTecData) != JSON.stringify(newSortedMemTecData)) setSortedMemTecData(newSortedMemTecData);

    return newSortedMemTecData.map(fmd => {
      const containerName = fmd?.members?.length > 0 ? fmd?.cdTypFttBen + ' ' + fmd?.members[0].noFtt.toString() : 'Fam';
      // //console.log('membercheck length:' + fmd?.members?.length + ' notechts:' + JSON.stringify(fmd?.members?.map(f => f.noTecht)));
      let indexToUse = 0;

      fmd.members?.forEach(m => {
        if (memberRemainingFilters.every(mf => mf(m))) indexToUse = fmd.members.indexOf(m);
      });

      return (
        <ContainerBlock key={containerName} name={containerName} contentDisplay="flex">
          <MemBlock fmd={fmd} usedIndex={indexToUse} />
          <TecBlock fmd={fmd} usedIndex={indexToUse} />
        </ContainerBlock>
      );
    });
  }

  function CombineCessFam(): CalcPayload {
    // //console.log('getfieldstype' + JSON.stringify(CessForm.))
    // //console.log('cess vals: ' + JSON.stringify(CessForm.getValues()));
    // //console.log('ben vals: ' + JSON.stringify(BenForm.getValues()));
    // //console.log('famdef vals: ' + JSON.stringify(FamForm.getValues()));
    // //console.log('t:' + (typeof BenForm.getValues()).toString());

    let calcPayloadObj: CalcPayload = {
      ...(CessForm.getValues() as CessFormFields),
      ...(BenForm.getValues() as BenFormFields),
      benefitFamilies: FamForm.getValues().FamilyTableFieldArray as (FamDefFormFields & { benefitId: number })[],
    };
    if (calcPayloadObj.cessionId) {
      // calcPayloadObj.cessionId = '-'+calcPayloadObj.cessionId
      calcPayloadObj.benefitFamilies.forEach(f => (f.benefitId = -Math.abs(f.benefitId)));
    }

    // //console.log('combined vals: ' + JSON.stringify(calcPayloadObj));
    return calcPayloadObj;
  }

  return (
    <>
      <ContainerBlock className={ContainerType.ScreenContainer} name={translate('premium-simulator.screen-header-title')}>
        <Grid templateRows="0.6fr 1fr 0.5fr 0.8fr" templateColumns="0.1fr 0.4fr 0.4fr" gap="0.4em">
          <GridItem width="17.4em" area={'1/1/3/2'}>
            <ContainerBlock name="Cession Info">
              <FormBlock<CessionData, CessFormFields>
                formMethods={CessForm}
                name="CessionForm"
                fields={cessInfoSchema}
                fetchedData={!queryMode ? cessQuery.data ?? ({} as CessionData) : ({} as CessionData)}
                submitQueryCallback={refetchWithCessFormVals}
                resetCallback={() => resetForms()}
              />
            </ContainerBlock>
          </GridItem>
          <GridItem width="17.4em" area={'2/1/3/2'}>
            <ContainerBlock name="Benefit Info">
              <FormBlock<BenefitData, BenFormFields>
                formMethods={BenForm}
                name="BenefitForm"
                fields={benInfoSchema}
                fetchedData={!queryMode ? cessQuery.data?.benefits[0] ?? ({} as BenefitData) : ({} as BenefitData)}
                hideQueryButtons={true}
              />
            </ContainerBlock>
          </GridItem>
          <GridItem area={'1/2/3/3'} width="50em">
            <ContainerBlock name="Family Info">
              {/*reusable, singular modal component to fill and use based on which button calls it*/}
              <ModalTableCodeDesc
                formMethods={FamModalForm}
                name={modalFamInfo.name}
                disclosure={modalDisclosure}
                onOpen={() => (queryParamModalCodeDesc = modalFamInfo.name)}
                onClose={() => {
                  //console.log('modal onClose');
                  // queryParamModalCodeDesc = "";
                  // modalCodeDescQuery.data = {} as ModalCodeDescValues[];
                  // FamModalForm.reset();
                  // FamModalForm.unregister();
                  // modalDisclosure.onClose();
                }}
                onValuePicked={(rowInfo: SelectedRowInfo<ModalCodeDescFields>) => {
                  //console.log('selected ' + rowInfo.rowData.CODE + ' into ' + modalFamInfo.pickedValDestination);
                  //console.log(typeof modalFamInfo.pickedValDestination);
                  let fieldPrefix =
                    modalFamInfo.pickedValDestination.substring(0, modalFamInfo.pickedValDestination.lastIndexOf('.')) + '.';
                  switch (modalFamInfo.name) {
                    case 'cdTypFttBen':
                      //console.log('resetting fieldarray at: ' + modalFamInfo.returnIndex);
                      FamForm.setValue(fieldPrefix + 'noFttBen', '');
                      FamForm.setValue(fieldPrefix + 'cdMethFttBen', '');
                      FamForm.setValue(fieldPrefix + 'methFttArg1', '');
                      FamForm.setValue(fieldPrefix + 'methFttArg2', '');
                      FamForm.setValue(fieldPrefix + 'methFttArg3', '');
                      FamForm.setValue(fieldPrefix + 'methFttArg4', '');
                      FamForm.setValue(fieldPrefix + 'methFttArg5', '');
                      break;
                    case 'noFttBen':
                      break;
                    default:
                  }
                  FamForm.setValue(modalFamInfo.pickedValDestination, rowInfo.rowData.CODE);
                }}
                fetchedData={!queryMode ? modalCodeDescQuery.data ?? ({} as ModalCodeDescValues[]) : ({} as ModalCodeDescValues[])}
              ></ModalTableCodeDesc>
              <TableBlock<FamDefData, FamDefFormFieldArray>
                formMethods={FamForm}
                formFieldArray={FamFieldArray}
                name="FamilyTable"
                fieldDefs={familyInfoSchema}
                fetchedData={!queryMode ? famDefListQuery.data : ({} as FamDefData[])}
                defaultRowCount={4}
                keyFieldNames={['noFttBen']}
                height="9.4em"
                overflowY={'scroll'}
              />
            </ContainerBlock>
          </GridItem>
          <GridItem area={'2/2/4/3'} width="84em" height="20em">
            <ContainerBlock name="MemTecInfo" contentDisplay="flex" flexDirection="column" overflowY="scroll" height="26em">
              {!queryMode ? (
                !memTecQuery.isFetching && memTecQuery.data && memTecQuery.data.length > 0 ? (
                  MemTecBlocks(memTecQuery.data)
                ) : (
                  <Stack>
                    {[...Array(16)].map((e, i) => (
                      <Skeleton key={`MemSkeleton_${i}`} startColor={'gray.300'} endColor={'blue.600'} height={'1em'}></Skeleton>
                    ))}
                  </Stack>
                )
              ) : (
                MemTecBlocks([{} as FttMemListData] as FttMemListData[])
              )}
              {/*{MemTecBlock({} as FttMemListData)}*/}
            </ContainerBlock>
          </GridItem>
          {
            <GridItem area={'3/1/3/1'}>
              <Tabs>
                <TabList>
                  <Tab>Insured 1</Tab>
                  <Tab>Insured 2</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <FormBlock<FlatInsuredLifeData, InsuredFormFields>
                      formMethods={Insured1Form}
                      name="Insured1Form"
                      fields={insuredInfoSchema}
                      fetchedData={!queryMode ? FlattenedInsuredData(cessQuery.data?.insuredLives[0]) : ({} as FlatInsuredLifeData)}
                      hideQueryButtons={true}
                    />
                  </TabPanel>
                  <TabPanel>
                    <FormBlock<FlatInsuredLifeData, InsuredFormFields>
                      formMethods={Insured2Form}
                      name="Insured2Form"
                      fields={insuredInfoSchema}
                      fetchedData={!queryMode ? FlattenedInsuredData(cessQuery.data?.insuredLives[1]) : ({} as FlatInsuredLifeData)}
                      hideQueryButtons={true}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Button
                bgColor={'orange'}
                color={'white'}
                onClick={() => {
                  refetchWithCalcFormVals(CombineCessFam());
                }}
              >
                Calculate Premium
              </Button>
            </GridItem>
          }

          <GridItem area={'4/1/6/4'} width="102em">
            <ContainerBlock name="ScheduleInfo">
              {!calcQuery.isFetching ? (
                <TableBlock<SeqScheduleData, SeqSchedFormFieldArray>
                  formMethods={SeqSchedForm}
                  name="ScheduleTable"
                  fieldDefs={scheduleInfoSchema}
                  fetchedData={!queryMode && calcQuery.data ? calcQuery.data.seqSchedules : ({} as SeqScheduleData[])}
                  defaultRowCount={7}
                  keyFieldNames={['noSched', 'seqSchedBenDu', 'seqSchedBenPer']}
                  overflowX="scroll"
                />
              ) : (
                <Stack>
                  {[...Array(5)].map((e, i) => (
                    <Skeleton key={`SchedSkeleton_${i}`} startColor={'gray.300'} endColor={'blue.600'} height={'1em'}></Skeleton>
                  ))}
                </Stack>
              )}
            </ContainerBlock>
          </GridItem>
        </Grid>
      </ContainerBlock>
    </>
  );
}

SimulateurPrime.whyDidYouRender = true;

export default SimulateurPrime;
