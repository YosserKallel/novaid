SET FOREIGN_KEY_CHECKS=0;
DELETE FROM visits;
DELETE FROM family_needs;
DELETE FROM families;
DELETE FROM items;
DELETE FROM users;
SET FOREIGN_KEY_CHECKS=1;

INSERT INTO users (id, full_name, email, password, role, phone, enabled, created_at, updated_at) VALUES
  (1, 'Admin Novaid', 'admin@novaid.tn', 'admin', 'ADMIN', '20000000', 1, NOW(), NOW()),
  (2, 'Aymen Dridi', 'aymen@novaid.tn', 'agent', 'AGENT', '21111111', 1, NOW(), NOW()),
  (3, 'Yosser Kallel', 'yosser@novaid.tn', 'coord', 'COORDINATOR', '22222222', 1, NOW(), NOW());

INSERT INTO families (id, head_name, address, urgency_index, latitude, longitude, active, created_at, updated_at) VALUES
  (1, 'Famille Ben Salah', 'Sousse, Khzema', 4, 35.8256, 10.6084, 1, NOW(), NOW()),
  (2, 'Famille Ayadi', 'Sfax, Menzel Chaker', 8, 34.7406, 10.7603, 1, NOW(), NOW()),
  (3, 'Famille Belghith', 'Tunis, Mrezga', 7, 36.8065, 10.1815, 1, NOW(), NOW());

INSERT INTO family_needs (family_id, need) VALUES
  (1, 'Alimentaire'),
  (1, 'Medical'),
  (2, 'Medical'),
  (2, 'Alimentaire'),
  (3, 'Medical'),
  (3, 'Scolaire');

INSERT INTO items (id, name, category, quantity, unit, min_threshold, created_at, updated_at) VALUES
  (1, 'Lait infantile', 'Alimentaire', 5, 'boites', 10, NOW(), NOW()),
  (2, 'Doliprane 1000', 'Medical', 45, 'boites', 20, NOW(), NOW()),
  (3, 'Couvertures', 'Autre', 2, 'pieces', 5, NOW(), NOW()),
  (4, 'Cahiers scolaires', 'Scolaire', 120, 'pieces', 50, NOW(), NOW()),
  (5, 'Pates', 'Alimentaire', 25, 'kg', 30, NOW(), NOW());

INSERT INTO visits (id, family_id, volunteer_id, visit_date, status, notes, created_at) VALUES
  (1, 1, 2, NOW() - INTERVAL 1 DAY, 'COMPLETED', 'Visite de suivi', NOW()),
  (2, 2, 2, NOW() - INTERVAL 2 DAY, 'COMPLETED', 'Visite urgente', NOW()),
  (3, 3, 2, NOW() - INTERVAL 4 DAY, 'PLANNED', 'Visite planifiee', NOW());
