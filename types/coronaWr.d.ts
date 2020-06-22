export type CoronaWr = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: Item;
      };
      totalCount: number;
    };
  };
};

export type Item = [
  {
    areaNm: string;
    areaNmCn: string;
    areaNmEn: string;
    createDt: string;
    natDeathCnt: number;
    natDeathRate: number;
    natDefCnt: number;
    nationNm: string;
    nationNmCn: string;
    nationNmEn: string;
    seq: number;
    qurRate: number | string;
    stdDay: string;
  }
];
