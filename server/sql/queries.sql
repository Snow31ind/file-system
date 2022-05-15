-- Select all users
SELECT *
  FROM "users";

-- Select all folders
SELECT *
  FROM "folders";


-- Select all files
SELECT *
  FROM "files";

-- SELECT all roots
SELECT *
  FROM "folders" as fo 
  WHERE fo.name = 'root';

-- Number of current roots
SELECT COUNT(*) as total
  FROM "folders" as fo
  WHERE fo.name = 'root';

-- Select all folders belongs to the root of the an user whose id = 1
SELECT *
  FROM "folders" as f1
  WHERE f1.parent_id = (
    SELECT f2.id
    FROM "folders" as f2
    WHERE f2.user_id = 1 AND f2.parent_id IS NULL
  );

-- Select all files belongs to the folder "folder a" under the root of an user whose id = 1
-- What have we known ahead?
-- 1. All of these files have the prefix "full_path" is "root/folder a" 
SELECT *
  FROM "files" as fi
  WHERE fi.folder_id IN (
    SELECT fo.id
    FROM "folders" as fo
    WHERE fo.full_path = 'root/folder a'
  );


