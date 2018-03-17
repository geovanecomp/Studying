# Using urlopen ---------------------------------------------------------------
# from urllib.request import urlopen
# kittens = urlopen('http://placekitten.com')
# response = kittens.read()
# body = response[509:1000]
# print (body)

# Using requests ---------------------------------------------------------------
import requests

# # Make a GET request here and assign the result to kittens:
# response = requests.get('http://placekitten.com')

# print(response.text[559:1000])
# # More response information
# print(response.headers)
# print(response.status_code)

# # Sending a POST request
# body = {'Name': 'Eric', 'Age': '26'}
#
# # Make the POST request here, passing body as the data:
# response = requests.post('http://codecademy.com/learn-http/', data=body)
# print(response)
