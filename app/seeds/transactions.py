from app.models import db, Transaction

def seed_transactions():
    transaction1 = Transaction(
        from_user_id = 1,
        to_user_id = 2,
        amount= 2,
        transaction_status=1,
        crypto_type='Ethereum'
    )

    transaction2 = Transaction(
        from_user_id = 1,
        to_user_id = 3,
        amount= 1.23,
        transaction_status=0,
        crypto_type='Bitcoin'
    )

    transaction3 = Transaction(
        from_user_id = 3,
        to_user_id = 1,
        amount= 44,
        transaction_status=2,
        crypto_type='Ethereum'
    )

    transaction4 = Transaction(
        from_user_id = 2,
        to_user_id = 1,
        amount= 5.4,
        transaction_status=3,
        crypto_type='Bitcoin'
    )
    transaction4 = Transaction(
        from_user_id = 2,
        to_user_id = 1,
        amount= 5.213,
        transaction_status=1,
        crypto_type='Ethereum'
    )
    transaction5 = Transaction(
        from_user_id = 2,
        to_user_id = 1,
        amount= 9.13,
        transaction_status=1,
        crypto_type='Bitcoin'
    )
    transaction6 = Transaction(
        from_user_id = 2,
        to_user_id = 1,
        amount= 5.213,
        transaction_status=3,
        crypto_type='Bitcoin'
    )
    transaction7 = Transaction(
        from_user_id = 1,
        to_user_id = 3,
        amount= 5.213,
        transaction_status=3,
        crypto_type='Bitcoin'
    )
    transaction8 = Transaction(
        from_user_id = 1,
        to_user_id = 2,
        amount= 15.213,
        transaction_status=3,
        crypto_type='Ethereum'
    )

    db.session.add_all([transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7, transaction8])
    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()