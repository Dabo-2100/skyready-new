import { indexAircraftManudacturers } from "./apis/index_manufacturers";
import { storeAircraftManufacturer } from "./apis/store_manufacturer";
import { showAircraftManufacturer } from "./apis/show_manufacturer";
import { updateAircraftManufacturer } from "./apis/update_manufacturer";
import { deleteAircraftManufacturer } from "./apis/delete_manufacturer";

export const AircraftManufacturerRepo = {
  index_manufacturers: async (activePage) => await indexAircraftManudacturers(activePage),
  store_manufacturer: async (data) => await storeAircraftManufacturer(data),
  show_manufacturer: async (id) => await showAircraftManufacturer(id),
  update_manufacturer: async (id, data) => await updateAircraftManufacturer(id, data),
  delete_manufacturer: async (id) => await deleteAircraftManufacturer(id),
};
