"use client";

import { useEffect } from "react";

type Activity = {
  id: number;
  start_date: string;
  distance: number;
};

export function AddToLocalStorage(activities: Activity[]) {
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  });

  return <div>Data Updated</div>;
}
