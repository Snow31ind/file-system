
-- User schema --
DROP TABLE IF EXISTS "users" CASCADE;
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "middle_name" varchar,
  "last_name" varchar,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "last_modified" timestamp DEFAULT (now())
);

-- Folders schema --
DROP TABLE IF EXISTS "folders" CASCADE;
CREATE TABLE "folders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "parent_id" int,
  "name" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "last_modified" timestamp DEFAULT (now()),

  UNIQUE ("parent_id", "name")
);

-- Files schema --
DROP TABLE IF EXISTS "files" CASCADE;
CREATE TABLE "files" (
  "folder_id" int NOT NULL,
  "name" varchar NOT NULL,
  "data" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "last_modified" timestamp DEFAULT (now()),

  PRIMARY KEY ("folder_id", "name")
);

-- Foreign keys --
ALTER TABLE "folders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "folders" ADD FOREIGN KEY ("parent_id") REFERENCES "folders" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("folder_id") REFERENCES "folders" ("id");
