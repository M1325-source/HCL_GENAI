import chromadb
from chromadb.utils import embedding_functions
from fetch_meals import fetch_meals

client = chromadb.PersistentClient(path="./chroma_storage")

sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

collection = client.get_or_create_collection(
    name="meals",
    embedding_function=sentence_transformer_ef
)

meals = fetch_meals()

for meal in meals:

    ingredients = []
    for i in range(1, 21):
        ingredient = meal.get(f"strIngredient{i}")
        if ingredient and ingredient.strip() != "":
            ingredients.append(ingredient)

    text = f"""
    Meal Name: {meal['strMeal']}
    Category: {meal['strCategory']}
    Area: {meal['strArea']}
    Ingredients: {', '.join(ingredients)}
    Instructions: {meal['strInstructions']}
    """

    collection.add(
        documents=[text],
        ids=[meal["idMeal"]]
    )

print("✅ Meals stored successfully")
