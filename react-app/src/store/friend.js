//constant
const GET_FRIENDS = 'friend/GET_FRIENDS';
const SET_FRIEND = 'friend/SET_FRIEND';
const UPDATE_FRIEND = 'friend/UPDATE_FRIEND';
const REMOVE_FRIEND = 'friend/REMOVE_FRIEND';

const getFriends = (friends) => ({
    type: GET_FRIENDS,
    payload: friends
})

const setFriendship = (friend) => ({
    type: SET_FRIEND,
    payload: friend
})

const updateFriendship = (friend) => ({
    type: UPDATE_FRIEND,
    payload: friend
})

const deleteFriend = (friendId) => ({
    type: REMOVE_FRIEND,
    payload: friendId
})

export const getAllFriends = () => async (dispatch) => {
    const response = await fetch(`/api/friends/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(getFriends(data.friends))
    }
}

export const postFriendship = (otherUserName) => async (dispatch) => {
    const response = await fetch(`/api/friends/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'to_username': otherUserName
        })
    })
    if(response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(setFriendship(data))
    }
}

export const updateOneFriendship = (otherUserUserName, type) => async (dispatch) => {
    const response = await fetch(`/api/friends/${type}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'other_user_username': otherUserUserName
        })
    })
    if(response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(setFriendship(data))
    }
}

export const removeFriend = (otherUserName) => async (dispatch) => {
    const response = await fetch(`/api/friends/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'to_username': otherUserName
        })
    })
    if(response.ok){
        const data = await response.json();
        if(data.error){
            return;
        }
        dispatch(deleteFriend(data))
    }
}

const initialState = {}

export default function reducer(state = initialState, action){
    let newState;
    
    switch(action.type){
        case GET_FRIENDS:
            newState = action.payload.reduce((friend, el) => {
                friend[el.user_name] = el;
                return friend;
            }, {})
            return newState

        case SET_FRIEND:
            newState = {
                ...state,
            }
            newState[action.payload.user_name] = action.payload
            return newState
   
        case UPDATE_FRIEND:
            newState = {
                ...state,
            }
            newState[action.payload.user_name] = action.payload
            return newState

        case REMOVE_FRIEND:
            newState = {};
            for(let friend in state){
                if(friend !== action.payload.username) newState[friend] = state[friend]
            }
            // delete newState[action.payload.user_name]
            return newState

        default:
            return state
    }
}