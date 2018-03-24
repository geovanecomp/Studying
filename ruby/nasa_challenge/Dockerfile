FROM ruby:2.5

MAINTAINER Geovane Pacheco <geovane.pacheco99@gmail.com>

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential vim postgresql-client libpq-dev nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY Gemfile .

COPY Gemfile.lock .

RUN bundle install

COPY . .

EXPOSE 3000
