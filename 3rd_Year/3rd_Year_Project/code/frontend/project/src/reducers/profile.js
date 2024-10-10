import {LOAD_USER_PROFILE_SUCCESS, LOAD_PROFILE_FAIL,
    UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_SUCCESS, LOAD_ORG_PROFILE_SUCCESS, LOAD_VET_PROFILE_SUCCESS, UPDATE_VET_PROFILE_SUCCESS, UPDATE_VET_PROFILE_FAIL} from '../actions/types'

const initailSate = {
    profile: 'none',
    username: 'unknown',
}

export default function(state = initailSate, action) {
    const {type, payload} = action;

    switch (type) {
        case LOAD_USER_PROFILE_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                username: payload.username,
                first_name: payload.profile.first_name,
                second_name: payload.profile.second_name,
                age: payload.profile.age,
                type: payload.profile.type,
                location: payload.profile.location,
            }
        case LOAD_VET_PROFILE_SUCCESS:
        case UPDATE_VET_PROFILE_SUCCESS:
            return{
                ...state,
                id: payload.vet_profile.id,
                name: payload.vet_profile.name,
                specialty: payload.vet_profile.specialty,
                bio: payload.vet_profile.bio,
                location: payload.vet_profile.location,
                rating: payload.vet_profile.rating
            }
        case LOAD_ORG_PROFILE_SUCCESS:
            return{
                ...state,
                name: payload.org_profile.name,
                specialty: payload.org_profile.specialty,
                bio: payload.org_profile.bio,
                location: payload.org_profile.location,
            }
        case LOAD_PROFILE_FAIL:
            return {
                ...state,
                username: '',
                first_name: '',
                second_name: '',
                location: "",
                age: 0,
                name: "",
                specialty: "",
                bio: "",
                rating: 0
            }
        case UPDATE_USER_PROFILE_FAIL:
        case UPDATE_VET_PROFILE_FAIL:
            return {
                ...state
            }
        default:
            return{
                ...state
            }
    }
};