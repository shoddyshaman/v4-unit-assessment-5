const initialState = {
    username: '',
    profilePic: ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user) {
    // console.log(user)
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_USER:
            return { ...state, username: payload.username, profilePic: payload.profile_pic };
        case LOGOUT:
            return { username: '', profilePic: '' }
        default:
            return state;
    }
}