import ACTION_TYPES from './action.types';
import accountProfiles from './../../../services/data/accountProfiles';

const {
    ADD_TO_RECENT_WATCHES_START,
    ADD_TO_RECENT_WATCHES_SUCCESS,
    ADD_TO_RECENT_WATCHES_FAILED,
    RATE_SHOW_START,
    RATE_SHOW_SUCCESS,
    RATE_SHOW_FAILED,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    DOWNLOAD_VIDEO_START,
    DOWNLOAD_VIDEO_SUCCESS,
    DOWNLOAD_VIDEO_FAILED,
    REMOVE_TO_MY_DOWNLOADS_START,
    REMOVE_TO_MY_DOWNLOADS_SUCCESS,
    REMOVE_TO_MY_DOWNLOADS_FAILED,
    REMOVE_TO_RECENT_WATCHES_START,
    REMOVE_TO_RECENT_WATCHES_SUCCESS,
    REMOVE_TO_RECENT_WATCHES_FAILED,
    SELECT_PROFILE_START,
    SELECT_PROFILE_SUCCESS,
    SELECT_PROFILE_FAILED,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS,
    TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED,
    TOGGLE_ADD_TO_MY_LIST_START,
    TOGGLE_ADD_TO_MY_LIST_SUCCESS,
    TOGGLE_ADD_TO_MY_LIST_FAILED,
} = ACTION_TYPES;


const CREDENTIALS_DEFAULT_PROPS = 
{
    id: 1,
    email: '',
    password: '',
    remember_me: false
};

const PROFILE_DEFAULT_PROPS = 
{
    id: '',
    name: '',
    email: '',
    profile_photo: '',
    my_downloads: [],
    recentlyWatchedShows: [] 
};

const RATED_SHOWS_DEFAULT_PROPS = 
[
    {
        id: '',
        title: '',
        poster: '',
        rate: '',
        isRated: false
    }
]

const initialState = 
{
    isAuthenticated: false,
    credentials: CREDENTIALS_DEFAULT_PROPS,
    profiles: accountProfiles,
    profile: PROFILE_DEFAULT_PROPS,
    ratedShows: RATED_SHOWS_DEFAULT_PROPS,
    isLoading: false,
    errors: []
}

