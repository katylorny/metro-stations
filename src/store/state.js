export default {
    // идет загрузка, ошибка загрузки
    isLoading: false,
    isError: false,

    // станции
    stations: [],
    stationsInputValue: '',
    selectedStationId: null,

    // остановки
    stops: [],
    stopsInputValue: '',
    selectedStopId: null,

    // тип объекта, по которому кликнули
    selectedType: ''
}