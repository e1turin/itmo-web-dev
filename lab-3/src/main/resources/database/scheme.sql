create table public.lab3dbtable
(
    id        serial,
    param_x   double precision not null,
    param_y   double precision not null,
    param_r   double precision not null,
    is_inside boolean          not null,
    proc_time bigint           not null,
    date_time varchar          not null
);

alter table public.lab3dbtable
    owner to lab3dbuser;


