import { filterSpareParts } from "./api/filter_spare_parts";
import { indexSpareParts } from "./api/index_spare_parts";

export const SparePartsRepo = {
  index_spare_parts: async (activePage) => await indexSpareParts(activePage),
  filter_spare_parts: async (filterType, searchValue) => await filterSpareParts(filterType, searchValue),
};
