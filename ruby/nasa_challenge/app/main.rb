require_relative './plateau'
require_relative './probe'
require_relative './direction'
require_relative './helper'

# Apply the probe moviments
def move (commands, probe, plateau, should_print=false)
  puts "The moviments are: " if should_print

  commands.each_char do |command|
    probe.print_status() if should_print
    probe.simulate(command)
    return if not plateau.is_valid_position(probe) and command == 'M'
    probe.move(command)
  end

  probe.print_status() if should_print
  return probe
end

# Setting the system specs
def main ()
  # ---------------------------- Configuration ---------------------------------

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

  # ----------------------------------------------------------------------------

  # Moving the probes
  plateau = Plateau.new(plateau_len_x, plateau_len_y)
  if is_valid_position(probe1_position_x, probe1_position_y, plateau_len_x, plateau_len_y)
    probe1 = Probe.new(probe1_position_x, probe1_position_y, probe1_direction)
    move(probe1_commands, probe1, plateau)
    plateau.add_probe(probe1)

    probe1.print_final_position()
  end

  if is_valid_position(probe2_position_x, probe2_position_y, plateau_len_x, plateau_len_y)
    probe2 = Probe.new(probe2_position_x, probe2_position_y, probe2_direction)
    move(probe2_commands, probe2, plateau)
    plateau.add_probe(probe2)

    probe2.print_final_position()
  end

end

# ---------------------------- Main method -------------------------------------
main
