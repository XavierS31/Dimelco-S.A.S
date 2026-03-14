import os

from dotenv import load_dotenv
from flask import Flask
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__)

# Supabase: use service role key for backend (full access). Never expose to frontend.
supabase: Client = create_client(
    os.environ.get("SUPABASE_URL", ""),
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY", ""),
)


@app.route("/")
def index():
    response = supabase.table("todos").select("*").execute()
    todos = response.data

    html = "<h1>Todos</h1><ul>"
    for todo in todos:
        html += f'<li>{todo["name"]}</li>'
    html += "</ul>"

    return html


@app.route("/health")
def health():
    return {"status": "ok", "service": "dimelco-backend"}


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 4000)))
