FROM openjdk:8-slim
COPY --from=python:3.7.9 / /
RUN curl --insecure -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN apt-get -y update
RUN apt-get -y install google-chrome-stable
RUN apt-get -y update && \
    apt-get install -yqq unzip && \
    apt-get install -y libnss3 libgconf-2-4
#RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/89.0.4389.23/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/
RUN mkdir /allure
RUN mkdir /allure-results
RUN mkdir /allure-report
RUN mkdir /allure-config
RUN wget https://dl.bintray.com/qameta/generic/io/qameta/allure/allure/2.7.0/allure-2.7.0.tgz
RUN tar -xvzf allure-2.7.0.tgz -C /usr/local/bin/
ENV PATH "/usr/local/bin/allure-2.7.0/bin:${PATH}"
ENV ALLURE_CONFIG="/allure-config/allure.properties"
RUN mkdir /selenium-tests
WORKDIR /selenium-tests
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
VOLUME /selenium-tests
