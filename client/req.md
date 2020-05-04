# Opportunity - YG Community Travel Portal

YG wishes to build a web portal that enables YG departments to document YG travel to the Yukon communities and allows community leadership to track who from YG is coming into the community and for what purpose.

## Deliverables:
1. A simple web form that provides fields for
	- Community  (drop down)
	- Purpose (textfield)
	- Number of people (input box)
	- Expected duration ( in days - input box)
	- Arrival Date (date/time)
	- Safety Measures Declaration (this is a check box with a link to the SafeWork Practice
	- Have you been in contact with community? (Check box)
	- If yes, who? (Dropdown)
		- First Nation
		- Municipality
		- Other
	- If no, do you need assistance connecting with the community?
	*User Story:* As a YG employee or project manager I can log upcoming travel in to a community.

2. A web page per community that shows upcoming travel to the community;  The web page should include print friendly styling.
	*User Story:* As a community leader I can see what government agencies are travelling into my community in the coming days/weeks and why they are coming

3. The ability to edit my travel plans if they change;
	   *User Story:* As a YG employee I can go back to my travel plan and change details.

4. *Optional* A dashboard board of weekly travel to communities (number of trips, people, etc)


## Technical Deliverables:
- One or more docker containers that encompass the entire solution
- Documentation on:
	-  how to run the container included README.md.  The solution can be started with a single *docker* or *docker-compose* command
	- relevant API calls used in the solution
- All code stored in the YG GitHub site.

## Applicable standards, approaches and technologies
- Front-end
	- Vue.js using Vuetify or BootstrapVue for styling
- Backend
	- REST API using YG API Standards
	- Node.JS, Express (preferred)
	- PostgreSQL, or lightweight documentDB (Mongo, Couch, etc) preferred  

## Authentication and Security
- Write access to this form is restricted to internal YNET users
- Secure read access by communities will be addressed in a future sprint
- SSL termination will managed via YG load balancers and doesn’t