export default (state = initialState, { type, payload }) => 
{
    const {
        profiles,
        profile,
    } = state;

    const SELECT_AUTHENTICATED_PROFILE = profiles.find(({ id }) => id === profile.id);
    let NEW_PROFILES = [];

    const isLoading = true;
    const errors = [];

    switch (type) 
    {
        case ADD_TO_RECENT_WATCHES_START:
        case RATE_SHOW_START:
        case LOGIN_START:
        case LOGOUT_START:
        case DOWNLOAD_VIDEO_START:
        case REMOVE_TO_MY_DOWNLOADS_START:
        case REMOVE_TO_RECENT_WATCHES_START:
        case SELECT_PROFILE_START:
        case TOGGLE_ADD_TO_MY_LIST_START:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_START:
            return { 
                ...state, 
                isLoading
            }

        case ADD_TO_RECENT_WATCHES_SUCCESS:

            const findShowIndex = SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.findIndex(({ id }) => id === payload.show.id);

            /** The show already exists, remove and prepend it */
            if (findShowIndex !== -1) {
                SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.splice(findShowIndex, 1);
                SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.unshift(payload.show);
            }
            else {
                SELECT_AUTHENTICATED_PROFILE.recently_watched_shows.push(payload.show);
            }

            /** Update profiles */
            const profiles_ = profiles.map((prof) => (prof.id === profile.id) ? SELECT_AUTHENTICATED_PROFILE : prof);

            return { 
                ...state,
                profiles: profiles_,
                isLoading: false,
                errors
            }

        case RATE_SHOW_SUCCESS:

            /** Update auth profile liked shows */
            let newLikedShows = [];
            let hasLikedShow = SELECT_AUTHENTICATED_PROFILE.liked_shows.findIndex(({ id }) => id === payload.show.id);

            if (hasLikedShow !== -1) {
                newLikedShows = SELECT_AUTHENTICATED_PROFILE.liked_shows.filter(({ id }) => id !== payload.show.id);
            }
            else {
                newLikedShows.push(payload.show);
            }

            /** Update auth profile recently watched shows shows */
            let recentlyWatchedShows_ = SELECT_AUTHENTICATED_PROFILE
                .recently_watched_shows.map((show) => {
                    if (show.id === payload.show.id) 
                    {
                        if (!show.isRated) {
                            return { ...show, isRated: true, rate: payload.rate };
                        }
        
                        if (show.isRated && show.rate !== payload.rate) {
                            return { ...show, rate: payload.rate };
                        }
                        else {
                            return { ...show, isRated: false, rate: '' };
                        }
                    }

                    return show;
                });

            /** Update profiles */
            let newProfiles = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, recently_watched_shows: recentlyWatchedShows_, liked_shows: newLikedShows } 
                    : prof;
            });

            return { 
                ...state,
                profiles: newProfiles,
                isLoading: false,
                errors
            }

        case LOGIN_SUCCESS:
            return { 
                ...state, 
                credentials: payload.credentials,
                isAuthenticated: true,
                isLoading: false,
                errors
            }

        case LOGIN_FAILED:
            return { 
                ...state, 
                isAuthenticated: false,
                isLoading: false,
                errors: payload.message
            }

        case LOGOUT_SUCCESS:
            return { 
                ...state, 
                isAuthenticated: false,
                isLoading: false,
                errors
            }

        case LOGOUT_FAILED:
            return { 
                ...state, 
                isAuthenticated: true,
                isLoading: false,
                errors: payload.message
            }

        case DOWNLOAD_VIDEO_SUCCESS:

            const updateProfileDownloads = profiles.map(({ id, my_downloads, ...profileInfo }) => {
                return (id === payload.profile.id)
                    ? { id, my_downloads: [ ...my_downloads, payload.show ], ...profileInfo, }
                    : { id, my_downloads, ...profileInfo }
            });

            return {
                ...state,
                isLoading: false,
                profiles: updateProfileDownloads,
                errors
            }

        case REMOVE_TO_MY_DOWNLOADS_SUCCESS: 
            let filteredMyDownloads = SELECT_AUTHENTICATED_PROFILE
                .my_downloads
                .filter(({ id }) => id !== payload.showID);

            /** Update profiles */
            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === SELECT_AUTHENTICATED_PROFILE.id) 
                    ? { ...prof, my_downloads: filteredMyDownloads } 
                    : prof;
            });

            return {
                ...state,
                isLoading: false,
                profiles: NEW_PROFILES,
                errors
            }

        case REMOVE_TO_RECENT_WATCHES_SUCCESS:

            let filteredRecentlyWatchedShows = SELECT_AUTHENTICATED_PROFILE
                .recently_watched_shows
                .filter(({ id }) => id !== payload.showID);

            /** Update profiles */
            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, recently_watched_shows: filteredRecentlyWatchedShows } 
                    : prof;
            });

            return { 
                ...state,
                profiles: NEW_PROFILES,
                isLoading: false,
                errors
            }

        case SELECT_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: profiles.find(({ id }) => id === payload.id),
                errors
            }

        case TOGGLE_ADD_TO_MY_LIST_SUCCESS:

            const isAlreadyInList = SELECT_AUTHENTICATED_PROFILE.my_list.findIndex(({ id }) => id === payload.show.id); 

            let newMyList = (isAlreadyInList === -1) 
                ? [ ...SELECT_AUTHENTICATED_PROFILE.my_list, payload.show ] 
                : SELECT_AUTHENTICATED_PROFILE.my_list.filter(({ id }) => id !== payload.show.id);

            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, my_list: newMyList } 
                    : prof;
            });
        
            return {
                ...state,
                profiles: NEW_PROFILES,
                isLoading: false,
                errors
            }            

        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_SUCCESS:
            
            let newRemindedShows = [];
            const authProfileRemindedShows = SELECT_AUTHENTICATED_PROFILE.reminded_coming_soon_shows;

            if (authProfileRemindedShows.length) 
            {
                const hasReminded = authProfileRemindedShows.findIndex(({ id }) => id === payload.show.id) !== -1; 
            
                newRemindedShows = hasReminded
                    ? authProfileRemindedShows.filter(({ id }) => id !== payload.show.id)
                    : [ ...authProfileRemindedShows, payload.show ];
            }
            else {
                newRemindedShows.push(payload.show);
            }

            NEW_PROFILES = profiles.map((prof) => {
                return (prof.id === profile.id) 
                    ? { ...prof, reminded_coming_soon_shows: newRemindedShows } 
                    : prof;
            });

            return {
                ...state,
                profiles: NEW_PROFILES,
                isLoading: false,
                errors
            }

        case ADD_TO_RECENT_WATCHES_FAILED:
        case DOWNLOAD_VIDEO_FAILED:
        case SELECT_PROFILE_FAILED:
        case RATE_SHOW_FAILED:
        case REMOVE_TO_MY_DOWNLOADS_FAILED:
        case REMOVE_TO_RECENT_WATCHES_FAILED:
        case TOGGLE_ADD_TO_MY_LIST_FAILED:
        case TOGGLE_REMIND_ME_OF_COMING_SOON_SHOW_FAILED:
            return {
                ...state,
                isLoading: false,
                errors: payload.message
            }

        default:
            return state
    }
}
