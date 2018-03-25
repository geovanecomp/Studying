def is_valid_position (probe_position_x, probe_position_y, plateau_len_x, plateau_len_y)
  if probe_position_x > plateau_len_x or probe_position_y > plateau_len_y
    puts("The informed position is bigger than plateau size")
    return false
  end
  return true
end
