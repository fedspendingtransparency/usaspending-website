from dateutil.relativedelta import relativedelta
import datetime

def current_month():
    today = datetime.date.today()
    current_month = today.month
    return current_month

# Quarter utilities
quarter_ranges = {
        'q1' : ((10, 1), (12, 31)),
        'q2' : ((1, 1), (3, 31)),
        'q3' : ((4, 1), (6, 30)),
        'q4' : ((7, 1), (9, 30))
    }

quarter_display_ranges = {
        'q1' : (("October", 1), ("December", 31)),
        'q2' : (("January", 1), ("March", 31)),
        'q3' : (("April", 1), ("June", 30)),
        'q4' : (("July", 1), ("September", 30))
    }

def quarter_cutoff_date(quarter):
    quarter_string = 'q'+ str(quarter[0])
    quarter_range = quarter_ranges[quarter_string]
    eoq = datetime.datetime(quarter[1], quarter_range[1][0], quarter_range[1][1])
    cutoff_date = eoq + datetime.timedelta(days=46)
    if quarter_string == 'q1':      #TODO this is a hack. refactor
        cutoff_date = cutoff_date - relativedelta(years=1)
    return cutoff_date

def quarter_finder(date_input):
    current = int(date_input.strftime('%m')), int(date_input.strftime('%d'))
    current_year = int(date_input.strftime('%Y'))

    if quarter_ranges['q2'][0] <= current <= quarter_ranges['q2'][1]:
        return (2, current_year)
    if quarter_ranges['q3'][0] <= current <= quarter_ranges['q3'][1]:
        return (3, current_year)
    if quarter_ranges['q4'][0] <= current <= quarter_ranges['q4'][1]:
        return (4, current_year)
    if quarter_ranges['q1'][0] <= current <= quarter_ranges['q1'][1]:
        return (1, current_year + 1)

def previous_quarter_finder(current_quarter):
    current_2_previous = {4: 3,
                        3: 2,
                        2: 1,
                        1: 4}
    prior_quarter = current_2_previous[current_quarter[0]]
    if prior_quarter == 4:
        return (prior_quarter, current_quarter[1] - 1)
    else:
        return (prior_quarter, current_quarter[1])

def latest_fiscal_year(today=datetime.datetime.now()):
    current = quarter_finder(today)
    previous = previous_quarter_finder(current)
    cutoff_date = quarter_cutoff_date(previous)
    if today < cutoff_date:
        previous = previous_quarter_finder(previous)
    return previous

# currency utilities
number_name_2_exponent = {"thousand": 3,
                    "million": 6,
                    "billion": 9,
                    "trillion": 12
    }