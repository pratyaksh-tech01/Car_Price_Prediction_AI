import pickle
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import os

# Generate sample training data
np.random.seed(42)

X = np.random.randint(1, 11, (1000, 4))  # Brand, Year, Mileage, Engine
X[:, 1] = np.random.randint(2000, 2026, 1000)  # Year
X[:, 2] = np.random.randint(0, 300000, 1000)  # Mileage
X[:, 3] = np.random.randint(1, 5, 1000)  # Engine type

# Generate target prices (y) based on features
y = (
    1200000  # Base price
    - (2024 - X[:, 1]) * 75000  # Age factor
    - (X[:, 2] / 100000) * 150000  # Mileage factor
    + np.random.normal(0, 150000, 1000)  # Noise
)
y = np.maximum(y, 200000)  # Minimum price

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, max_depth=15, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"✅ Model trained successfully!")
print(f"📊 R² Score: {r2:.4f}")
print(f"📈 MSE: {mse:,.2f}")

# Save model in the correct directory
output_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
with open(output_path, 'wb') as f:
    pickle.dump(model, f)

print(f"💾 Model saved to {output_path}")