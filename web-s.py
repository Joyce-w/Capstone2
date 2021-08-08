import requests;
# parse html
from bs4 import BeautifulSoup;
from selenium import webdriver;
# # extract data
import pandas as pd;

URL = "https://www.paulaschoice.com/ingredient-dictionary"
page=requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find_all("tr", {"class": "ingredient-result"})

rating = [];
name = [];
description=[];

for ingredient in results:
    ingredient_rating = ingredient.td.text
    ingredient_name = ingredient.a.text

    rating.append(ingredient_rating)
    name.append(ingredient_name)
    
    if ingredient.p is not None:
        description.append(ingredient.p.text.strip())
    else:
        description.append('No Description')

df = pd.DataFrame({'Rating':rating,'Ingredient_Name':name, 'Ingredient_desc': description}) 
df.to_csv('products.csv', index=False, encoding='utf-8')   




