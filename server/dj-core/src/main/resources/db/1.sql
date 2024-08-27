-- CREATE DATABASE IF NOT EXISTS dj;

# drop table if exists t_route;
-- 路由
create table if not exists t_route(
    id bigint primary key not null auto_increment,
    name varchar(20) not null unique, # 名称
    description varchar(200), # 描述
    show_in_tab int not null default 0, # 是否在导航栏显示
    can_cancel int not null default 0, # 是否可删除
    path_id bigint not null, # 路径id
    parent_route_id bigint default null, # 父路由id
    role_id bigint, # 角色id
    creator_id bigint, # 创建人id
    create_time datetime # 创建时间
);

# drop table if exists t_path;
-- 路径
create table if not exists t_path(
    id bigint primary key not null auto_increment,
    name varchar(20) not null unique, # 名称
    description varchar(200), # 描述
    path varchar(100) not null unique, # 路径
    creator_id bigint, # 创建人id
    create_time datetime # 创建时间
);

-- 页面类型
create table if not exists t_page_type(
    id bigint primary key not null auto_increment,
    name varchar(20) not null unique # 名称
);

-- 页面
create table if not exists t_page(
    id bigint primary key not null auto_increment,
    page_type_id bigint not null, # 页面类型
    content longtext not null, # 字符串
    creator_id bigint, # 创建人id
    create_time datetime, # 创建时间
    update_time datetime, # 编辑时间
    constraint fk_page_type_id foreign key (page_type_id) references t_page_type(id) on delete restrict
);

-- 用户表
create table if not exists t_user(
   id bigint primary key not null auto_increment,
   username varchar(50) not null unique, # 用户名
   password varchar(50) not null, # 密码
   role_id bigint, # 角色id
   create_time datetime # 创建时间
);

-- 角色
create table if not exists t_role(
    id bigint primary key not null auto_increment,
    name varchar(50) not null unique, # 名称
    creator_id bigint, # 创建人id
    create_time datetime # 创建时间
);

-- 权限
# drop table if exists t_permission;
create table if not exists t_permission(
    id bigint primary key not null auto_increment,
    name varchar(50) not null unique, # 名称
    parent_permission_id bigint,
    creator_id bigint, # 创建人id
    create_time datetime # 创建时间
);

-- 角色-权限关联表
# drop table if exists t_role_permission;
create table if not exists t_role_permission(
    id bigint primary key not null auto_increment,
    role_id bigint not null, # 角色id
    permission_id bigint not null, # 权限id
    constraint fk_role_id foreign key (role_id) references t_role(id) on update cascade on delete cascade,
    constraint fk_permission_id foreign key (permission_id) references t_permission(id) on update cascade on delete cascade
);
