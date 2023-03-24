USE employee_tracker;

INSERT INTO department (dept_name)
VALUES ("Design and Development"),("Marketing"),("Sales"),("Fish Behavior Research"),("Customer Service"),("Fish Accounting"),("Fish and Culture");

INSERT INTO role (title,salary,department_id) VALUES ("Manager", 25000, 1),("Team Lead", 35000, 3),("Senior Lead", 135000, 2),("Recruiter", 75000, 7),("Accounting",85000, 6),("Marketing Coordinator", 25000, 2),("Fish Trainer", 25000, 4),("Enterprise Sales", 185000, 3),("Fish Assistant", 125000, 6),("Fish Recruiter", 250000, 7),("Head of Operations", 150000, 2),("Head of Sales", 25000, 2),("Sales", 45000, 2),("VP of HR", 2250000, 7);


INSERT INTO employee (first_name,last_name, manager_id, role_id) VALUES ("Bubbles","McFishface",3,10),("Guppy","Longstocking",NULL,11), 
("Oscar","the Grouchfish",3,13),("Salmon","Rushdie",1,5),("Tuna","Turner",6,7),("Codzilla","Jones",3,14),("Sushi","McSashimi",1,6),("Wanda","the Wandfish",7,9),("Nemo","SecondName",9,1),("Blubberton","Finklefin",7,4),("Gillywiggle","McSquiggles",7,4),("Flappity","Flopkins",3,13),("Sardine","Scuttlebutt",3,2);
