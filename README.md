# Firasah Project - Arabic Sentiment Analysis

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://mhll-almshaer-aldhky.vercel.app/)
[![Canva Presentation](https://img.shields.io/badge/Canva_Presentation-00C4CC?style=for-the-badge&logo=canva&logoColor=white)](https://canva.link/f2wv4fgelp1jghr)

## Project Overview
**Firasah** is an end-to-end web application designed for Arabic text sentiment analysis using Natural Language Processing (NLP) and Machine Learning techniques. The platform features an interactive user interface that classifies sentiment and generates smart AI-powered response suggestions.

> **Live Demo:** [https://mhll-almshaer-aldhky.vercel.app/](https://mhll-almshaer-aldhky.vercel.app/)  
> **Note on AI Features:** We utilized custom-trained ML models along with the Gemini API for smart suggestions 😂 (If the AI suggestions do not load, it means the API key has expired or reached its quota limit).

---

## Project Structure

The project is organized into two main directories:

### 1. `Data` (Data Processing & Model Training)
Contains all data science workflows, including:
- **Data Collection:** Aggregating data from multiple open-source benchmarks.
- **Data Cleaning & Preprocessing:** Preparing Arabic text for training (removing diacritics, URLs, duplicates, and normalizations).
- **Modeling & Evaluation:** Training, benchmarking, and fine-tuning multiple sentiment classification models to select the top-performing architecture.

### 2. `interface` (Web App & Integration)
Contains the source code for the interactive web frontend and application logic:
- **Sentiment Model Integration:** Real-time inference pipeline connected to the trained Arabic sentiment classifier.
- **Gemini API Integration:** Seamless integration with Google Gemini to generate intelligent, context-aware reply suggestions based on input sentiment.

---

## Datasets
The sentiment analysis model was trained and evaluated on well-established Arabic benchmark datasets:

1. **ArSarcasm-v2**:
   - [GitHub Repository](https://github.com/iabufarha/ArSarcasm-v2)
2. **Arabic Sentiment Analysis Dataset (SS2030)**:
   - [Kaggle Dataset](https://www.kaggle.com/datasets/snalyami3/arabic-sentiment-analysis-dataset-ss2030-dataset)
3. **Arabic Sentiment Twitter Corpus**:
   - [Kaggle Dataset](https://www.kaggle.com/datasets/mksaad/arabic-sentiment-twitter-corpus)
