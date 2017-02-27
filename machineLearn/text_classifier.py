# -*- coding: UTF-8 -*-

import pandas as pd

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
    number_of_words = len(words)
    tuplas = zip(words, xrange(number_of_words))

    # Making a dictionary
    dictionary = {word:index for word, index in tuplas}

    word_counter = [0] * number_of_words
    # word_counter = {}

    for text in broken_texts:
        for word in text:
            print word
            index = dictionary[word]
            print index
            word_counter[index] += 1


    print word_counter
