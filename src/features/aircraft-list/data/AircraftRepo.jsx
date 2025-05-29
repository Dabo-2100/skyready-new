import { deleteAircraft } from "./apis/delete_aircraft";
import { indexAircraft } from "./apis/index_aircraft";
import { showAircraft } from "./apis/show_aircraft";
import { storeAircraft } from "./apis/store_airctaft";

export const AircraftRepo = {
  index_aircraft: async (activePage = 1, modelId = null) => await indexAircraft(activePage, modelId),
  show_aircraft: async (id) => await showAircraft(id),
  store_aircraft: async (data) => await storeAircraft(data),
  delete_aircraft: async (id) => await deleteAircraft(id),
};
