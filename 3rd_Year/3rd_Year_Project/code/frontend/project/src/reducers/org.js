import{
    MAKE_REPORT_FAIL,
    MAKE_REPORT_SUCCESS,
    LOAD_ORG_REPORTS_FAIL,
    LOAD_ORG_REPORTS_SUCCESS,
    LOAD_USER_REPORTS_SUCCESS,
    LOAD_USER_REPORTS_FAIL,
} from '../actions/types';

//org_reports
const initailSate = {
    org_reports: [],
}

export default function(state = initailSate, action) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_ORG_REPORTS_SUCCESS:
            return {
                ...state,
                org_reports: payload.org_reports,
            }
        case LOAD_USER_REPORTS_SUCCESS:
            return {
                ...state,
                user_reports: payload.user_reports,
            }
        case MAKE_REPORT_SUCCESS:
        case LOAD_ORG_REPORTS_FAIL:
        case MAKE_REPORT_FAIL:
        case LOAD_USER_REPORTS_FAIL:
            return {
                ...state
            }
        default:
            return{
                ...state
            }
    }
};