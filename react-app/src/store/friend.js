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

const removeTransaction = (friendId) => ({
    type: REMOVE_FRIEND,
    payload: friendId
})

export const getAllFriends = (userId) => async (dispatch) => {
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

export const postFriendship = (otherUserId) => async (dispatch) => {
    const response = await fetch(`/api/friends/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'other_user_id': otherUserId
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

export const updateOneFriendship = (otherUserId, type) => async (dispatch) => {
    const response = await fetch(`/<int:id>/${type}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'other_user_id': otherUserId
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

const initialState = {}

export default function reducer(state = initialState, action){
    let newState;
    
    switch(action.type){
        case GET_FRIENDS:
            return { 
                friends_list:[...action.payload]
            }
        case SET_FRIEND:
            return { 
                ...state,
                friends_list: action.payload
            }
        case UPDATE_FRIEND:
            return { 
                ...state,
                alltransactions:[action.payload]
            }
        // case REMOVE_FRIEND:
        //     newState = { ...state };
        //     delete newState[action.payload]
        //     return newState
        default:
            return state
    }
}