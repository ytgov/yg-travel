CREATE TABLE communities(
    id SERIAL,
    name varchar(32)
);

CREATE TABLE communityGroups(
    id SERIAL,
    name varchar(32)
);

CREATE TABLE travelNotices(
    id SERIAL,
    name varchar(64),
  	travellers integer,
  	arrivalDate date,
  	returnDate date,
  	requireAssistance boolean,
    contactedCommunity integer,
    destination integer,
  	phone varchar(16),
  	email varchar(64),
  	purpose varchar(256),
  	code varchar(64),
  	department varchar(32),
    fnContact boolean,
    muContact boolean,
    otherContact boolean,
    other varchar(32)
);

INSERT INTO communities (name) values
('Whitehorse'),('Carmacks'),('Dawson City'),('Beaver Creek'),('Burwash Landing'),('Tagish'),('Carcross'),
('Faro'),('Haines Junction'),('Mayo'),('Mount Lorne'),('Old Crow'),('Pelly Crossing'),('Ross River'),('Teslin'),('Watson Lake');


INSERT INTO communityGroups (name) values
('First Nations'),('Municipality'),('Other');
