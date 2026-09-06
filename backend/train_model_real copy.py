import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder
import os

print("📊 Loading car data...")

# Load CSV
df = pd.read_csv('car_data.csv')

print(f"✅ Loaded {len(df)} records")
print(f"Columns: {df.columns.tolist()}")

# Data preprocessing
le_fuel = LabelEncoder()
le_sell = LabelEncoder()
le_trans = LabelEncoder()

df['Fuel_Type_Encoded'] = le_fuel.fit_transform(df['Fuel_Type'])
df['Selling_type_Encoded'] = le_sell.fit_transform(df['Selling_type'])
df['Transmission_Encoded'] = le_trans.fit_transform(df['Transmission'])

# Features: Year, Driven_kms, Fuel_Type, Selling_type, Transmission, Owner, Present_Price
X = df[['Year', 'Driven_kms', 'Fuel_Type_Encoded', 'Selling_type_Encoded', 'Transmission_Encoded', 'Owner', 'Present_Price']].values
y = df['Selling_Price'].values

print(f"\n📈 Features shape: {X.shape}")
print(f"📊 Target shape: {y.shape}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\n🔄 Training data: {X_train.shape[0]} records")
print(f"🔍 Testing data: {X_test.shape[0]} records")

# Train model
print("\n🤖 Training Random Forest Model...")
model = RandomForestRegressor(n_estimators=100, max_depth=20, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mse)

print(f"\n✅ Model trained successfully!")
print(f"📊 R² Score: {r2:.4f}")
print(f"📈 RMSE: {rmse:,.2f}")
print(f"📉 MSE: {mse:,.2f}")

# Save model
output_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
with open(output_path, 'wb') as f:
    pickle.dump(model, f)

print(f"\n💾 Model saved to {output_path}")
print(f"\n🎉 Ready for predictions!")