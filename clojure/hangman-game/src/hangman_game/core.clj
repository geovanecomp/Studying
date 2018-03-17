(ns hangman-game.core
  (:gen-class))

(def number-of-lives 6)

(defn lose [] (print "You lose"))

(defn game [lives]
  (if (= lives 0)
    (lose)
    (do
        (print lives)
        (game (dec lives))
    )
  )
)

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
