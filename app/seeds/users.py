from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
        user1 = User(
            first_name='Demo', last_name='User', username='demouser',
            email='demouser@mail.com', password='Password1!',
            img_url="https://i.pinimg.com/originals/b7/ab/b6/b7abb604d6b6cfa8f4b8c3699842bea7.jpg"
        )
        user2 = User(
            first_name='Demo1', last_name='User1', username='demouser1',
            email='demouser1@mail.com', password='Password1!',
            img_url="https://i.pinimg.com/originals/b7/ab/b6/b7abb604d6b6cfa8f4b8c3699842bea7.jpg"
        )

        db.session.add_all([user1, user2])
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
