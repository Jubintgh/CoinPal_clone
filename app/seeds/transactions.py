from app.models import db, Transaction

def seed_transactions():
    transaction1 = Transaction(
        from_user_id = 1,
        to_user_id = 2,
        amount= 2400,
        transaction_status=0,
        crypto_type='Ether'
    )

    db.session.add(transaction1)
    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()