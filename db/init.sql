CREATE TABLE "communities"(
    id SERIAL,
    name varchar(32)
);

CREATE TABLE "communityGroups"(
    id SERIAL,
    name varchar(32)
);

CREATE TABLE "departments"(
    id SERIAL,
    name varchar(64)
);

CREATE TABLE "travelNotices"(
    "id" SERIAL,
    "name" varchar(64),
  	"travellers" integer,
  	"arrivalDate" date,
  	"returnDate" date,
  	"requireAssistance" boolean,
    "destination" varchar(1024),
  	"phone" varchar(16),
  	"email" varchar(64),
  	"purpose" varchar(256),
  	"code" varchar(64),
  	"department" varchar(32),
    "contactedFirstNation" boolean,
    "contactedMunicipality" boolean,
    "contactedOtherGroup" boolean,
    "otherGroupInfo" varchar(64)
);

INSERT INTO "communities" (name) values
('Whitehorse'),('Carmacks'),('Dawson City'),('Beaver Creek'),('Burwash Landing'),('Tagish'),('Carcross'),
('Faro'),('Haines Junction'),('Mayo'),('Mount Lorne'),('Old Crow'),('Pelly Crossing'),('Ross River'),('Teslin'),('Watson Lake');

INSERT INTO "communityGroups" (name) values
('First Nations'),('Municipality'),('Other');

INSERT INTO "communities" (name) values
('Whitehorse'),('Carmacks'),('Dawson City'),('Beaver Creek'),('Burwash Landing'),('Tagish'),('Carcross'),
('Faro'),('Haines Junction'),('Mayo'),('Mount Lorne'),('Old Crow'),('Pelly Crossing'),('Ross River'),('Teslin'),('Watson Lake');

INSERT INTO "departments" (name) values
('Community Services'),('Economic Development'),('Education'),('Energy, Mines and Resources'),('Environment'),('Executive Council Office'),('Finance'),
('French Language Services Directorate'),('Health and Social Services'),('Highways and Public Works'),('Justice'),
('Legislative Assembly'),('Lotteries Yukon'),('Public Service Commission'),('Tourism and Culture'),('Women''s Directorate'),
('Workers'' Compensation Health & Safety Board'),('Yukon Development Corporation'),('Yukon Energy Corporation'),
('Yukon Housing Corporation'),('Yukon Liquor Corporation'),('Yukon Youth & Child Advocate Office')
