from django.http import HttpResponse
from django.shortcuts import render
from sklearn.externals import joblib
import json
import twitter
import sys
sys.path.append('sentiment-analysis')
# sys.path.append('main/static')
# sys.path.append('main/static/main/sentiment-analysis')

import tweets
import keys
import load_model
# on startup
# load in the model
# load in the wordset
# write a function for search
features = []
wordset = {}
model = joblib.load("sentiment-analysis/twitter_sentiment.pkl")
with open("sentiment-analysis/feature_names.json", "r") as infile:
	features = json.load(infile)
nfeatures = len(features)
for i in range(0, nfeatures):
	wordset[features[i]] = i

api = twitter.Api(consumer_key=keys.consumer_key,
                  consumer_secret=keys.consumer_secret,
                  access_token_key=keys.access_token,
                  access_token_secret=keys.access_token_secret)


# Create your views here.
def index(request):
	return render(request, 'main/index.html')
def search(request):
	# for now just call the twitter api
	# get tweets based on the location
	latitude = request.GET['geo_lat']
	longitude = request.GET['geo_long']
	query = request.GET['q']
	location = {'latitude': latitude, 'longitude': longitude}
	results = tweets.search(api, query, location)
	results = load_model.predict(results, model, wordset, nfeatures)
	return render(request, 'main/map.html', {'tweets': results} )
    