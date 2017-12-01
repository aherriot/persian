## persianflashcards.com

[![Travis CI Build Status Indicator](https://travis-ci.org/aherriot/persian.svg?branch=master "tranvis")](https://travis-ci.org/aherriot/persian)

A curated flashcard app for Persian language learners using React, Redux,
Express, and MongoDB hosted at
[persianflashcards.com](https://www.persianflashcards.com).

This app uses a curated list of Persian words and phrases that are managed by
me, but it allows other users to study the shared set of flashcards and track
their progress independently.

I made this project for three reasons:

1. I was disappointed with the lack of good Persian language learning resources
   on the internet. Most of what I have found is full of errors and
   inconsistencies.
2. I want a better card selection algorithm that would focus on words that I
   struggle with, so this app uses a spaced repetition algorithm.
3. I wanted something that tracks the progress of translating Persian to English
   independently of English to Persian, which I find more helpful.

## Spaced Repitition algorithm

The core of the spaced repetition algorithm works by assigning words into score
buckets numbered 0 through 7. If the word is answered correctly, the word is
moved up one bucket. If the word is answered incorrectly, the word is reset back
to bucket 0. The timestamp of when it was last tested is also stored.

Words that are in the 0th bucket are eligible to be selected immediately, while
words in other buckets are selected only after a set amount of time since the
last time it was chosen. For example, one hour for bucket 1, one day for bucket
2, three days for bucket 3 etc... In other words, the better we know a word, the
less often we test it.

In addition to this, we do not want to overwhelm the user with too many words
that have never been tested. Only if there are less than five words in bucket 0,
do we then start to introduce new, untested words, to prevent the user from
being overwhelmed.

Also, if all words in the category have been tested correctly and the time has
not passed for them to be retested, a message will be displayed prompting them
to try a different category and if they still continue, words will be chosen at
random, even if it is too early to test.

TODO: These calculation don't need to be done every time a word is selected so
in the future, we can cache the list of candidate words, when words are answered
correctly, we remove it from the list, when words are answered incorrectly, we
keep it in the list Then every 10 minutes or so, we can recalculate if other
words are now ready to be tested and can be included in the candidate words.

Made by Andrew Herriot, 2017
