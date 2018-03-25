require_relative './plateau'
require_relative './probe'
require_relative './direction'

# For matrix, the first position is the top left corner instead the bottom left.
def adjust_cordinate_y (probe_position_y, plateau_len_y)
  # Matrix is from 0 until len_y
  plateau_len_y -= plateau_len_y

  return plateau_len_y - probe_position_y
end

def is_valid_position (probe_position_x, probe_position_y, plateau_len_x, plateau_len_y)
  if probe_position_x > plateau_len_x or probe_position_y > plateau_len_y
    return false
  end
  return true
end

def move (commands, probe, plateau)
  puts "The moviments are: "
  commands.each_char do |command|
    probe.print_status()
    probe.move(command)
  end
  probe.print_status()
end

def main ()
  plateau_len_x = 5
  plateau_len_y = 5

  probe1_position_x = 1
  probe1_position_y = 2
  probe1_direction = Direction::N
  probe1_commands = 'LMLMLMLMM'

  probe2_position_x = 3
  probe2_position_y = 3
  probe2_direction = Direction::E
  probe2_commands = 'MMRMMRMRRM'

  plateau = Plateau.new(plateau_len_x, plateau_len_y)
  if is_valid_position(probe1_position_x, probe1_position_y, plateau_len_x, plateau_len_y)
    probe1 = Probe.new(probe1_position_x, probe1_position_y, probe1_direction)
    plateau.add_probe(probe1)
    move(probe1_commands, probe1, plateau)
  end

  if is_valid_position(probe2_position_x, probe2_position_y, plateau_len_x, plateau_len_y)
    probe2 = Probe.new(probe2_position_x, probe2_position_y, probe2_direction)
    plateau.add_probe(probe2)
    move(probe2_commands, probe2, plateau)
  end

end

main
