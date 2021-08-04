from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
        user1 = User(
            first_name='Demo', last_name='User', username='demouser',
            email='demouser@mail.com', password='Password1!',
            img_url="https://chicagophotovideo.com/wp-content/uploads/2017/10/ezgif.com-webp-to-jpg-17.jpg"
        )
        user2 = User(
            first_name='Demo1', last_name='User1', username='demouser1',
            email='demouser1@mail.com', password='Password1!',
            img_url="https://www.josari.io/wp-content/uploads/2019/07/smiling-man-in-suit-1920x1080-1024x576.jpg"
        )
        user3 = User(
            first_name='Demo2', last_name='User2', username='demouser2',
            email='demouser2@mail.com', password='Password1!',
            img_url="https://i.pinimg.com/736x/a7/66/92/a766923c29305a16ce461b2ae54f4c68.jpg"
        )
        user4 = User(
            first_name='Demo3', last_name='User3', username='demouser3',
            email='demouser3@mail.com', password='Password1!',
            img_url="https://i.pinimg.com/236x/54/52/35/545235d6b3caaf45872822f7da28c3a5--professional-portrait-profile-pictures.jpg"
        )
        user5 = User(
            first_name='Demo4', last_name='User4', username='demouser4',
            email='demouser4@mail.com', password='Password1!',
            img_url="https://techsytalk.com/wp-content/uploads/2013/11/professional-woman-4.jpg"
        )
        user6 = User(
            first_name='Demo6', last_name='User6', username='demouser6',
            email='demouser6@mail.com', password='Password1!',
            img_url="https://www.brisbaneheadshots.com.au/templates/yootheme/cache/executive-portrait-6604976d.jpeg"
        )

        db.session.add_all([user1, user2, user3, user4, user5, user6])
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
