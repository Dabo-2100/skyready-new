import { indexAircraftManudacturers } from "./apis/index_aircraft_manufacturers";
import { indexAircraft } from "./apis/index_aircraft";
import { indexAircraftModels } from "./apis/index_aircraft_models";
import { showAircraft } from "./apis/show_aircraft";
import { indexAircraftStatuses } from "./apis/index_aircraft_statuses";
import { indexAircraftUsages } from "./apis/index_aircraft_usages";

export const AircraftRepo = {
    index_aircraft: async (activePage = 1, modelId = null) => await indexAircraft(activePage, modelId),
    show_aircraft: async (id) => await showAircraft(id),
    index_aircraft_models: async () => await indexAircraftModels(),
    index_aircraft_manudacturers: async () => await indexAircraftManudacturers(),
    index_aircraft_statuses: async () => await indexAircraftStatuses(),
    index_aircraft_usages: async () => await indexAircraftUsages(),
}