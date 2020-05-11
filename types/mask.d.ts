export type MaskType = {
  address: string;
  count: number;
  stores: Stores;
};
export type Stores = [
  {
    addr: string;
    code: string;
    created_at: string;
    name: string;
    remain_stat: string;
    stock_at: string;
  }
];
