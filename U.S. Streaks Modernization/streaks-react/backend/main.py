from fastapi import FastAPI, HTTPException, Query

from utils.logic import retrieve_station_data # Bring in station information parser

app = FastAPI()

@app.get("/access/monitoring/streaks/{path}")
async def serve_station_data(path: str):
    print(path)
    return {"Hello": "World"}
    """ Impelement ability to dump a json representation of the linked file
    print(path)
    new_path = f"https://www.ncei.noaa.gov/monitoring-content/extremes/streaks{path}"
    try: 
        station_data = await retrieve_station_data(new_path)
        return station_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File not found at path: {path}")
    except (ValueError, IndexError) as e:
        raise HTTPException(status_code=500, detail=f"Error parsing file content: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    """