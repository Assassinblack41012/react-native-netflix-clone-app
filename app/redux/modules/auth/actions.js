import ACTION_TYPES from './action.types';

const {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
    TOGGLE_LIKE_SHOW_START,
    TOGGLE_LIKE_SHOW_SUCCESS,
    TOGGLE_LIKE_SHOW_FAILED
} = ACTION_TYPES;

export const loginStart = (payload) => ({
    type: LOGIN_START,
    payload
});

/** Login */
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailed = (payload) => ({
    type: LOGIN_FAILED,
    payload
});

/** Logout */
export const logoutStart = (payload) => ({
    type: LOGOUT_START,
    payload
});

export const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload
});

export const logoutFailed = (payload) => ({
    type: LOGOUT_FAILED,
    payload
});


/** Downloads */
export const downloadVideoStart = (payload) => ({
    type: DOWNLOAD_VIDEO_START,
    payload
});

export const downloadVideoSuccess = (payload) => ({
    type: DOWNLOAD_VIDEO_SUCCESS,
    payload
});

export const downloadVideoFailed = (payload) => ({
    type: DOWNLOAD_VIDEO_FAILED,
    payload
});

/** Select profile */
export const selectProfileStart = (payload) => ({
    type: SELECT_PROFILE_START,
    payload
});

export const selectProfileSuccess = (payload) => ({
    type: SELECT_PROFILE_SUCCESS,
    payload
});

export const selectProfileFailed = (payload) => ({
    type: SELECT_PROFILE_FAILED,
    payload
});

/** Remind me of coming soon show */
export const toggleRemindMeOfComingShowStart = (payload) => ({
    type: TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    payload
});

export const toggleRemindMeOfComingShowSuccess = (payload) => ({
    type: TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    payload
});

export const toggleRemindMeOfComingShowFailed = (payload) => ({
    type: TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    payload
});

/** Toggle add to my list */
export const toggleAddToMyListStart = (payload) => ({
    type: TOGGLE_ADD_TO_MY_LIST_START,
    payload
});

export const toggleAddToMyListSuccess = (payload) => ({
    type: TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    payload
});

export const toggleAddToMyListFailed = (payload) => ({
    type: TOGGLE_ADD_TO_MY_LIST_FAILED,
    payload
});


/** Toggle Like */
export const toggleLikeShowStart = (payload) => ({
    type: TOGGLE_LIKE_SHOW_START,
    payload
});

export const toggleLikeShowSuccess = (payload) => ({
    type: TOGGLE_LIKE_SHOW_SUCCESS,
    payload
});

export const toggleLikeShowFailed = (payload) => ({
    type: TOGGLE_LIKE_SHOW_FAILED,
    payload
});