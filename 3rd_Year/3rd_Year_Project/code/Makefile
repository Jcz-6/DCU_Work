ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

build:
	docker-compose up --build -d --remove-orphans

up:
	docker-compose up 

down:
	docker-compose down

logs:
	docker-compose logs

updateBuild:
	docker-compose exec frontend npm run build

migrate:
	docker-compose exec api python3 saving_animals/manage.py migrate --noinput

makemigrations:
	docker-compose exec api python3 saving_animals/manage.py makemigrations

superuser:
	docker-compose exec api python3 saving_animals/manage.py createsuperuser

down-v:
	docker-compose down -v

volume:
	docker volume inspect backend_postgres_data

shell:
	docker-compose exec api python3 saving_animals/manage.py shell

collect:
	docker-compose exec api python3 saving_animals/manage.py collectstatic