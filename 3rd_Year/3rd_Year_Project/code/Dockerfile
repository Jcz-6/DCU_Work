FROM python:3.12.1-slim-bullseye

WORKDIR /app

LABEL description="Development image for Saving Animals 3rd Year Project"

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install netcat gcc postgresql \
    && apt-get clean
RUN apt-get update \
    && apt-get install -y binutils libproj-dev gdal-bin python3-gdal

RUN pip install --upgrade pip

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app