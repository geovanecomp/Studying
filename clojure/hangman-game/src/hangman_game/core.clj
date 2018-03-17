(ns hangman-game.core
  (:gen-class))

(def number-of-lives 6)

(defn lose [] (print "You lose"))
(defn win [] (print "You win"))

(defn missing-letters [word hits]
  (remove (fn [letter] (contains? hits (str letter))) word)
)

(defn correct-word? [word hits]
  (empty? (missing-letters word hits))
)

(defn game [lives word hits]
  (if (= lives 0)
    (lose)
    (if (correct-word? word hits)
      (win)
      (print "Guess the letter")
      ; (do
      ;     (print lives)
      ;     (game (dec lives))
    )
  )
)

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
