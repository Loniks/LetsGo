DELETE FROM tickets;
DELETE FROM events;
DELETE FROM visitors;
DELETE FROM sponsors;
DELETE FROM admins;
INSERT  INTO admins(
id, email, name, password, role, status)
VALUES (1, 'supper@test.com', 'Supper Admin', 'supper', 'ROLE_SUPPER', 'enable');
INSERT INTO sponsors(
id, contact_person, email, name, password, phone, status)
VALUES (1, 'Steve Jonson', 'bigcompany@company.com', 'Big company','bigPass', '0123456789', 'enable');
INSERT INTO visitors(
id, email, name, password, phone, status)
VALUES (1, 'goodVisitor@visitor.com', 'Mike Pitteson', 'goodPass', '03211236547', 'enable');
INSERT INTO events(
  id, address, description, duration, name, number_of_free_places, number_of_tickets, start_date, status, owner)
VALUES (1, 'Wow street','Wow description', '5 hours', 'Wow event', 30, 30, '2017-04-17 12:26:44.674', 'enable', 1);
INSERT INTO public.tickets(
  id, status, event, owner)
VALUES (1, 'NEW', 1, 1);