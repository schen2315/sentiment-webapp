from django.test import TestCase
import numpy as np

import sys

sys.path.append('main/static/main/sentiment-analysis')
import load_model

class LRModelTest(TestCase):

	# write some tests for my sanitize function 
	'''
	make sure my raw2features function returns the same featureset
	as my test_input_cleaned feature set
	'''

	def test_sanitize(self):
		
	def test_load_model(self):
		'''
		test that the current sentiment prediction model is working as expected
		'''
		test_input = np.genfromtxt("main/static/main/sentiment-analysis/test_input.csv", delimiter="\n").astype(str)
		test_output = np.genfromtxt("main/static/main/sentiment-analysis/test_output.csv", delimiter=",").astype(int)
		my_output = load_model.predict(test_input)
		print(my_output)
		# self.assertIs(my_output == test_output, True)



