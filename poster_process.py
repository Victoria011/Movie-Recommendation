# read csv to json
import csv
import json

def make_json(csv_path, json_path, tidFilePath):
    # create a dictionary
    # data = {}
    info = {}
    title_id = {}
    i=0
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            i += 1
            if i > 5:
                break
            # Assuming a column named 'No' to
            # be the primary key
            key = rows['imdbId']
            tmp = {}
            tmp['link'] = rows['Imdb Link']
            if rows['Title'][-6] == '(' and rows['Title'][-1] == ')':
                tmp['title'] = rows['Title'][:-7]
                tmp['year'] = rows['Title'][-5:-1]
            else:
                tmp['title'] = rows['Title']
            tmp['score'] = rows['IMDB Score']
            tmp['genre'] = [x.lower() for x in rows['Genre'].split('|')]
            tmp['poster_url'] = rows['Poster']
            info[key] = tmp
            title_id[tmp['title']] = rows['imdbId']
    data['info'] = info
    data['title_id'] = title_id
    # Open a json writer, and use the json.dumps()
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
    # with open(tidFilePath, 'w', encoding='utf-8') as tidf:
    #     tidf.write(json.dumps(title_id, indent=4))

csvFilePath = 'MovieGenre.csv'
jsonFilePath = 'movie_genre.json'
tidFilePath = 'title_id.json'
make_json(csvFilePath, jsonFilePath, tidFilePath)
