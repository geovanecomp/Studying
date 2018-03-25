require_relative '../app/plateau'
require_relative '../app/probe'
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
probe1 = Probe.new(probe1_position_x, probe1_position_y, probe1_direction)
probe2 = Probe.new(probe2_position_x, probe2_position_y, probe2_direction)


RSpec.describe Plateau, "#Plateau" do
  context "Plateau specifications" do
    it "Should has the correcty x length" do
      expect(plateau.len_x).to eq 5
    end

    it "Should has the correcty y length" do
      expect(plateau.len_y).to eq 5
    end

    it "Should has the correcty len x property type" do
      expect(plateau.len_x).to be_a(Numeric)
    end

    it "Should has the correcty len y property type" do
      expect(plateau.len_y).to be_a(Numeric)
    end

    it "Should has the correcty probes property type" do
      expect(plateau.probes).to be_instance_of(Array)
    end
  end

  context "Plateau actions" do
    it "Should add a probe" do
      plateau = Plateau.new(plateau_len_x, plateau_len_y)
      probe1 = Probe.new(probe1_position_x, probe1_position_y, probe1_direction)
      plateau.add_probe(probe1)

      expect(plateau.probes.length).to eq 1
    end

    it "Should validate a probe position" do
      plateau = Plateau.new(plateau_len_x, plateau_len_y)
      probe1 = Probe.new(probe1_position_x, probe1_position_y, probe1_direction)
      probe2 = Probe.new(probe2_position_x, probe2_position_y, probe2_direction)
      plateau.add_probe(probe1)

      expect(plateau.is_valid_position(probe2)).to eq true
    end

    it "Should alert to a probe colision" do
      plateau = Plateau.new(plateau_len_x, plateau_len_y)
      probe1 = Probe.new(probe1_position_x, probe1_position_y, probe1_direction)
      probe2 = Probe.new(1, 2, probe2_direction)
      plateau.add_probe(probe1)

      expect(plateau.is_valid_position(probe2)).to eq false
    end

    it "Should validate a out of range probe position" do
      plateau = Plateau.new(plateau_len_x, plateau_len_y)
      probe1 = Probe.new(probe1_position_x, probe1_position_y, probe1_direction)
      probe2 = Probe.new(1, 30, probe2_direction)
      plateau.add_probe(probe1)

      expect(plateau.is_valid_position(probe2)).to eq false
    end  
  end
end
