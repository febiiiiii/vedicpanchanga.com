#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
FastAPI REST API for Drik Panchanga calculations
Provides endpoints to calculate Hindu calendar panchanga elements
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Tuple
from datetime import datetime
import json
import re

from panchanga import (
    tithi, nakshatra, yoga, karana, vaara, masa, ritu,
    sunrise, sunset, moonrise, moonset, day_duration, ahargana, elapsed_year, samvatsara,
    rahu_kalam, yamaganda_kalam, gulika_kalam, abhijit_muhurta,
    planetary_positions, ascendant,
    gregorian_to_jd, jd_to_gregorian, init_swisseph, get_planet_name,
    Place, Date
)
import vimsottari
import swisseph as swe

app = FastAPI(
    title="Drik Panchanga API",
    description="Hindu lunisolar calendar calculations based on Swiss ephemeris",
    version="1.0.0"
)

# CORS middleware to allow Next.js app to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3121", "http://localhost:3000"],  # Add your Next.js app URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Sanskrit names
def load_json_file(filename):
    """Load json file ignoring comments (// and /* ... */)"""
    with open(filename, encoding='utf-8') as fp:
        content = ''.join(fp.readlines())
        content = re.sub(r'//.*', '', content)
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        return json.loads(content)

# Load cities database
with open("cities.json", encoding='utf-8') as fp:
    CITIES = json.load(fp)

SANSKRIT_NAMES = load_json_file("sanskrit_names.json")

# Vaara (weekday) lord mapping - 0=Sunday to 6=Saturday
VAARA_LORDS = {
    0: "Sūrya",      # Sunday - Sun
    1: "Candra",     # Monday - Moon
    2: "Maṅgala",    # Tuesday - Mars
    3: "Budha",      # Wednesday - Mercury
    4: "Guru",       # Thursday - Jupiter
    5: "Śukra",      # Friday - Venus
    6: "Śani"        # Saturday - Saturn
}

# Initialize Swiss Ephemeris
init_swisseph()

# Pydantic models
from typing import Union
import pytz
from zoneinfo import ZoneInfo

class DateInput(BaseModel):
    year: int = Field(..., description="Year (can be negative for BCE)")
    month: int = Field(..., ge=1, le=12, description="Month (1-12)")
    day: int = Field(..., ge=1, le=31, description="Day (1-31)")
    hour: int = Field(default=0, ge=0, le=23, description="Hour (0-23)")
    minute: int = Field(default=0, ge=0, le=59, description="Minute (0-59)")
    second: int = Field(default=0, ge=0, le=59, description="Second (0-59)")

class LocationInput(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude in decimal degrees")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude in decimal degrees")
    timezone: Union[float, str] = Field(..., description="Timezone offset from UTC in hours or timezone name")
    city: Optional[str] = None
    country: Optional[str] = None

class PanchangaRequest(BaseModel):
    date: Union[DateInput, str]  # Accept either DateInput object or ISO string
    location: LocationInput

    @validator('date', pre=True)
    def validate_date(cls, v):
        """Allow both DateInput objects and ISO date strings"""
        if isinstance(v, str):
            # Return the string as-is for processing in the endpoint
            return v
        elif isinstance(v, dict):
            # Convert dict to DateInput
            return DateInput(**v)
        return v

class CitySearchRequest(BaseModel):
    city_name: str = Field(..., description="City name to search")

class TimeValue(BaseModel):
    hours: int
    minutes: int
    seconds: int

class TithiResponse(BaseModel):
    index: int
    name: str
    end_time: TimeValue

class NakshatraResponse(BaseModel):
    index: int
    name: str
    end_time: TimeValue

class YogaResponse(BaseModel):
    index: int
    name: str
    end_time: TimeValue

class KaranaResponse(BaseModel):
    index: int
    name: str
    end_time: TimeValue

class MasaResponse(BaseModel):
    index: int
    name: str
    is_leap: bool

class TimeRangeResponse(BaseModel):
    start: TimeValue
    end: TimeValue

