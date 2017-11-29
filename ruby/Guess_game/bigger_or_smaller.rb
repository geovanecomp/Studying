secret_number = 111
puts 'What is your name?'
name = gets
puts 'The game will begins ' + name

max_attempt = 5

for attempt in 1..max_attempt
  puts attempt.to_s + 'º attempt'

  puts 'Guess the numer: '
  guess_number = gets.to_i

  correct_number = guess_number == secret_number

  if correct_number
    puts 'You win!'
    break
  else
    puts 'You lose!'
    bigger = secret_number > guess_number
    if bigger
      puts "The correct number is bigger"
    else
      puts "The correct number is smaller"
    end
  end
end
