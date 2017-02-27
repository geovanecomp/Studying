# -*- coding: UTF-8 -*-

import pandas as pd

if __name__ == '__main__':

    classifiers = pd.read_csv('emails.csv')

    # Getting the column email
    texts = classifiers['email']

    # Apply to lower function to not distinct case sensitive words
    texts = texts.str.lower()

    
