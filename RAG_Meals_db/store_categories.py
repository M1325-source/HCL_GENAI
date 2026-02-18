import chromadb
from chromadb.utils import embedding_functions
from fetch_categories import fetch_categories

# Create persistent database
client = chromadb.PersistentClient(path="./chroma_storage")

# Local embedding model (NO API KEY NEEDED)
sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

# Create or get collection
collection = client.get_or_create_collection(
    name="meal_categories",
    embedding_function=sentence_transformer_ef
)

# Fetch categories
categories = fetch_categories()

# Insert into Chroma
for category in categories:
    text = f"""
    Category: {category['strCategory']}
    Description: {category['strCategoryDescription']}
    """

    collection.add(
        documents=[text],
        ids=[category["idCategory"]],
        metadatas=[{
            "category": category["strCategory"]
        }]
    )

print("✅ Categories stored in ChromaDB successfully!")
