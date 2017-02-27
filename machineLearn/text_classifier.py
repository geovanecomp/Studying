# -*- coding: UTF-8 -*-

import pandas as pd
import numpy as np

from sklearn.svm import LinearSVC
from sklearn.cross_validation import cross_val_score
from sklearn.multiclass import OneVsRestClassifier
from sklearn.multiclass import OneVsOneClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import AdaBoostClassifier


def vectorize_text(text, dictionary):
    word_counter = [0] * len(dictionary)
    for word in text:
        index = dictionary[word]
        word_counter[index] += 1

    return word_counter

def fit_and_predict(model_name, model, training_data, training_marker, number_of_folds):
    # fit, predict and apply the folds
    scores = cross_val_score(model, training_data, training_marker, cv=number_of_folds)
    avg_success_rate = np.mean(scores)

    return avg_success_rate

if __name__ == '__main__':

    classifiers = pd.read_csv('emails.csv')

    # Getting the column email and the results of the destiny group to receive that email
    texts = classifiers['email']
    markers = classifiers['classificacao']

    # Apply to lower function to not distinct case sensitive words
    texts = texts.str.lower()

    # The next step is broken the texts in spaces
    broken_texts = texts.str.split(' ')

    # set(), to no repeat words (conjunto in portuguese)
    words = set()

    # For each word in broken_texts, I'll put only news into words
    for word in broken_texts:
        words.update(word)

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

    print '\n\nThe best model was: ', max(results), ': ', results[max(results)]
