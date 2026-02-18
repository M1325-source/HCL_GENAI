import requests

def fetch_categories():
    url = "https://www.themealdb.com/api/json/v1/1/categories.php"
    response = requests.get(url)
    data = response.json()
    return data["categories"]
