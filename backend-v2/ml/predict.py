import sys
import json
import os
import xgboost as xgb
import numpy as np

try:
    if len(sys.argv) < 4:
        raise ValueError("Insufficient arguments provided")
    
    apy = float(sys.argv[1])
    change = float(sys.argv[2])
    volatility = float(sys.argv[3])
    
    # Validate inputs
    if not all(np.isfinite([apy, change, volatility])):
        raise ValueError("Invalid numeric inputs")
        
except (ValueError, IndexError) as e:
    print(json.dumps({"risk": "MEDIUM", "error": str(e)}))
    sys.exit(0)

try:
    model = xgb.XGBClassifier()
    
    BASE_DIR = os.path.dirname(__file__)
    MODEL_PATH = os.path.join(BASE_DIR, "model.json")
    
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")
    
    model.load_model(MODEL_PATH)
    
    X = np.array([[apy, change, volatility]])
    prediction = model.predict(X)[0]
    
    risk_map = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}
    
    print(json.dumps({"risk": risk_map.get(int(prediction), "MEDIUM")}))
    
except Exception as e:
    print(json.dumps({"risk": "MEDIUM", "error": str(e)}))
