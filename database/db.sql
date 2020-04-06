CREATE DATABASE IF NOT EXISTS links;

USE links;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(150) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);


ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;


DESCRIBE users;

-- Links Table
CREATE TABLE links_table(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links_table
    ADD PRIMARY KEY (id);

ALTER TABLE links_table
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;