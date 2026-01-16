from functools import wraps
from sqlalchemy.orm import object_mapper
from app.extensions import db


def check_data_in_session(seed_function):
    """
    Check if the items added to the db session already exists in the database.
    If they exist, skip; otherwise, proceed with commit.
    This decorator commits the data.
    """
    @wraps(seed_function)
    def wrapper(*args, **kwargs):
        seed_function(*args, **kwargs)

        to_commit = db.session.new
        for instance in to_commit:
            mapper = object_mapper(instance)
            primary_key = mapper.primary_key[0].name
            primary_value = getattr(instance, primary_key)

            existing_record = db.session.query(
                mapper.class_).get(primary_value)

            if existing_record:
                print(
                    f"Record already exists for {mapper.class_.__name__} with {primary_key} = {primary_value}")
                db.session.expunge(instance)
            else:
                print(f"New record will be added for {mapper.class_.__name__}")

        db.session.commit()

    return wrapper
