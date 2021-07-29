from app.models import db, Transaction

def seed_transactions():
    transaction1 = Transaction(
        from_user_id = 5,
        to_user_id = 6,
        amount= 2400,
        transaction_status=0,
        crypto_type='Ether'
    )

    transaction2 = Transaction(
        from_user_id = 5,
        to_user_id = 7,
        amount= 1400,
        transaction_status=0,
        crypto_type='Bitcoin'
    )

    transaction3 = Transaction(
        from_user_id = 6,
        to_user_id = 5,
        amount= 4400,
        transaction_status=0,
        crypto_type='Ether'
    )

    transaction4 = Transaction(
        from_user_id = 8,
        to_user_id = 5,
        amount= 5400,
        transaction_status=0,
        crypto_type='Ether'
    )

    db.session.add_all([transaction1, transaction2, transaction3, transaction4])
    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()