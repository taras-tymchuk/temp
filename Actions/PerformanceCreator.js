import {
    LOAD_PERFORMANCE_BEGIN,
    LOAD_PERFORMANCE_SUCCESS,
    LOAD_PERFORMANCE_FAILURE,
} from "./PerformanceTypes";
import BASE_URL from 'TheaterSchedule/baseURL';

export const loadPerformanceBegin = () => ({
    type: LOAD_PERFORMANCE_BEGIN,
});

export const loadPerformanceSuccess = (performance) => ({
    type: LOAD_PERFORMANCE_SUCCESS,
    payload: { performance },
});

export const loadPerformanceFailure = (error) => ({
    type: LOAD_PERFORMANCE_FAILURE,
    payload: { error },
});

export const loadPerformance = (performanceId, languageCode) => {
    return dispatch => {
        dispatch(loadPerformanceBegin());
        let url = `${BASE_URL}PerformanceDetails/${languageCode}/GetInfo?id=${performanceId}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                dispatch(loadPerformanceSuccess(responseJson));
            })
            .catch(error => { dispatch(loadPerformanceFailure(error)) });
    };
};