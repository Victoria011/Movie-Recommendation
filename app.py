# runs on http://127.0.0.1:5000/
from flask import Flask, request, redirect, jsonify
import requests
from flask_cors import CORS
from flask import send_from_directory
import json
import base64
from io import BytesIO
import numpy as np
from PIL import Image
import random
from time import sleep 
import output
import poster_predict
import tfidf

cors = CORS()
app = Flask(__name__, static_url_path='', static_folder='frontend/')

def get_features(json_file):
	feature_list = tfidf.tfidf(json_file) 
	return feature_list


def get_all_keys(dl,keys_list):
    if isinstance(dl, dict):
        keys_list += dl.keys()
        map(lambda x: get_all_keys(x, keys_list), dl.values())
    elif isinstance(dl, list):
        map(lambda x: get_all_keys(x, keys_list), dl)

def count_all_obj(dl):
	curr = 0
	for k, v in dl.items():
		curr += len(v)
	return curr

def get_file_metadata(content, filename, fileSize, file_features):
	new_meta = dict()
	file_id = get_datasets_count()
	keys_list = []
	get_all_keys(content,keys_list)
	attribCount = len(keys_list)
	ds_name = filename[:-5]+"_"+str(file_id)
	rowCount = count_all_obj(content)
	if len(file_features) == 0:
		file_features = keys_list
	new_meta = {"id":file_id, "name":ds_name, "rowCount":rowCount, "fileSize":fileSize, "attribCount":attribCount,"features":file_features}
	return new_meta

def update_metadata(newM):
	metadata_url = 'https://moivedata-default-rtdb.firebaseio.com/metadata.json'
	old_metadata = requests.get(url=metadata_url).json()
	meta_list = old_metadata['metadata']
	meta_list.append(newM)
	old_metadata['metadata'] = meta_list
	requests.put(url = metadata_url, json = old_metadata)
	return meta_list

def get_datasets_count():
	url_total = "https://moivedata-default-rtdb.firebaseio.com/.json"
	datasets = requests.get(url=url_total).json()
	num_of_datasets = len(datasets)
	return num_of_datasets
	
def upload_firebase():
	requests.put(url="https://dsci551-project-34.firebaseio.com/movie_genre.json", json=data) # data 是dict就可以

def get_json_from_firebase():
	temp = requests.get(url="https://dsci551-project-34.firebaseio.com/movie_genre.json").json()
	info = temp['info']
	title_id = temp['title_id']
	features = list(temp.keys())

def getResultByGenres(genres):
	result = output.main_func(genres)
	result_json = {'input_genres': genres, 'output_result': result}
	requests.put(url = "https://moivedata-default-rtdb.firebaseio.com/history/" + output.generate_prediction_name(), json = result_json)
	return result

def getResultByPoster(movie_data):
	tmpgenres = poster_predict.pass_poster(movie_data)
	result = output.main_func(tmpgenres)
	result_json = {'input_genres': tmpgenres, 'output_result': result}
	requests.put(url = "https://moivedata-default-rtdb.firebaseio.com/history/" + output.generate_prediction_name(), json = result_json)
	return result


@app.route("/")
def load():
    return send_from_directory(app.static_folder,'index.html')


@app.route("/genres", methods=['POST'])
def get_genres():
	search_q = request.get_json()
	genres = search_q['genres']
	result = getResultByGenres(genres)
	return jsonify({'msg': 'success', 'result': result})


@app.route("/uploadimage", methods=['POST'])
def get_image():
	if 'poster' in request.files:
		file = request.files['poster']
		filename = file.filename
		temp_data = [{'filename': filename}]
		if file:
			img = Image.open(file.stream) 
			upload_size = [img.width, img.height]
			newsize = (55, 80) 
			img = img.resize(newsize)
			result = getResultByPoster(img)
			return jsonify({'msg': 'success', 'result': result, 'metadata': upload_size})
	return "Upload image Error", 400 

@app.route("/uploadfile", methods=['POST'])
def get_file():
	if ("file" in request.files):
		file = request.files['file']
		filename = file.filename
		if file:
			content = file.read()
			fileSize = len(content) 
			tmp_data = json.loads(content)
			if 'info' in tmp_data:
				file_features = get_features(tmp_data)
			else:
				file_features = []
			file_meta = get_file_metadata(tmp_data, filename, fileSize, file_features)
			curr_meta = update_metadata(file_meta)
			
			upload_url = "https://moivedata-default-rtdb.firebaseio.com/" + file_meta['name'] +".json" 
			requests.put(url=upload_url, json=tmp_data)
			return_data = {'file': file_meta, 'total':curr_meta}
			return jsonify(return_data)
	return "Upload File Error", 400 

@app.route('/test')
def test():
	temp_json = {"title": "movie1"}
	url = 'https://ruiyilin011.df.r.appspot.com/rand/watch/movie/19404'
	data = requests.get(url=url).json()['detail']
	return jsonify(data)


if __name__ == "__main__": # if run from command line
    app.run(debug = True)