#Link up to webdriver
from selenium import webdriver
from bs4 import BeautifulSoup;


PATH = "C:\Program Files (x86)\chromedriver.exe"
# use webdriver with PATH
driver = webdriver.Chrome(PATH)

driver.get("https://www.sephora.com/shop/moisturizer-skincare")

content = driver.page_source
soup = BeautifulSoup(content, "html.parser")

brand_name = soup.find_all("span", {"class": "css-182j26q"})
brand_prod = soup.find_all("span", {"class": "css-pelz90"})

brand = []

print(brand_name[0].text,brand_prod[0].text)

driver.quit()