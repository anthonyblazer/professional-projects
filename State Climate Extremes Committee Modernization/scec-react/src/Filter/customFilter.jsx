import React from "react";
import elements from "../data/elements.json";

export function customFilter(arr, filterState, filterElement) {
  return arr.filter((record) => {
    const currentElementAbbr = elements[record.element_seq].abbr;

    const stateMatch =
      filterState === "all" || record.state === filterState.toUpperCase();
    const elementMatch =
      filterElement === "all" || filterElement === currentElementAbbr;

    return stateMatch && elementMatch;
  });
}