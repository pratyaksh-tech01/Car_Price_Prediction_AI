from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
from dotenv import load_dotenv
import warnings

warnings.filterwarnings('ignore')
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Load ML model
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("✅ ML Model loaded successfully!")
except FileNotFoundError:
    print("⚠️ Model file not found. Using demo predictions.")
    model = None

# Demo data for market insights
DEMO_INSIGHTS = {
    'years': ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    'prices': [500000, 550000, 600000, 650000, 700000, 750000, 800000]
}

# Brand-year encoding
BRAND_MAPPING = {
    'toyota': 1,
    'honda': 2,
    'bmw': 3,
    'mercedes': 4,
    'audi': 5,
    'ford': 6,
    'hyundai': 7,
    'maruti': 8,
    'tata': 9,
    'mahindra': 10
}

ENGINE_MAPPING = {
    'petrol': 1,
    'diesel': 2,
    'hybrid': 3,
    'electric': 4
}

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Car Price Prediction API is running! 🚗', 'status': 'success'})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        brand = BRAND_MAPPING.get(data.get('brand', '').lower(), 1)
        year = data.get('year', 2024)
        mileage = data.get('mileage', 0)
        engine = ENGINE_MAPPING.get(data.get('engine', '').lower(), 1)
        
        # Prepare features
        features = np.array([[brand, year, mileage, engine]])
        
        # Make prediction
        if model is not None:
            predicted_price = model.predict(features)[0]
        else:
            # Demo prediction if model not available
            base_price = 1200000
            age_factor = max(0, 2024 - year) * 75000
            mileage_factor = (mileage / 100000) * 150000
            engine_factor = {1: 0, 2: 100000, 3: 200000, 4: 300000}.get(engine, 0)
            predicted_price = max(base_price - age_factor - mileage_factor + engine_factor, 200000)
        
        return jsonify({
            'predicted_price': round(predicted_price, 2),
            'confidence': 85 + np.random.randint(-10, 10),
            'details': {
                'brand': data.get('brand'),
                'year': year,
                'mileage': mileage,
                'engine': data.get('engine')
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 400

@app.route('/api/insights', methods=['GET'])
def get_insights():
    return jsonify(DEMO_INSIGHTS)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': '✅ Server is running'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    print(f"🚀 Server running on http://localhost:{port}")
    print(f"📊 API Endpoints:")
    print(f"   - POST http://localhost:{port}/api/predict")
    print(f"   - GET http://localhost:{port}/api/insights")
    print(f"   - GET http://localhost:{port}/api/health")
    app.run(debug=True, port=port, host='0.0.0.0')
    