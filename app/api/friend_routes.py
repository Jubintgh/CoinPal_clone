from flask import Blueprint, request
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
# @login_required
def get_friends():
    """
    returns a list of user's friends
    """
    id = current_user.id

    friends_list = Friend.query.filter((Friend.from_user_id == id) | (Friend.to_user_id == id)).all()
    return {'friends': [friend.to_dict() for friend in friends_list]}

@friend_routes.route('/', methods=['POST'])
# @login_required
def post_friend_req():
    """
    creates a new pending instance of friendship
    """
    # addresser_user_id = current_user.id
    addresser_user_id = 5
    addresee_user_id = request.json['other_user_id']


    new_friend_req = Friend(
        from_user_id = addresser_user_id,
        to_user_id = addresee_user_id,
        status = None
    )

    db.session.add(new_friend_req)
    db.session.commit()

    return {'request': new_friend_req.to_dict()}

@friend_routes.route('/<int:id>/<filter_t>', methods=['PUT'])
# @login_required
def update_friendship(id, filter_t):
    """
    updates an existing friendship status
    """

    addresser_user_id = current_user.id
    addresee_user_id = request.json['other_user_id']

    friend_instance = Friend.query.filter(and_(Friend.from_user_id == addresser_user_id, 
                                               Friend.to_user_id == addresee_user_id)).first()


    if filter_t == 'accept':
        friend_instance.status = 1

    elif filter_t == 'block':
        friend_instance.status = 0

    db.session.commit()
    return {'friend': friend_instance.to_dict()}


@friend_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_friendship(id):
    """
    deletes an existing friendship record
    """

    addresser_user_id = id
    addresee_user_id = request.json['other_user_id']

    friend_instance = Friend.query.filter(and_(Friend.from_user_id == addresser_user_id, 
                                               Friend.to_user_id == addresee_user_id)).first()
    
    db.session.delete(friend_instance)
    db.session.commit()
    
    return {'friend': friend_instance.to_dict()}