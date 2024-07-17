FROM ruby:3.2.1

WORKDIR /react-mongo-todo

COPY Gemfile* ./
COPY Gemfile.lock ./
COPY package.json ./

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update -qq

RUN apt-get install -y --no-install-recommends \
    build-essential \
    nodejs

RUN gem install bundler -v 2.4.6
RUN bundle install

COPY . .

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
