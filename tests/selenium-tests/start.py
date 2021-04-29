from multiprocessing import Process, Queue, current_process, Semaphore, Lock, cpu_count, Manager
import time
import time
from queue import Empty
from subprocess import call, run
import math
import os
import sys
import argparse
from ctypes import c_int
# Wrapper for automated tests

# Usage: start.py --usaspending_url <URL> [--regression]
# Relies on env vars:
# BASIC_AUTH_USERNAME / BASIC_AUTH_PASSWORD

parser = argparse.ArgumentParser()
parser.add_argument('--usaspending_url',
                    required=True)
parser.add_argument('--regression',
                    required=False,
                    dest='run_regression',
                    default=False,
                    action='store_true')
args = parser.parse_args()

pwd = str(os.getcwd()) + "/reports/allure-results"
pre_commands = ["behave", "-f", "allure_behave.formatter:AllureFormatter", "-o", pwd]

work_array = []

args.usaspending_url = "{}:{}@{}".format(os.environ.get("BASIC_AUTH_USERNAME"), os.environ.get("BASIC_AUTH_PASSWORD"), args.usaspending_url)
usaspending_post_commands = ["-D", "URL={}".format(args.usaspending_url)]
usaspending_work_array = [pre_commands + ["./website_tests/features/smoke/smoke_homepage.feature"] + usaspending_post_commands]
usaspending_work_array.append(pre_commands + ["./website_tests/features/smoke/smoke_advanced_search.feature"] + usaspending_post_commands)
usaspending_work_array.append(pre_commands + ["./website_tests/features/smoke/smoke_keyword_search.feature"] + usaspending_post_commands)
usaspending_work_array.append(pre_commands + ["./website_tests/features/smoke/smoke_homepage.feature"] + usaspending_post_commands)
usaspending_work_array.append(pre_commands + ["./website_tests/features/smoke/smoke_profiles.feature"] + usaspending_post_commands)
usaspending_work_array.append(pre_commands + ["./website_tests/features/smoke/smoke_spending.feature"] + usaspending_post_commands)
usaspending_work_array.append(pre_commands + ["./website_tests/features/smoke/smoke_download.feature"] + usaspending_post_commands)
usaspending_work_array.append(pre_commands + ["./website_tests/features/smoke/smoke_glossary.feature"] + usaspending_post_commands)
if args.run_regression:
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_advanced_search.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_advanced_spending_tab.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_glossary.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_spending_explorer.feature"] + usaspending_post_commands)
    #usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_states.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_recipients.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_fed_accounts.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_agencies.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_award_data_archive.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_custom_award.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_download_database.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_download_center.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_custom_account_data.feature"] + usaspending_post_commands)
    usaspending_work_array.append(pre_commands + ["./website_tests/features/regression/reg_award_summary.feature"] + usaspending_post_commands)
work_array += usaspending_work_array

def main():
    print("Starting automated test script")
    return_val = 0
    for item in work_array:
        exit_code = call(item)
        return_val |= exit_code
    return return_val

sys.exit(main())
