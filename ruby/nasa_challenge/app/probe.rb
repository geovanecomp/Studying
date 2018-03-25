require_relative './direction'

class Probe
  attr_reader :next_position_x, :next_position_y, :next_direction, :position_x, :position_y, :direction

  # The next position will be used to check colision / valid position
  def initialize (position_x, position_y, direction)
    @position_x = position_x
    @position_y = position_y
    @direction = direction
    @next_position_x = position_x
    @next_position_y = position_y
    @next_direction = direction
  end

  def print_status ()
    print "Position: ", @position_x, " ", @position_y, " ",  @direction, "\n"
  end

  def print_final_position ()
    print @position_x, " ", @position_y, " ",  @direction, "\n"
  end

  def move (command)
    upperCommand = command.upcase
    @direction = turn_left if upperCommand == 'L'
    @direction = turn_right if upperCommand == 'R'
    walk if upperCommand == 'M'
  end

  # Simulate if the next position will be valid or not
  def simulate (command)
    upperCommand = command.upcase
    @next_direction = turn_left if upperCommand == 'L'
    @next_direction = turn_right if upperCommand == 'R'
    simulate_walk if upperCommand == 'M'
  end

  private
  def turn_left ()
    if @direction == Direction::N
      Direction::W
    elsif @direction == Direction::E
      Direction::N
    elsif @direction == Direction::S
      Direction::E
    elsif @direction == Direction::W
      Direction::S
    end
  end

  def turn_right ()
    if @direction == Direction::N
      Direction::E
    elsif @direction == Direction::E
      Direction::S
    elsif @direction == Direction::S
      Direction::W
    elsif @direction == Direction::W
      Direction::N
    end
  end

  def walk ()
    if @direction == Direction::N
      @position_y += 1
    elsif @direction == Direction::E
      @position_x += 1
    elsif @direction == Direction::S
      @position_y -= 1
    elsif @direction == Direction::W
      @position_x -= 1
    end
  end

  def simulate_walk ()
    if @direction == Direction::N
      @next_position_y += 1
    elsif @direction == Direction::E
      @next_position_x += 1
    elsif @direction == Direction::S
      @next_position_y -= 1
    elsif @direction == Direction::W
      @next_position_x -= 1
    end
  end
end
