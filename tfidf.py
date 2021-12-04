from pyspark.ml.feature import HashingTF, IDF, Tokenizer
from pyspark.sql import *
from pyspark.context import SparkContext
from pyspark.sql.session import SparkSession
import json
from pyspark.ml.feature import CountVectorizer
from pyspark.sql.functions import udf
from pyspark.sql.types import DoubleType, ArrayType
from pyspark.sql.types import *
from pyspark.sql import functions as F


#with open ('test1.json') as f1: 
#	upload_json = json.load(f1)

def got_dataframe(upload_json):
	result = []
	for r in upload_json["info"]:
		if "rating" in r.keys() and "title" in r.keys():
			result.append((r['rating'], r['title']))
		else:
			return []
	return result

def extract_keys_from_vector(vector):
    return vector.indices.tolist()

def extract_values_from_vector(vector):
    return vector.values.tolist()

def got_vocabulary(items_dict, vocabulary_lst):
	result = set()
	for k, v in items_dict.items():
		if len(v) != 0:
			key = max(v, key=v.get)
			result.add(vocabulary_lst[key])
	return result

def tfidf(upload_json):
	data = got_dataframe(upload_json)
	if len(data) == 0:
		return data

	sc = SparkContext.getOrCreate()
	spark = SparkSession(sc)
	#data = [(5.0, 'Pulp Fiction'), (3.5, 'Three Colors: Red (Trois couleurs: Rouge)'), (5.0, 'Three Colors: Blue (Trois couleurs: Bleu)'), (5.0, 'Underground'), (3.5, "Singin' in the Rain"), (4.0, 'Dirty Dancing'), (3.5, 'Delicatessen'), (3.5, 'Ran'), (5.0, 'Seventh Seal, The (Sjunde inseglet, Det)'), (4.0, 'Bridge on the River Kwai, The')]
	sentenceData = spark.createDataFrame(data, ["label", "sentence"])
	tokenizer = Tokenizer(inputCol="sentence", outputCol="words")
	wordsData = tokenizer.transform(sentenceData)
	#for words_label in wordsData.select("words", "label").take(3):
	#	print(words_label)

	countVect = CountVectorizer(inputCol="words", outputCol="tf",  minDF=2.0)

	model = countVect.fit(wordsData)
	result = model.transform(wordsData)
	count = model.transform(wordsData).select("tf").collect()
	#print(model.vocabulary)
	#print(count)
	#[Row(tf=SparseVector(7, {3: 1.0})), Row(tf=SparseVector(7, {1: 1.0, 2: 1.0, 3: 1.0, 4: 1.0, 5: 1.0})), Row(tf=SparseVector(7, {1: 1.0, 2: 1.0, 4: 1.0, 5: 1.0})), Row(tf=SparseVector(7, {})), Row(tf=SparseVector(7, {0: 1.0})), Row(tf=SparseVector(7, {})), Row(tf=SparseVector(7, {})), Row(tf=SparseVector(7, {})), Row(tf=SparseVector(7, {0: 1.0, 6: 1.0})), Row(tf=SparseVector(7, {0: 2.0, 6: 1.0}))]

	vocabulary_lst = model.vocabulary

	idf = IDF(inputCol="tf", outputCol="idf")
	idfModel = idf.fit(result)
	rescaledData = idfModel.transform(result)
	rescaledData.select("label", "idf")



	for s in rescaledData.select("idf").take(len(data)):
	#print(s)
		extract_values = udf(lambda vector:extract_values_from_vector(vector), ArrayType(DoubleType()))
		extract = rescaledData.withColumn("extracted_values", extract_values("idf"))


	for s in rescaledData.select("idf").take(len(data)):
		feature_extract = F.UserDefinedFunction(lambda vector: extract_keys_from_vector(vector), ArrayType(IntegerType()))
		extract1 = rescaledData.withColumn("extracted_keys", feature_extract("idf"))

#extract.show()
#extract1.show()

	values_lst = []
	values = extract.select("extracted_values").collect()
#print(values)
	for i in values:
	#print(i)
		values_lst.append(i["extracted_values"])

	keys_lst = []
	keys = extract1.select("extracted_keys").collect()
	for j in keys:
		keys_lst.append(j["extracted_keys"])


	items_dict = dict()
	for i in range(len(values_lst)):
		if data[i][0] == 5.0:
			items_dict[i] = dict()
			for j in range(len(values_lst[i])):
				items_dict[i][keys_lst[i][j]] = values_lst[i][j]
	result = got_vocabulary(items_dict, vocabulary_lst)
	return list(result)

#for d in range(len(data)):
#	items_dict[d]['rating'] = data[d][0]

#print(items_dict)
#print(vocabulary_lst)



#print(got_dataframe(upload_json))
#print(tfidf(upload_json))




#print(values_lst)
#print(keys_lst)
