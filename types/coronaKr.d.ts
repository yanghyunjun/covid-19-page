export type CoronaKR = {
  accDefRate: number;
  accExamCnt: number;
  accExamCompCnt: number;
  careCnt: number;
  clearCnt: number;
  createDt: string;
  deathCnt: number;
  decideCnt: number;
  examCnt: number;
  resutlNegCnt: number;
  seq: number;
  stateDt: number;
};

export type CoronaSideKR = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Item;
      };
    };
  };
};

export type Item = [
  {
    createDt: string;
    deathCnt: number;
    defCnt: number;
    gubun: string;
    gubunCn: string;
    gubunEn: string;
    incDec: number;
    isolClearCnt: number;
    isolIngCnt: number;
    localOccCnt: number;
    overFlowCnt: number;
    qurRate: number | string;
    seq: number;
    stdDay: string;
  }
];
