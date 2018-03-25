class Plateau
  attr_reader :probes, :len_x, :len_y

  def initialize (len_x, len_y)
    @probes = []
    @len_x = len_x
    @len_y = len_y
  end

  def add_probe (probe)
    @probes << probe
  end

  def is_valid_position (probe)
    return false if is_out_of_range(probe) or is_a_colision(probe)
    return true
  end

  private
  def is_out_of_range (probe)
    if probe.next_position_x > @len_x or probe.next_position_y > @len_y
      print 'Probe out of range ', probe.position_x, ' ',probe.position_y, "\n"
      return true
    end
    return false
  end

  def is_a_colision (probe)
    @probes.each do |plateau_probe|
      is_same_position_x = probe.next_position_x == plateau_probe.position_x
      is_same_position_y = probe.next_position_y == plateau_probe.position_y

      if is_same_position_x and is_same_position_y
        print 'Colision at position ', probe.position_x, ' ',probe.position_y, "\n"
        return true
      end
    end
    return false
  end
end
