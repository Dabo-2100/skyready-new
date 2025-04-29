import { api } from "../../../../zustand-store";

export const indexAircraft = async (activePage = 1, modelId = null) => {
    return await api.post('', {
        query: `query Aircraft_model($pagination: PaginationArg, $sort: [String], $filters: AircraftFiltersInput) {
            aircraftList (pagination: $pagination, sort: $sort, filters: $filters) {
                documentId registrationNo serialNo tailNo
                aircraft_model {name}
                aircraft_status {name bgColor}
                aircraft_usage {name}
            }
        }`,
        variables: {
            pagination: {
                page: activePage,
                pageSize: 25
            },
            sort: ["serialNo", "aircraft_model.name"],
            filters: modelId ? { aircraft_model: { documentId: { eq: modelId } } } : undefined
        }
    }).then((res) => res.data.data.aircraftList);
}