class PanchangaResponse(BaseModel):
    tithi: TithiResponse
    nakshatra: NakshatraResponse
    yoga: YogaResponse
    karana: KaranaResponse
    vaara: dict
    masa: MasaResponse
    ritu: dict
    samvatsara: dict
    sunrise: TimeValue
    sunset: TimeValue
    moonrise: TimeValue
    moonset: TimeValue
    day_duration: TimeValue
    rahu_kala: TimeRangeResponse
    yama_ganda: TimeRangeResponse
    gulika_kala: TimeRangeResponse
    abhijit_muhurta: TimeRangeResponse
    ayanamsha: float
    ahargana: int
    saka_year: int
    kali_year: int

class CityInfo(BaseModel):
    name: str
    latitude: float
    longitude: float
    timezone: str

class PlanetPosition(BaseModel):
    planet: str
    planet_index: int
    zodiac_sign: str
    zodiac_index: int
    longitude: float
    nakshatra: str
    nakshatra_index: int
    pada: int

class PlanetaryPositionsResponse(BaseModel):
    positions: List[PlanetPosition]
    ascendant: dict

class DashaEntry(BaseModel):
    planet: str
    planet_index: int
    start_date: str
    end_date: str
    duration_years: float

class VimsottariDashaResponse(BaseModel):
    mahadashas: List[DashaEntry]
    current_mahadasha: DashaEntry
    current_bhukti: Optional[DashaEntry] = None

def format_time_dict(time_tuple: Tuple[int, int, int]) -> TimeValue:
    """Convert time tuple to TimeValue model"""
    return TimeValue(hours=time_tuple[0], minutes=time_tuple[1], seconds=time_tuple[2])

def decimal_hours_to_time(decimal_hours: float) -> Tuple[int, int, int]:
    """Convert decimal hours (e.g., 12.5) to (hours, minutes, seconds) tuple"""
    hours = int(decimal_hours)
    remaining = (decimal_hours - hours) * 60
    minutes = int(remaining)
    seconds = int((remaining - minutes) * 60)
    return (hours, minutes, seconds)

def get_timezone_offset(timezone_str: str, date_time: datetime) -> float:
    """Get the UTC offset for a timezone at a specific date/time"""
    try:
        # Try using zoneinfo (Python 3.9+)
        from zoneinfo import ZoneInfo
        tz = ZoneInfo(timezone_str)
        offset = date_time.replace(tzinfo=tz).utcoffset()
        if offset:
            return offset.total_seconds() / 3600
    except:
        pass

    try:
        # Fallback to pytz
        import pytz
        tz = pytz.timezone(timezone_str)
        localized = tz.localize(date_time)
        offset = localized.utcoffset()
        if offset:
            return offset.total_seconds() / 3600
    except:
        pass

    # If timezone string is a number, return it directly
    try:
        return float(timezone_str)
    except:
        pass

    # Default to IST if all else fails
    return 5.5

def parse_date_input(date_input: Union[DateInput, str], timezone_info: Union[str, float]) -> Tuple[Date, float, int, int, int]:
    """Parse date input and return Date object with time components and timezone offset"""
    if isinstance(date_input, str):
        # Parse ISO date string
        dt = datetime.fromisoformat(date_input.replace('Z', '+00:00'))

        # Convert UTC time to local timezone
        if isinstance(timezone_info, str):
            try:
                from zoneinfo import ZoneInfo
                tz = ZoneInfo(timezone_info)
                local_dt = dt.astimezone(tz)
                tz_offset = local_dt.utcoffset().total_seconds() / 3600
            except:
                try:
                    import pytz
                    tz = pytz.timezone(timezone_info)
                    local_dt = dt.astimezone(tz)
                    tz_offset = local_dt.utcoffset().total_seconds() / 3600
                except:
                    # Fallback: treat as UTC
                    local_dt = dt
                    tz_offset = 0
        else:
            # Numeric timezone offset
            tz_offset = float(timezone_info)
            # Convert UTC to local time
            from datetime import timedelta
            local_dt = dt + timedelta(hours=tz_offset)

        date_obj = Date(local_dt.year, local_dt.month, local_dt.day)
        return date_obj, tz_offset, local_dt.hour, local_dt.minute, local_dt.second
    else:
        # Traditional DateInput object
        date_obj = Date(date_input.year, date_input.month, date_input.day)
        tz_offset = float(timezone_info) if isinstance(timezone_info, (int, float)) else get_timezone_offset(timezone_info, datetime(date_input.year, date_input.month, date_input.day, date_input.hour, date_input.minute, date_input.second))
        return date_obj, tz_offset, date_input.hour, date_input.minute, date_input.second

