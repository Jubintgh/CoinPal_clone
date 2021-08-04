from app.models import db, Friend


def seed_friends():
    friend1 = Friend(
        from_user_id=1,
        to_user_id=2,
        status=1
    )
    friend2 = Friend(
        from_user_id=2,
        to_user_id=1,
        status=1
    )
    friend3 = Friend(
        from_user_id=1,
        to_user_id=3,
        status=1
    )
    friend4 = Friend(
        from_user_id=3,
        to_user_id=1,
        status=1
    )
    friend4 = Friend(
        from_user_id=4,
        to_user_id=1,
        status=0
    )
    friend5 = Friend(
        from_user_id=5,
        to_user_id=1,
        status=0
    )
    friend6 = Friend(
        from_user_id=6,
        to_user_id=1,
        status=0
    )

    db.session.add_all([friend1, friend2, friend3])
    db.session.commit()


def undo_friends():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()