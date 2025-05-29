import { indexAircraftModels } from "./apis/index_aircraft_models";
import { storeAircraftModel } from "./apis/store_aircraft_model";

export const AircraftModelRepo = {
  index_aircraft_models: async (activePage) => await indexAircraftModels(activePage),
  store_aircraft_model: async (data) => await storeAircraftModel(data),
};
