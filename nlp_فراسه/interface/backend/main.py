from fastapi import FastAPI
from pydantic import BaseModel
import os
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(__file__)

model = joblib.load(os.path.join(BASE_DIR, "tfidf_model.pkl"))
tfidf = joblib.load(os.path.join(BASE_DIR, "vectorizer.pkl"))

class TextData(BaseModel):
    text: str

@app.post("/predict")
async def predict(data: TextData):

    text_vector = tfidf.transform([data.text])
    prediction = model.predict(text_vector)[0]

    mapping = {0: "negative", 1: "positive", 2: "neutral"}
    mapping_ar = {0: "سلبي", 1: "إيجابي", 2: "متعادل"}

    return {
        "sentiment": mapping.get(prediction, "neutral"),
        "label": mapping_ar.get(prediction, "متعادل"),
        "score": 1.0
    }

@app.get("/debug")
def debug():
    return {
        "model_type": str(type(model)),
        "tfidf_type": str(type(tfidf))
    }