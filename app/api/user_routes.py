from flask import Blueprint, request
from flask.wrappers import Request
from flask_login import login_required
from app.models import User, db
from app.forms import SignUpForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/search')
def search_users():
    search = request.args.get('user')
    users = User.query.filter(User.username.like('%'+search+'%')).all()

    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<username>')
@login_required
def user(username):
    user = User.query.filter(User.username == username).first()
    print(user.username, "USERNAMEE")
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def user_info_update(id):
    user = User.query.get(id)

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submite():
        ex_user_info = User.query.get(id)
        form.populate_obj(ex_user_info)

        ex_user_info.username = form.data["username"]
        ex_user_info.email = form.data["email"]
        ex_user_info.password = form.data["password"]
        ex_user_info.first_name = form.data["first_name"]
        ex_user_info.last_name = form.data["last_name"]
        ex_user_info.img_url = form.data["img_url"]

        db.session.commit()
        return ex_user_info.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401