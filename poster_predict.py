# loading model for prediction
import operator
import numpy as np
from keras.models import load_model

img = []

saved_models_folder = 'saved_models/'
align = 33
my_format = "{:.0%}"
eval_models = True
print_summary = True
print_test_movies = True
crop_results = 3
model = load_model('genres_1977_2017_g7_r30_e50_v2.h5')
genres = ['Comedy', 'Drama', 'Action', 'Animation', 'Romance', 'Adventure', 'Horror']

def get_prediction1(img_array):
    predictions = model.predict(img_array)
    predictions_map = dict()
    for i in range(len(genres)):
        predictions_map[genres[i]] = predictions[0][i]
    sorted_predictions = sorted(predictions_map.items(), key=operator.itemgetter(1), reverse=True)
    print(sorted_predictions)
    return sorted_predictions[:3] 

def pass_poster(data):
    print('passing')
    rgb_im = data.convert('RGB')
    pixels = []
    for x in range(rgb_im.size[0]):
        row = []
        for y in range(rgb_im.size[1]):
                r, g, b = rgb_im.getpixel((x, y))
                pixel = [r / 255, g / 255, b / 255]
                row.append(pixel)
        pixels.append(row)
    x =[pixels]
    img = np.array(x, dtype='float32')
    results = get_prediction1(img)
    genre_list = []
    for g, score in results:
        genre_list.append(g)
    return genre_list