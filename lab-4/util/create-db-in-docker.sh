docker run --name lab-4_db_pg -p 5432:5432 -e POSTGRES_USER=lab-4_db_user -e POSTGRES_PASSWORD=lab-4_db_password -e POSTGRES_DB=lab-4_db -d postgres:latest