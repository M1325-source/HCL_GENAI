from fastapi import FastAPI
import requests
import string

app = FastAPI()

@app.get("/least-ingredient-meal")
def least_ingredient_meal():
    all_meals = []

    for letter in string.ascii_lowercase:
        url = f"https://www.themealdb.com/api/json/v1/1/search.php?f={letter}"
        response = requests.get(url)
        data = response.json()
        meals = data.get("meals")
        if meals:
            all_meals.extend(meals)

    if not all_meals:
        return {"message": "No meals found"}

    def ingredient_count(meal):
        return sum(
            1 for i in range(1, 21)
            if meal.get(f"strIngredient{i}") and meal.get(f"strIngredient{i}").strip()
        )

    least_meal = min(all_meals, key=ingredient_count)

    return {
        "meal_name": least_meal["strMeal"],
        "ingredient_count": ingredient_count(least_meal),
        "ingredients": [
            least_meal.get(f"strIngredient{i}")
            for i in range(1, 21)
            if least_meal.get(f"strIngredient{i}") and least_meal.get(f"strIngredient{i}").strip()
        ]
    }