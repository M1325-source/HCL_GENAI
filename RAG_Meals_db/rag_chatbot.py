import chromadb
from chromadb.utils import embedding_functions

client = chromadb.PersistentClient(path="./chroma_storage")

sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

collection = client.get_collection(
    name="meals",
    embedding_function=sentence_transformer_ef
)


def retrieve_context(query):
    results = collection.query(
        query_texts=[query],
        n_results=3
    )
    return results["documents"][0][0]


def clean_context(context):
    lines = context.split("\n")
    category = ""
    description = ""

    for line in lines:
        if "Category:" in line:
            category = line.replace("Category:", "").strip()
        if "Description:" in line:
            description = line.replace("Description:", "").strip()

    return category, description


def generate_answer(query, category, description):
    query = query.lower()

    if "what" in query or "define" in query or "category" in query:
        return f"{category} is a meal category. {description}"

    if "idea" in query or "suggest" in query:
        return f"You can explore dishes under the {category} category. It includes: {description[:200]}..."

    if "healthy" in query:
        return f"If you're looking for healthy options, the {category} category may include suitable meals. {description[:180]}..."

    return f"Here is information about the {category} category:\n{description}"


def chatbot():
    print("🍽 Smart Meal RAG Chatbot Ready (type 'exit' to stop)\n")

    while True:
        user_query = input("You: ")

        if user_query.lower() == "exit":
            break

        context = retrieve_context(user_query)
        category, description = clean_context(context)
        answer = generate_answer(user_query, category, description)

        print("\n🤖 Answer:")
        print(f"context : {context}")
        print(answer)
        print("-" * 60)


if __name__ == "__main__":
    chatbot()
