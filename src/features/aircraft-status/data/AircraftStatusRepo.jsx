import { indexAircraftStatuses } from "./apis/index_aircraft_statuses";

export const AircraftStatusRepo = {
  index_aircraft_statuses: async (activePage) => await indexAircraftStatuses(activePage),
};
