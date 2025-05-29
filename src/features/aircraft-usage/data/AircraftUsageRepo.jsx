import { indexAircraftUsages } from "./apis/index_aircraft_usages";

export const AircraftUsageRepo = {
  index_aircraft_usages: async (activePage) => await indexAircraftUsages(activePage),
};
