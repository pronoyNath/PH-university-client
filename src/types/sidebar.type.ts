import { ReactNode } from "react";

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
}| undefined;

export type TItem = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TItem[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TRole = string;
