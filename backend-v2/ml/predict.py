import sys
import json
import os
import xgboost as xgb
import numpy as np

apy = float(sys.argv[1])
change = float(sys.argv[2])
volatility = float(sys.argv[3])

model = xgb.XGBClassifier()

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model.json")

model.load_model(MODEL_PATH)

X = np.array([[apy, change, volatility]])
prediction = model.predict(X)[0]

risk_map = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}

print(json.dumps({ "risk": risk_map[int(prediction)] }))
