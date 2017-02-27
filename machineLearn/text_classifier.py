# -*- coding: UTF-8 -*-

import pandas as pd
import numpy as np
import nltk
# nltk.download('stopwords') # If I want download the stio wiords
# nltk.download('rslp')
from sklearn.svm import LinearSVC
from sklearn.cross_validation import cross_val_score
from sklearn.multiclass import OneVsRestClassifier
from sklearn.multiclass import OneVsOneClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import AdaBoostClassifier


def vectorize_text(text, dictionary):
    word_counter = [0] * len(dictionary)
    for word in text:
        if len(word):
            stem = stemmer.stem(word)
            if stem in dictionary:
                index = dictionary[stem]
                word_counter[index] += 1

    return word_counter

def fit_and_predict(model_name, model, training_data, training_marker, number_of_folds):
    # fit, predict and apply the folds
    scores = cross_val_score(model, training_data, training_marker, cv=number_of_folds)
    avg_success_rate = np.mean(scores)

    return avg_success_rate

if __name__ == '__main__':

    classifiers = pd.read_csv('emails.csv', encoding = 'utf-8')

    # Getting the column email and the results of the destiny group to receive that email
    texts = classifiers['email']
    markers = classifiers['classificacao']

    # Apply to lower function to not distinct case sensitive words
    texts = texts.str.lower()

    # The next step is broken the texts in spaces
    broken_texts = texts.str.split(' ')

    # set(), to no repeat words (conjunto in portuguese)
    words = set()

    # Removing the stop words, that do not help the classifier
    stopwords = nltk.corpus.stopwords.words('portuguese')

    # RSLPS = Removedor de Sufixo da Lingua Portuguesa
    stemmer = nltk.stem.RSLPStemmer()

    # For each word in broken_texts, I'll put only news into words
    for word_list in broken_texts:
        # valid_words = [word for word in word_list if word not in stopwords and len(word) > 0]
        # print 'Palavra valida: ', valid_words, '\n'
        valid_words = [stemmer.stem(word) for word in word_list if word not in stopwords and len(word) > 0]
        words.update(valid_words)

    # Mapping every word to a respective number
    tuplas = zip(words, xrange(len(words)))

    # Making a dictionary
    dictionary = {word:index for word, index in tuplas}

    counted_texts_vectors = [vectorize_text(text, dictionary) for text in broken_texts]

    # Adapting to the recognizer pattern
    X = counted_texts_vectors
    Y = markers

    # Separating training and validation
    training_percentage = 0.8

    len_training = int(training_percentage * len(Y))
    len_validation = len(Y) - len_training

    training_data = X[0:len_training]
    training_marker = Y[0:len_training]

    validation_data = X[len_training:]
    validation_marker = Y[len_training:]


    results = {}
    # Applying to OneVsRestClassifier
    one_vs_rest_model   = OneVsRestClassifier(LinearSVC(random_state=0))
    one_vs_one_model    = OneVsOneClassifier(LinearSVC(random_state=0))
    multinomial_model   = MultinomialNB()
    ada_boost_model     = AdaBoostClassifier()

    results['OneVsRestClassifier']  = fit_and_predict("OneVsRestClassifier", one_vs_rest_model, training_data, training_marker, 10)
    results['OneVsOneClassifier']   = fit_and_predict("OneVsOneClassifier", one_vs_one_model, training_data, training_marker, 10)
    results['MultinomialNB']        = fit_and_predict("MultinomialNB", multinomial_model, training_data, training_marker, 10)
    results['AdaBoostClassifier']   = fit_and_predict("AdaBoostClassifier", ada_boost_model, training_data, training_marker, 10)

    print results

    print '\n\nThe best model was: ', max(results, key=results.get), ': ', results[max(results, key=results.get)]
