def welcome_messages()
  puts 'Welcome to the Guess Game'
  puts 'What is your name?'
  name = gets
  puts 'The game will begins ' + name
  puts "\n\n\n"
end

def get_random_number(limiter=200)
  puts 'Choosing a random number between 0 to ' + limiter.to_s
  secret_number = 111
  secret_number
end

def get_user_guess()
  puts 'Guess the numer: '
  guess_number = gets.to_i

  guess_number
end

def isCorrectGuess(secret_number, user_guess)
  correct_number = user_guess == secret_number
  if correct_number
    puts 'You win!'
    return true
  end

  puts 'You lose!'
  bigger = secret_number > user_guess
  if bigger
    puts "The correct number is bigger"
  else
    puts "The correct number is smaller"
  end

  false
end

# ---------------------- MAIN ----------------------

welcome_messages
secret_number = get_random_number(5)
max_attempt = 5

for attempt in 1..max_attempt
  puts attempt.to_s + 'º attempt'

  guess_number = get_user_guess()

  break if isCorrectGuess(secret_number, guess_number)

end

puts 'The secret number is: ' + secret_number.to_s
