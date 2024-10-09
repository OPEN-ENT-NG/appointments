CREATE SCHEMA appointments;

CREATE TYPE grid_state AS ENUM (
    'open',
    'suspended',
    'canceled'
);

CREATE TYPE appointment_state AS ENUM (
    'created',
    'accepted',
    'refused',
    'canceled'
);

CREATE TYPE day AS ENUM (
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);

CREATE TABLE appointments.grid (
    id bigserial PRIMARY KEY,
    name varchar(255) NOT NULL,
    owner_id varchar(255) NOT NULL,
    structure_id varchar(255) NOT NULL,
    begin date NOT NULL,
    end date NOT NULL,
    color varchar(255) NOT NULL,
    duration time NOT NULL,
    periodicity integer NOT NULL,
    target_public_list_id varchar(255) NOT NULL,
    visio_link varchar(255) NOT NULL,
    place varchar(255) NOT NULL,
    document_id integer NOT NULL,
    public_comment varchar(255) NOT NULL,
    state grid_state NOT NULL
);

CREATE TABLE appointments.daily_slot (
    id bigserial PRIMARY KEY,
    day day NOT NULL,
    begin time NOT NULL,
    end time NOT NULL,
    grid_id bigint NOT NULL,
    CONSTRAINT fk_grid_daily_slot
        FOREIGN KEY(grid_id) 
        REFERENCES appointments.grid(id)
);

CREATE TABLE appointments.time_slot (
    id bigserial PRIMARY KEY,
    begin timestamp NOT NULL,
    end timestamp NOT NULL,
    grid_id bigint NOT NULL,
    CONSTRAINT fk_grid_time_slot
        FOREIGN KEY(grid_id) 
        REFERENCES appointments.grid(id)
);

CREATE TABLE appointments.appointment (
    id bigserial PRIMARY KEY,
    requester_id varchar(255) NOT NULL,
    time_slot_id bigint NOT NULL,
    state appointment_state NOT NULL,
    CONSTRAINT fk_time_slot
        FOREIGN KEY (time_slot_id) 
        REFERENCES appointments.time_slot (id)
);

CREATE TABLE appointments.appointment_state (
    id bigserial PRIMARY KEY,
    appointment_id bigint NOT NULL,
    state appointment_state NOT NULL,
    actor_id varchar(255) NOT NULL,
    date timestamp NOT NULL,
    CONSTRAINT fk_appointment
        FOREIGN KEY (appointment_id) 
        REFERENCES appointments.appointment (id)
);



