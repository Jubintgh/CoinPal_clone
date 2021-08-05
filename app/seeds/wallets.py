from app.models import CryptoWallet, db




# Adds a demo user, you can add other users here if you want
def seed_wallets():
        wallet1 = CryptoWallet(
            user_id=1,
            ethereum_balance = 12,
            bitcoin_balance = 12,
            usd_coin_balance = 12,
        )
        wallet2 = CryptoWallet(
            user_id=2,
            ethereum_balance = 12,
            bitcoin_balance = 12,
            usd_coin_balance = 12,
        )
        wallet3 = CryptoWallet(
            user_id=3,
            ethereum_balance = 12,
            bitcoin_balance = 12,
            usd_coin_balance = 12,
        )
        wallet4 = CryptoWallet(
            user_id=4,
            ethereum_balance = 12,
            bitcoin_balance = 12,
            usd_coin_balance = 12,
        )
        wallet5 = CryptoWallet(
            user_id=5,
            ethereum_balance = 12,
            bitcoin_balance = 12,
            usd_coin_balance = 12,
        )
        wallet6 = CryptoWallet(
            user_id=6,
            ethereum_balance = 12,
            bitcoin_balance = 12,
            usd_coin_balance = 12,
        )

        db.session.add_all([wallet1, wallet2, wallet3, wallet4, wallet5, wallet6])
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_wallets():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()