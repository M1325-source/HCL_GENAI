import requests

def fetch_meals():
    url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
    response = requests.get(url)
    data = response.json()
    return data["meals"]
