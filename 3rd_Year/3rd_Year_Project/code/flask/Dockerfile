FROM python:3.12.1-slim-bullseye

WORKDIR /app

LABEL description="Development image for Saving Animals 3rd Year Project"

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get clean

RUN pip install --upgrade pip

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app