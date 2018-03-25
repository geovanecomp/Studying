# For matrix, the first position is the top left corner instead the bottom left.
def adjust_cordinate_y (probe_position_y, plateau_len_y)
  # Matrix is from 0 until len_y
  plateau_len_y -= plateau_len_y

  return plateau_len_y - probe_position_y
end

def is_valid_position (probe_position_x, probe_position_y, plateau_len_x, plateau_len_y)
  if probe_position_x > plateau_len_x or probe_position_y > plateau_len_y
    puts("The informed position is bigger than plateau size")
    return false
  end
  return true
end
