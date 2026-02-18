# 🍽 Least Ingredient Meal Finder API

This project is a FastAPI-based REST API that integrates with TheMealDB public API to find the meal with the least number of ingredients.

## 🚀 Features

- Fetches meals from TheMealDB API
- Aggregates meals from 'a' to 'z'
- Dynamically counts non-empty ingredient fields (strIngredient1–strIngredient20)
- Returns the meal with the minimum number of ingredients
- Clean and scalable API design

---

## 🔗 API Endpoint

### Get Meal With Least Ingredients

GET /least-ingredient-meal

shell
Copy code

### Example:

http://127.0.0.1:8000/least-ingredient-meal

yaml
Copy code

---

## 🛠 Tech Stack

- Python 3.10+
- FastAPI
- Requests
- Uvicorn

---

## ⚙️ How It Works

1. Iterates from 'a' to 'z'
2. Calls TheMealDB API for each letter:
https://www.themealdb.com/api/json/v1/1/search.php?f={letter}

yaml
Copy code
3. Collects all meals
4. Counts only non-empty ingredient fields
5. Returns the meal with the lowest ingredient count

---

## ▶️ Run Locally

### 1. Clone Repository

git clone https://github.com/M1325-source/HCL_GENAI.git
cd HCL_GENAI

shell
Copy code

### 2. Create Virtual Environment

python -m venv venv

makefile
Copy code

Activate:

Windows:
venv\Scripts\activate

makefile
Copy code

Mac/Linux:
source venv/bin/activate

shell
Copy code

### 3. Install Dependencies

pip install fastapi uvicorn requests

shell
Copy code

### 4. Run Server

uvicorn main:app --reload

r
Copy code

Open in browser:
http://127.0.0.1:8000/docs

yaml
Copy code

---

## 📦 Example Response

{
"meal_name": "Example Meal",
"ingredient_count": 5,
"ingredients": [
"Ingredient1",
"Ingredient2",
"Ingredient3"
]
}

yaml
Copy code

---

## 🌟 Future Improvements

- Async implementation for better performance
- Caching using Redis
- Docker support
- Deployment on Render / Railway

---

## 📌 Author

Manisha priya
