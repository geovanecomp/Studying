(ns hangman-game.core
  (:gen-class))

(def number-of-lives 6)

(defn lose [] (print "You lose"))
(defn win [] (print "You win"))

(defn missing-letters [word hits]
  (remove (fn [letter] (contains? hits (str letter))) word)
)

; Normaly for functions that change the app state (like user input, read data and others)
(defn read-letter! []
  (println "Guess the letter:")
  (read-line)
)

(defn correct? [user-guess word]
  ; Using a java function
  (.contains word, user-guess)
)

(defn analyse-user-guess [user-guess lives word hits]
  (if (correct? user-guess word)
    (game lives word (conj hits user-guess))
    (game (dec lives) word hits)
  )
)

; Normaly for boolean functions we should use the '?'
(defn correct-word? [word hits]
  (empty? (missing-letters word hits))
)

(defn game [lives word hits]
  (if (= lives 0)
    (lose)
    (if (correct-word? word hits)
      (win)
      (analyse-user-guess (read-letter!) lives word hits)
    )
  )
)

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
