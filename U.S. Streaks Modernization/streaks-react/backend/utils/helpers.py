# Since start date is calculated on thefront-end, lets put that logic into a backend function so we don't need that 
# excessive code
def calculate_start_date(enddate, length):
    try:
        from datetime import datetime, timedelta
        date_format = "%Y%m%d" #Use proper %Y%m%d for date formatting with datetime
        end_date = datetime.strptime(enddate, date_format) # Convert the end date string to a datetime object
        begin_date = end_date - timedelta(days=length) # Calculate the begin date
        return begin_date.strftime(date_format)
    except ValueError:
        print(f"[helpers.py] Error: could not parse date '{enddate}'")
        return "n/a"
