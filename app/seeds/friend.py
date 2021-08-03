from app.models import db, Friend


def seed_friends():
    friend1 = Friend(
        from_user_id=1,
        to_user_id=2,
        status=1
    )
    friend2 = Friend(
        from_user_id=1,
        to_user_id=3,
        status=1
    )
    friend3 = Friend(
        from_user_id=1,
        to_user_id=4,
        status=1
    )

    db.session.add_all([friend1, friend2, friend3])
    db.session.commit()


def undo_friends():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()