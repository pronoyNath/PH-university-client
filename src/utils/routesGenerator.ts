import { ReactNode } from "react";

type TRoute = {
  path: string;
  element: ReactNode;
};

type TItem = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TItem[];
};

export const routesGenerator = (items: TItem[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path!, //"!" means here will never be null [TS]
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);
  return routes;
};
