require 'matrix'

class Plateau
  attr_accessor :plateau_matrix, :probes

  def initialize (lenX, lenY)
    @plateau_matrix = Matrix.zero(lenX, lenY)
    @probes = []
  end

  def add_probe (probe)
    @probes << probe
  end

  def isValidPosition ()

  end

end
