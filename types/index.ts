// src/types.ts

export type Item = {
  name: string;
  amount: number;
  createdAt: string;
  bought: boolean;
};

export type ListResponse = {
  title: string;
  items: Item[];
  id: string;
};
