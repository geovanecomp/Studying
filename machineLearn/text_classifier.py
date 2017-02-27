# -*- coding: UTF-8 -*-

import pandas as pd

def vectorize_text(text, dictionary):
    word_counter = [0] * len(dictionary)
    for word in text:
        index = dictionary[word]
        word_counter[index] += 1

    return word_counter

if __name__ == '__main__':

    classifiers = pd.read_csv('emails.csv')

    # Getting the column email
    texts = classifiers['email']

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

    print counted_texts
