import requests
from flask import Blueprint, request
from sqlalchemy.sql.expression import null
from flask_login import login_required, current_user
from app.models import Friend, User, db
from sqlalchemy import and_
from .user_routes import validation_errors_to_error_messages


friend_routes = Blueprint('friends', __name__)

def db_errors_to_error_messages(errtype, error):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    errorMessages.append(f'{errtype} : {error}')
    return errorMessages

@friend_routes.route('/')
@login_required
def get_friends():
    """
    returns a list of user's friends
    """
    id = current_user.id

    ## friends
    raw_friends_list = Friend.query.filter(and_((Friend.from_user_id == id),
                                                (Friend.status == 1))).all() #gets friend instances
    friends_list = []
    for friend in raw_friends_list:
        add_friend = User.query.filter((User.id == friend.to_user_id)).first() #gets user instances
        friends_list.append(add_friend)

    #requesting
    raw_friend_user_requests = Friend.query.filter(and_((Friend.from_user_id == id),
                                                        (Friend.status == 0))).all() #gets friend request instances from current user
    friend_user_requests = []
    for friend in raw_friend_user_requests:
        add_friend = User.query.filter((User.id == friend.to_user_id)).first() #gets user instances
        friend_user_requests.append(add_friend)

    ## requested
    raw_friend_requests = Friend.query.filter(and_(Friend.to_user_id == id,
                                                   Friend.status == 0)).all() #gets friend request instances to current user
    friends_requests = []
    for friend in raw_friend_requests:
        add_friend_req = User.query.filter((User.id == friend.from_user_id)).first() #gets user instances
        friends_requests.append(add_friend_req)

    return {'friends': [
                        {
                            "first_name" : friend.first_name, 
                            "last_name" : friend.last_name, 
                            "profile_img": friend.img_url, 
                            "user_name": friend.username
                        } for friend in friends_list ],
            'friend_requests': [
                        {
                            "first_name" : friend.first_name, 
                            "last_name" : friend.last_name, 
                            "profile_img": friend.img_url, 
                            "user_name": friend.username
                        } for friend in  friends_requests ],
            'curr_friend_requests': [
                        {
                            "user_name": friend.username
                        } for friend in  friend_user_requests ]
        }

@friend_routes.route('/', methods=['POST'])
@login_required
def post_friend_req(is_accept=False):
    """
    creates a new pending instance of friendship
    """
    addresser_user_id = current_user.id

    if is_accept == False:
        other_user = request.json['to_username']
        from_user_id = User.query.filter(User.username == other_user).first()
        addresee_user_id = from_user_id.id

        if addresser_user_id == addresee_user_id:
            return {'errors': 'sorry can\'t add yourself'}, 405

        new_friend_req = Friend(
            from_user_id = addresser_user_id,
            to_user_id = addresee_user_id,
            status = None
        )

    elif is_accept == True:
        other_user = request.json['to_username']
        from_user_id = User.query.filter(User.username == other_user).first()
        addresee_user_id = from_user_id.id

        new_friend_req = Friend(
            from_user_id = addresser_user_id,
            to_user_id = addresee_user_id,
            status = 1
        )

    db.session.add(new_friend_req)
    db.session.commit()

    return {'request': new_friend_req.to_dict()}

@friend_routes.route('/<filter_t>', methods=['PUT'])
@login_required
def update_friendship(filter_t):
    """
    updates an existing friendship status
    """

    if filter_t == 'accept':
        addresee_user_id = current_user.id
        other_user = request.json['to_username']
        to_user = User.query.filter(User.username == other_user).first()
        addresser_user_id = to_user.id

        friend_instance = Friend.query.filter(and_(Friend.from_user_id == addresser_user_id, 
                                                Friend.to_user_id == addresee_user_id)).first()
        friend_instance.status = 1
        post_friend_req(is_accept=True)

    elif filter_t == 'block':
        addresser_user_id = current_user.id
        other_user = request.json['to_username']
        to_user = User.query.filter(User.username == other_user).first()
        addresee_user_id = to_user.id

        friend_instance = Friend.query.filter(and_(Friend.from_user_id == addresser_user_id, 
                                                Friend.to_user_id == addresee_user_id)).first()
        friend_instance.status = 2

    db.session.commit()
    return {'friend': friend_instance.to_dict()}

@friend_routes.route('/', methods=['DELETE'])
@login_required
def delete_friendship():
    """
    deletes an existing friendship record
    """
    addresser_user_id = current_user.id

    other_user = request.json['to_username']
    to_user = User.query.filter(User.username == other_user).first()
    addresee_user_id = to_user.id


    friend_instance1 = Friend.query.filter(and_(Friend.from_user_id == addresser_user_id, 
                                               Friend.to_user_id == addresee_user_id)).first()
    friend_instance2 = Friend.query.filter(and_(Friend.from_user_id == addresee_user_id, 
                                            Friend.to_user_id == addresser_user_id)).first()

    db.session.delete(friend_instance1) if friend_instance1 else null
    db.session.delete(friend_instance2) if friend_instance2 else null
    db.session.commit()
    
    return to_user.to_dict()