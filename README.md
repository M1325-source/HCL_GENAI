# 🤖 HCL GenAI Project

A **Generative AI** learning project built during HCL training, consisting of three modules demonstrating API integration, RAG pipelines, and frontend development.

---

## 📁 Project Modules

### 1. 🍽️ MealsDB
A web application that fetches and displays meal data from the MealsDB API.

**Features:**
- Search meals by name or ingredient
- Display meal details, ingredients, and instructions
- Clean HTML/CSS/JavaScript frontend

**Tech:** HTML, CSS, JavaScript, MealsDB API

---

### 2. 🤖 RAG_Meals_db
A **Retrieval-Augmented Generation (RAG)** pipeline built on top of MealsDB data.

**How it works:**
```
MealsDB Data → Embeddings → Vector Store → LLM Query → Answer
```

**Features:**
- Converts meal data into vector embeddings
- Semantic search over meal database
- Ask natural language questions about meals
- LLM generates grounded answers from retrieved context

**Tech:** Python, LangChain, Vector Database, LLM API

---

### 3. 🌍 RestCountries
A web application integrating the REST Countries API to display country information.

**Features:**
- Search and filter countries
- Display flags, population, capital, region
- Interactive UI with JavaScript

**Tech:** HTML, CSS, JavaScript, REST Countries API

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Python | RAG pipeline backend |
| LangChain | RAG orchestration |
| JavaScript | Frontend interactivity |
| HTML/CSS | UI design |
| MealsDB API | Meal data source |
| REST Countries API | Country data source |

---

## 🚀 Setup

### RAG Module (Python)
```bash
cd RAG_Meals_db
pip install -r requirements.txt
python app.py
```

### MealsDB / RestCountries (Frontend)
```bash
# Simply open index.html in browser
# Or use Live Server in VS Code
```

---

## 📚 What I Learned

- Building RAG pipelines with LangChain
- Vector embeddings and semantic search
- REST API integration in JavaScript
- GenAI application architecture

---

## 👨‍💻 Author

Built as part of **HCL GenAI Training Program** to demonstrate practical Generative AI skills.
