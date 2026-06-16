import { Settings } from "../api";

export const isBetDelay = (placeBetValues) => {
  if (
    placeBetValues?.btype === "FANCY" &&
    placeBetValues?.eventTypeId === "4"
  ) {
    return false;
  }
  if (
    placeBetValues?.eventTypeId === "1" ||
    placeBetValues?.eventTypeId === "2"
  ) {
    return false;
  }

  return Settings.bet_delay;
};

export const isDelay = (placeBetValues) => {
  if (
    placeBetValues?.btype === "FANCY" &&
    placeBetValues?.eventTypeId === "4"
  ) {
    return false;
  }
  if (
    placeBetValues?.eventTypeId === "1" ||
    placeBetValues?.eventTypeId === "2"
  ) {
    return false;
  }
  return true;
};
