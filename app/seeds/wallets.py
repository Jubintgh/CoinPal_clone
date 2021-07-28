from app.models import CryptoWallet, db




# Adds a demo user, you can add other users here if you want
def seed_wallets():
        wallet1 = CryptoWallet(
            user_id=1
        )
        wallet2 = CryptoWallet(
            user_id=2
        )

        db.session.add_all([wallet1, wallet2])
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_wallets():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()