@app.get("/")
def read_root():
    """Root endpoint with API information"""
    return {
        "name": "Drik Panchanga API",
        "version": "1.0.0",
        "description": "Hindu lunisolar calendar calculations",
        "endpoints": {
            "/panchanga": "Calculate panchanga for a given date and location",
            "/cities/search": "Search for a city in the database",
            "/cities": "List all available cities"
        }
    }

@app.post("/panchanga", response_model=PanchangaResponse)
def calculate_panchanga(request: PanchangaRequest):
    """
    Calculate complete panchanga for a given date and location

    Returns tithi, nakshatra, yoga, karana, vaara, masa, ritu, sunrise/sunset times, etc.
    """
    try:
        # Parse the date input (handles both DateInput objects and ISO strings)
        date_obj, tz_offset, hour, minute, second = parse_date_input(request.date, request.location.timezone)
        place_obj = Place(request.location.latitude, request.location.longitude, tz_offset)

        # JD at midnight (for sunrise/sunset/moonrise/moonset - these expect JD at midnight)
        jd_midnight = gregorian_to_jd(date_obj)

        # JD at specified time (for tithi/nakshatra/yoga/karana calculations)
        decimal_hours = hour + minute / 60.0 + second / 3600.0
        decimal_hours_utc = decimal_hours - tz_offset
        jd_at_time = gregorian_to_jd(date_obj, decimal_hours_utc)

        # Calculate panchanga elements using time-specific JD
        ti = tithi(jd_at_time, place_obj)
        nak = nakshatra(jd_at_time, place_obj)
        yog = yoga(jd_at_time, place_obj)
        kar = karana(jd_at_time, place_obj)
        # Vaara (weekday) is date-based, not time-based - use midnight JD
        vara = vaara(jd_midnight)
        mas = masa(jd_at_time, place_obj)
        rt = ritu(mas[0])
        samvat = samvatsara(jd_at_time, mas[0])

        # Calculate sun/moon rise/set using midnight JD
        srise = sunrise(jd_midnight, place_obj)[1]
        sset = sunset(jd_midnight, place_obj)[1]
        mrise = moonrise(jd_midnight, place_obj)
        mset = moonset(jd_midnight, place_obj)
        day_dur = day_duration(jd_midnight, place_obj)[1]

        # Calculate muhurta times using midnight JD
        rahu = rahu_kalam(jd_midnight, place_obj)
        yama = yamaganda_kalam(jd_midnight, place_obj)
        gulika = gulika_kalam(jd_midnight, place_obj)
        abhijit = abhijit_muhurta(jd_midnight, place_obj)

        # Get ayanamsha at the specified time
        ayanamsha = swe.get_ayanamsa_ut(jd_at_time)

        # Ahargana and elapsed year use midnight JD (day-based, not time-specific)
        kday = int(ahargana(jd_midnight))
        kyear, sakayr = elapsed_year(jd_midnight, mas[0])

        # Format response
        response = PanchangaResponse(
            tithi=TithiResponse(
                index=ti[0],
                name=SANSKRIT_NAMES["tithis"][str(ti[0])],
                end_time=format_time_dict(ti[1])
            ),
            nakshatra=NakshatraResponse(
                index=nak[0],
                name=SANSKRIT_NAMES["nakshatras"][str(nak[0])],
                end_time=format_time_dict(nak[1])
            ),
            yoga=YogaResponse(
                index=yog[0],
                name=SANSKRIT_NAMES["yogas"][str(yog[0])],
                end_time=format_time_dict(yog[1])
            ),
            karana=KaranaResponse(
                index=kar[0],
                name=SANSKRIT_NAMES["karanas"][str(kar[0])],
                end_time=format_time_dict(kar[1])
            ),
            vaara={
                "index": vara,
                "name": SANSKRIT_NAMES["varas"][str(vara)],
                "lord": VAARA_LORDS[vara]
            },
            masa=MasaResponse(
                index=mas[0],
                name=SANSKRIT_NAMES["masas"][str(mas[0])],
                is_leap=mas[1]
            ),
            ritu={
                "index": rt,
                "name": SANSKRIT_NAMES["ritus"][str(rt)]
            },
            samvatsara={
                "index": samvat,
                "name": SANSKRIT_NAMES["samvats"][str(samvat)]
            },
            sunrise=format_time_dict(srise),
            sunset=format_time_dict(sset),
            moonrise=format_time_dict(mrise),
            moonset=format_time_dict(mset),
            day_duration=format_time_dict(day_dur),
            rahu_kala=TimeRangeResponse(
                start=format_time_dict(rahu[0]),
                end=format_time_dict(rahu[1])
            ),
            yama_ganda=TimeRangeResponse(
                start=format_time_dict(yama[0]),
                end=format_time_dict(yama[1])
            ),
            gulika_kala=TimeRangeResponse(
                start=format_time_dict(gulika[0]),
                end=format_time_dict(gulika[1])
            ),
            abhijit_muhurta=TimeRangeResponse(
                start=format_time_dict(decimal_hours_to_time(abhijit[0])),
                end=format_time_dict(decimal_hours_to_time(abhijit[1]))
            ),
            ayanamsha=ayanamsha,
            ahargana=kday,
            saka_year=sakayr,
            kali_year=kyear
        )

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")

