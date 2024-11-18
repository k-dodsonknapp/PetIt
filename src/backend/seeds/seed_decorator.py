from functools import wraps
from sqlalchemy.orm import object_mapper
from backend import db


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
        print("to_commit", to_commit)
        for instance in to_commit:
            mapper = object_mapper(instance)
            print("Instance:", instance.to_dict())
            primary_key = mapper.primary_key[0].name
            primary_value = getattr(instance, primary_key)
            print("mapper", mapper)
            print("primary_key", primary_key)
            print("primary_value", primary_value)

            existing_record = db.session.query(mapper.class_).get(primary_value)
            print("Existing Record:", existing_record)

            if existing_record:
                print(f"Record already exists for {mapper.class_.__name__} with {primary_key} = {primary_value}")
                db.session.expunge(instance)
            else:
                print(f"New record will be added for {mapper.class_.__name__}")

        db.session.commit()

    return wrapper