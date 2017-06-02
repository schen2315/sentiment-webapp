from django.http import HttpResponse
from django.shortcuts import render
from sklearn.externals import joblib
import json
import twitter
import sys
from django.http import JsonResponse
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
	# latitude = request.GET['geo_lat']
	# longitude = request.GET['geo_long']
	# query = request.GET['q']
	# location = {'latitude': latitude, 'longitude': longitude}
	# results = tweets.search(api, query, location)
	# results = load_model.predict(results, model, wordset, nfeatures)
	print(request.get_full_path())
	topic = request.GET.get('topic', 'wtf')
	print(topic)
	location = request.GET.get('location', 'new york')
	print(location)
	# topic = "topic"
	# location = "location"
	#get topic & location
	#render topic & location
	lat = 'latitude'
	lng = 'longitude'
	return render(request, 'main/map.html', {'topic': topic, 'location': location, 'lat': lat, 'long': lng})
def sentiment(request):
	topic = request.GET.get('topic', '-1')
	latitude = request.GET.get('latitude', '-1')
	longitude = request.GET.get('longitude', '-1')
	location = {'latitude': latitude, 'longitude': longitude}
	# results = {}
	results = tweets.search(api, topic, location)
	results = load_model.predict(results, model, wordset, nfeatures)
	# print(json.dumps(results))
	results = results.tolist()
	# calculate results
	pos = 0
	neg = 0
	neut = 0
	score = 0
	for i in range(0, len(results)):
		score = score + results[i]
		if(results[i] == -1):
			neg = neg + 1
		elif(results[i] == 0):
			neut = neut + 1
		else:
			pos = pos + 1
	score = score/ len(results)
	score = score + 1
	score = score / 2
	ratios = {
		'pos': pos/len(results),
		'neg': neg/len(results),
		'neut': neut/len(results)
	}

	# console.log('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAugfU7jM-hmbo0SwSCiuUDBfKA_on8k6I')
	# return {'topic': topic, 'geolocation': geolocation}
	# return JsonResponse({'topic': topic, 'latitude': latitude, 'longitude': longitude})
	return JsonResponse({'score': score, 'ratios': ratios})



    