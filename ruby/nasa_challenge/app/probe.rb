require_relative './direction'

class Probe
  attr_accessor :positionX, :positionY, :direction

  def initialize (positionX, positionY, direction)
    @positionX = positionX
    @positionY = positionY
    @direction = direction

  end

  def print_status ()
    print "Position: ", @positionX, " ", @positionY, " ",  @direction, "\n"
  end

  def print_final_position ()
    puts @positionX, " ", @positionY, " ",  @direction
  end

  def move (command)
    upperCommand = command.upcase
    turn_left if upperCommand == 'L'
    turn_right if upperCommand == 'R'
    walk if upperCommand == 'M'
  end

  private

  def turn_left ()
    if @direction == Direction::N
      @direction = Direction::W
    elsif @direction == Direction::E
      @direction = Direction::N
    elsif @direction == Direction::S
      @direction = Direction::E
    elsif @direction == Direction::W
      @direction = Direction::S
    end
  end

  def turn_right ()
    if @direction == Direction::N
      @direction = Direction::E
    elsif @direction == Direction::E
      @direction = Direction::S
    elsif @direction == Direction::S
      @direction = Direction::W
    elsif @direction == Direction::W
      @direction = Direction::N
    end
  end

  def walk ()
    if @direction == Direction::N
      @positionY += 1
    elsif @direction == Direction::E
      @positionX += 1
    elsif @direction == Direction::S
      @positionY -= 1
    elsif @direction == Direction::W
      @positionX -= 1
    end
  end
end
