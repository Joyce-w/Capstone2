import requests;
from bs4 import BeautifulSoup;

URL = "https://www.paulaschoice.com/ingredient-dictionary"
page=requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find_all("tr", {"class": "ingredient-result"})

# get ingredient rating
print(results[0].td.text)
#get ingredient name
print(results[0].a.text)
#get ingredient description
print(results[0].p.text)