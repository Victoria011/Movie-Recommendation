import sys
import json
import requests
import pandas as pd

with open ('ratings.json') as f1: 
	rating_json = json.load(f1)

print(rating_json)