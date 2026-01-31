import xgboost as xgb
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Sample training data (synthetic for hackathon)
data = pd.DataFrame({
    "apy": [5.8, 6.1, 6.5, 7.2, 8.0],
    "apy_change": [-0.05, 0.01, 0.15, 0.4, 0.9],
    "volatility": [0.1, 0.15, 0.3, 0.6, 1.0],
    "risk": ["LOW", "LOW", "MEDIUM", "MEDIUM", "HIGH"]
})

X = data[["apy", "apy_change", "volatility"]]
y = LabelEncoder().fit_transform(data["risk"])

model = xgb.XGBClassifier(
    objective="multi:softprob",
    num_class=3,
    max_depth=3,
    n_estimators=50
)

model.fit(X, y)
model.save_model("model.json")

print("Model trained and saved.")
