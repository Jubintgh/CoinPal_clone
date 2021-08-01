from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Friend, User, db
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
    return {'Friends': [friend.to_dict() for friend in friends_list]}

@friend_routes.route('/', methods=['POST'])
# @login_required
def post_friend_req():
    """
    creates a new pending instance of friendship
    """
    addresser_user_id = current_user.id
    addresee_user_id = request.json['other_user_id']


    new_friend_req = Friend(
        from_user_id = addresser_user_id,
        to_user_id = addresee_user_id,
        status = 2
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
    transaction_type = filter_t

    

    addresser_user_id = id
    addresee_user_id = request.json['other_user_id']

# @friend_routes.route('<int:id>', methods=['DELETE'])
# # @login_required
# def update_friendship(id):
#     """
#     deletes an existing friendship record
#     """

#     addresser_user_id = id
#     addresee_user_id = request.json['other_user_id']