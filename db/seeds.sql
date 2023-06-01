INSERT INTO department (dep_name)
VALUES ("Westeros Royalty"),
       ("Small Council"),
       ("Lords of the 7 Kingdoms"),
       ("Knights"),
       ("Service"),
       ("Small Folk");

INSERT INTO roles (title, salary, department_id)
VALUES ("King of the Andals, the Rhoynar and the First Men. Lord of the 7 Kingdoms", "100000000", "1"),
       ("Queen of the Seven Kingdoms", "90000000", "1"),
       ("Prince/Princess of the 7 Kingdoms", "70000000", "1"),
       ("Hand of the King", "8500000", "2"),
       ("Master of Coin", "7500000", "2"),
       ("Grand Maester", "6500000", "2"),
       ("Master of Whispers", "6500000", "2"),
       ("Lord commander of the King's Guard", "5400000", "2"),
       ("Warden of the North", "5000000", "3"),
       ("Prince of Dorne", "5000000", "3"),
       ("Lord of Casterly Rock", "6500000", "3"),
       ("Lord of Dragonstone", "5500000", "3"),
       ("Her Majesty's Guard", "900000", "4"),
       ("King's Guard", "400000", "4"),
       ("Tourney Knight", "100000", "4"),
       ("Blacksmith", "10000", "5"),
       ("Alchemist", "9000", "5"),
       ("Cook", "9000", "5"),
       ("Maid", "800", "6"),
       ("Stableboy", "400", "6"),
       ("Bastard", "200", "6");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Robert", "Baratheon", "1", "1"),
       ("Cersei", "Lannister", "2", "1"),
       ("Joffrey", "Baratheon", "3", "2"),
       ("Mircella", "Baratheon", "3", "2"),
       ("Tommen", "Baratheon", "3", "2"),
       ("Eddard", "Stark", "4", "1"),
       ("Petyr", "Baelish", "5", "6"),
       ("Maester", "Pycelle", "6", "6"),
       ("Varys", "the Eunuc", "7", "6"),
       ("Jaime", "Lannister", "8", "2"),
       ("Robbert", "Stark", "9", "6"),
       ("Doran", "Martell", "10", "1"),
       ("Tywin", "Lannister", "11", "1"),
       ("Stannis", "Baratheon", "12", "6"),
       ("Gregor", "Clegane", "13", "2"),
       ("Sandor", "Clegane", "13", "2"),
       ("Baristan", "Selmy", "14", "1"),
       ("Janos", "Slynt", "14", "1"),
       ("Brienne", "Of Tarth", "14", "1"),
       ("Loras", "Tyrell", "15", "6"),
       ("Gendry", "Waters", "16", "7"),
       ("Alchemist", "1", "17", "9"),
       ("Hot", "Pie", "18", "9"),
       ("Shae", "Shae", "19", "13"),
       ("Hodor", "Hodor", "20", "11"),
       ("Jon", "Snow", "21", "6");

Select * from department;

Select * from roles;

Select * from employee;