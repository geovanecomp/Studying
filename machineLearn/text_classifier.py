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
    dictionary = set()

    # For each word in broken_texts, I'll put only news into dictionary
    for word in broken_texts:
        dictionary.update(word)


    number_of_words = len(dictionary)

    # Mapping every word to a respective number
    zip(dictionary, xrange(number_of_words))
