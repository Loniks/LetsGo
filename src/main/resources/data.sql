INSERT INTO admins(
	id, email, name, password, role, status)
	VALUES (1, 'supper@test.com', 'Supper Admin', 'supper', 'ROLE_SUPPER', 'enable') ON CONFLICT DO NOTHING;
INSERT INTO sponsors(
  id, contact_person, email, name, password, phone, status)
VALUES (1, 'Steve Jonson', 'bigcompany@company.com', 'Big company','bigPass', '0123456789', 'enable') ON CONFLICT DO NOTHING;
INSERT INTO visitors(
  id, email, name, password, phone, status)
VALUES (1, 'goodVisitor@visitor.com', 'Mike Pitteson', 'goodPass', '03211236547', 'enable') ON CONFLICT DO NOTHING;