@app.post("/cities/search", response_model=List[CityInfo])
def search_city(request: CitySearchRequest):
    """
    Search for cities in the database

    Returns a list of matching cities with their coordinates
    """
    city_name = request.city_name.title()  # Convert to title case

    # Exact match
    if city_name in CITIES:
        city = CITIES[city_name]
        return [CityInfo(
            name=city_name,
            latitude=city['latitude'],
            longitude=city['longitude'],
            timezone=city['timezone']
        )]

    # Partial match
    matches = []
    for name, data in CITIES.items():
        if city_name.lower() in name.lower():
            matches.append(CityInfo(
                name=name,
                latitude=data['latitude'],
                longitude=data['longitude'],
                timezone=data['timezone']
            ))
            if len(matches) >= 10:  # Limit to 10 results
                break

    if not matches:
        raise HTTPException(status_code=404, detail=f"City '{city_name}' not found")

    return matches

@app.get("/cities", response_model=List[str])
def list_cities(limit: int = 100):
    """
    List all available cities in the database

    Returns a list of city names (limited to prevent large responses)
    """
    return list(CITIES.keys())[:limit]

@app.post("/planetary-positions", response_model=PlanetaryPositionsResponse)
def get_planetary_positions(request: PanchangaRequest):
    """
    Calculate planetary positions for a given date and location

    Returns positions of all planets in zodiac signs and nakshatras
    """
    try:
        # Parse the date input (handles both DateInput objects and ISO strings)
        date_obj, tz_offset, hour, minute, second = parse_date_input(request.date, request.location.timezone)
        place_obj = Place(request.location.latitude, request.location.longitude, tz_offset)

        # Convert to Julian Day with time (planetary positions are time-specific)
        decimal_hours = hour + minute / 60.0 + second / 3600.0
        decimal_hours_utc = decimal_hours - tz_offset
        jd_at_time = gregorian_to_jd(date_obj, decimal_hours_utc)

        # Get planetary positions at the specified time
        positions_raw = planetary_positions(jd_at_time, place_obj)
        ascendant_raw = ascendant(jd_at_time, place_obj)

        # Format positions
        positions = []
        for pos in positions_raw:
            planet_idx = pos[0]
            zodiac_idx = pos[1]
            coords = pos[2]  # [degrees, minutes, seconds]
            nak_pada = pos[3]  # [nakshatra_index, pada]

            # Calculate longitude in degrees
            longitude = zodiac_idx * 30 + coords[0] + coords[1]/60 + coords[2]/3600

            positions.append(PlanetPosition(
                planet=SANSKRIT_NAMES["planets"][str(planet_idx)],
                planet_index=planet_idx,
                zodiac_sign=SANSKRIT_NAMES["zodiac"][str(zodiac_idx)],
                zodiac_index=zodiac_idx,
                longitude=round(longitude, 6),
                nakshatra=SANSKRIT_NAMES["nakshatras"][str(nak_pada[0])],
                nakshatra_index=nak_pada[0],
                pada=nak_pada[1]
            ))

        # Format ascendant
        asc_zodiac = ascendant_raw[0]
        asc_coords = ascendant_raw[1]
        asc_nak_pada = ascendant_raw[2]
        asc_longitude = asc_zodiac * 30 + asc_coords[0] + asc_coords[1]/60 + asc_coords[2]/3600

        ascendant_info = {
            "zodiac_sign": SANSKRIT_NAMES["zodiac"][str(asc_zodiac)],
            "zodiac_index": asc_zodiac,
            "longitude": round(asc_longitude, 6),
            "nakshatra": SANSKRIT_NAMES["nakshatras"][str(asc_nak_pada[0])],
            "nakshatra_index": asc_nak_pada[0],
            "pada": asc_nak_pada[1]
        }

        return PlanetaryPositionsResponse(
            positions=positions,
            ascendant=ascendant_info
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")

@app.post("/vimsottari-dasha", response_model=VimsottariDashaResponse)
def get_vimsottari_dasha(request: PanchangaRequest):
    """
    Calculate Vimsottari Dasha periods for a given date and location

    Returns mahadasha periods and current dasha/bhukti
    """
    try:
        # Parse the date input (handles both DateInput objects and ISO strings)
        date_obj, tz_offset, hour, minute, second = parse_date_input(request.date, request.location.timezone)
        place_obj = Place(request.location.latitude, request.location.longitude, tz_offset)

        # Convert to Julian Day with time (dasha is time-specific)
        decimal_hours = hour + minute / 60.0 + second / 3600.0
        decimal_hours_utc = decimal_hours - tz_offset
        jd_at_time = gregorian_to_jd(date_obj, decimal_hours_utc)
        jd_ut = jd_at_time - tz_offset / 24.0

        # Get mahadasha periods
        mahadashas_raw = vimsottari.vimsottari_mahadasa(jd_ut)

        # Format mahadasha entries
        mahadashas = []
        current_maha = None

        prev_planet = None
        prev_start = None

        for planet_idx, start_jd in mahadashas_raw.items():
            if prev_planet is not None:
                duration = vimsottari.mahadasa[prev_planet]
                end_jd = start_jd

                entry = DashaEntry(
                    planet=get_planet_name(prev_planet),
                    planet_index=prev_planet,
                    start_date=jd_to_gregorian(prev_start).isoformat() if hasattr(jd_to_gregorian(prev_start), 'isoformat') else str(jd_to_gregorian(prev_start)),
                    end_date=jd_to_gregorian(end_jd).isoformat() if hasattr(jd_to_gregorian(end_jd), 'isoformat') else str(jd_to_gregorian(end_jd)),
                    duration_years=duration
                )

                mahadashas.append(entry)

                # Check if this is the current mahadasha
                if prev_start <= jd_ut < end_jd:
                    current_maha = entry

            prev_planet = planet_idx
            prev_start = start_jd

        # Add the last entry
        if prev_planet is not None:
            duration = vimsottari.mahadasa[prev_planet]
            end_jd = prev_start + duration * vimsottari.vimsottari_year

            entry = DashaEntry(
                planet=get_planet_name(prev_planet),
                planet_index=prev_planet,
                start_date=jd_to_gregorian(prev_start).isoformat() if hasattr(jd_to_gregorian(prev_start), 'isoformat') else str(jd_to_gregorian(prev_start)),
                end_date=jd_to_gregorian(end_jd).isoformat() if hasattr(jd_to_gregorian(end_jd), 'isoformat') else str(jd_to_gregorian(end_jd)),
                duration_years=duration
            )

            mahadashas.append(entry)

            if prev_start <= jd_ut < end_jd:
                current_maha = entry

        # If no current mahadasha found, use the first one
        if current_maha is None and mahadashas:
            current_maha = mahadashas[0]

        return VimsottariDashaResponse(
            mahadashas=mahadashas,
            current_mahadasha=current_maha,
            current_bhukti=None  # TODO: Calculate bhukti
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8121)
