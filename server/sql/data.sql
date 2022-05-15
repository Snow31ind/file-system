-- User data --
INSERT INTO "users"("first_name", "middle_name", "last_name", "email", "password")
VALUES
('Tien', 'Quang', 'Li', 'tien.li151@hcmut.edu.vn', '123123'),
('Trang', 'Thuy', 'Li', 'lithuytrang423@gmail.com', '123123')
;

-- Initial folder "root" for user where id = 1 --
INSERT INTO "folders"("user_id", "parent_id", "name")
VALUES
(1, NULL, 'root')
;

-- Insert some folders for user where id = 1 --
INSERT INTO "folders"("user_id", "parent_id", "name")
VALUES
(1, 1, 'folder a'),
(1, 1, 'folder b'),
(1, 1, 'folder c')
;

-- Insert some files into folder "folder a" under the "root" of an user whose id = 1
INSERT INTO "files"("folder_id", "name", "data")
VALUES
(2, 'file a', 'This is the content of file a'),
(2, 'file b', 'This is the content of file b'),
(2, 'file c', 'This is the content of file c')
;

-- Initial folder "root" for user where id = 2 --
INSERT INTO "folders"("user_id", "parent_id", "name")
VALUES
(2, NULL, 'root')
;

-- Insert some folders for user where id = 2 --
INSERT INTO "folders"("user_id", "parent_id", "name")
VALUES
(2, 2, 'folder a'),
(2, 2, 'folder b'),
(2, 2, 'folder c')
;


