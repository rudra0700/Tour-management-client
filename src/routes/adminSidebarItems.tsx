import { AddTour, AddTourType, Analytics } from "@/lazyComponent";
import { AddDivision } from "@/pages/Admin/AddDivision";
import type { ISidebarItems } from "@/types";

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/super-admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        url: "/super-admin/add-tour",
        component: AddTour,
      },
      {
        title: "Add Tour Type",
        url: "/super-admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Division",
        url: "/super-admin/add-division",
        component: AddDivision,
      },
    ],
  },
];
