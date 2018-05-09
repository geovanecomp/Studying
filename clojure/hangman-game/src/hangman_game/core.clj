(ns hangman-game.core
  (:gen-class))
 
(def number-of-lives 6)
(def secret-word "RICE")

(defn lose [] (println "You lose"))
(defn win [] (println "You win"))

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

; Normaly for boolean functions we should use the '?'
(defn correct-word? [word hits]
  (empty? (missing-letters word hits))
)

(defn print-game-info [lives word hits]
  (println "Lives " lives)
  (doseq [letter (seq word)]
    (if (contains? hits (str letter))
      (print letter " ")
      (print "_" " ")
    ))
  (println)
)

(defn game [lives word hits]
  (print-game-info lives word hits)
  (cond
    (= lives 0) (lose)
    (correct-word? word hits) (win)
    :else
    ( let [user-guess (read-letter!)]
      (if (correct? user-guess word)
        (do
          (println "Correct letter!")
          ; To do a smart recursive call, it's necessary to use recur instead the function name
          (recur lives word (conj hits user-guess))
        )
        (do
          (println "Incorrect letter!")
          (recur (dec lives) word hits)
        )
      )
    )
  )
)

(defn start-game []
  (game number-of-lives secret-word #{})
)

(defn -main [& args]
  "The awesome Hangman game"
  (start-game)
)
