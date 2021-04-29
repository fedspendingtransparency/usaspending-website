# USAspending Frontend Selenium Tests

## Running the test suite

### Local Development

First, you must have python3 and pip3 installed.

Then you will need to initiate and activate a python virtual environment:

```sh
python3 -m venv selenium-suite
source selenium-suite/bin/activate
pip3 install -r requirements.txt
```

Finally, run the tests using the `start.py` script:

```sh
python3 start.py --usaspending_url <url> [--regression]
```

### Docker

There is also a docker container provided for easier test runs. Build and run in docker using the following steps:

```sh
docker build -t usaspending-selenium-tests .
mkdir downloads # temp directory used to store download artifacts for the tests
docker run -i --rm \
    -v \$(pwd):/selenium-tests \
    usaspending-selenium-tests /bin/bash -c \
        'python3 start.py --usaspending_url <url> [--regression]'
```
