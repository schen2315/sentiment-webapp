from urllib.parse import urlencode

# after getting the queries
# we need to only get the relevant tweets
# run each tweet through the LR model
# calculate the final score

def search(api, query, location):
	location = location['latitude'] + "," + location['longitude'] + "," + "100km"
	seq = [('q', query), ('result_type', 'recent'), ('geocode', location),
			('count', 100)]
	query = urlencode(seq)
	results = api.GetSearch(raw_query= query)
	raw_tweets = []
	for i in range(0, len(results)):
		raw_tweets.append(results[i].text)
	return raw_tweets
	# return results


