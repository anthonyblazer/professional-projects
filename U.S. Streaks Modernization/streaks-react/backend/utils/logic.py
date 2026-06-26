from pydantic import BaseModel
from typing import List
import httpx
import re

from utils.helpers import calculate_start_date # Bring in helper function for calculating start date of extremes


class Station(BaseModel):
    id: str
    state: str
    lat: float
    lng: float
    streakLength: int
    enddate: str
    begdate: str
    location: str


async def retrieve_station_data(file): 

    # Use an asynchronous HTTP client to fetch the file content from the URL.
    async with httpx.AsyncClient() as client:
        response = await client.get(file)
        # Raise an exception for bad status codes (4xx or 5xx).
        response.raise_for_status()
        content = response.text
    
    station_data = []

    lines = content.split("\n")

    # Process each line from the file
    for line in lines:
        # Skip any empty or whitespace-only lines
        if not line.strip():
            continue
        
        # Split the line by one or more whitespace characters
        parts = re.split(r'\s+', line.strip())
        
        # Ensure the line has enough parts to be parsed
        if len(parts) < 7:
            continue

        # Extract end date and streak length for calculation
        end_date_str = parts[5]
        streak_length_int = int(parts[4])

        # Calculate the begin date using the new helper function
        begin_date_str = calculate_start_date(end_date_str, streak_length_int)

        # Create a dictionary from the parts, converting types as needed
        data_input = {
            "id": parts[0],
            "state": parts[1],
            "lat": float(parts[2]),
            "lng": float(parts[3]),
            "streakLength": streak_length_int,
            "enddate": end_date_str,
            "begdate": begin_date_str,
            "location": " ".join(parts[6:])
        }
        station_data.append(data_input)

    return station_data



