number = 111
puts 'What is your name?'
name = gets
puts 'The game will begins ' + name
puts 'Guess the numer: '
guess_number = gets.to_i

correct_number = guess_number == number

if correct_number
  puts 'You win!'
else
  puts 'You lose!'
end
