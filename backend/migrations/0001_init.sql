create table app_user (
	id serial primary key,
	username varchar(30) not null unique,
	password varchar(100) not null
);
comment on table app_user is 'Store of registered users with their hashed passwords';

create table product (
	id serial primary key,
	name varchar(30) not null unique,
	price decimal(12, 2) not null default 0 check (price >= 0),
	description varchar(30) not null default '',
	created_by int not null,
	created_at timestamp not null,
	foreign key (created_by) references app_user(id)
);
comment on table product is 'Store of products submitted by registered users';