require_relative '../app/probe'
probe_position_x = 1
probe_position_y = 2
probe_direction = Direction::N
probe_commands = 'LMLMLMLMM'
probe = Probe.new(probe_position_x, probe_position_y, probe_direction)

RSpec.describe Probe, "#Probe" do
  context "Probe specifications" do
    it "Should has the correcty starter position_x" do
      expect(probe.position_x).to eq 1
    end

    it "Should has the correcty starter position_y" do
      expect(probe.position_y).to eq 2
    end

    it "Should has the correcty starter direction" do
      expect(probe.direction).to eq Direction::N
    end

    it "Should has the correcty position_x property type" do
      expect(probe.position_x).to be_a(Numeric)
    end

    it "Should has the correcty position_y property type" do
      expect(probe.position_y).to be_a(Numeric)
    end

    it "Should has the correcty probes property type" do
      expect(probe.direction).to be_instance_of(String)
    end

  end

  context "Probe actions" do
    it "Should turn right" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('R')
      expect(probe.direction).to eq Direction::E
    end

    it "Should turn left" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('L')
      expect(probe.direction).to eq Direction::W
    end

    it "Should move forward" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('M')
      expect(probe.position_y).to eq 3
    end

    it "Should turn 360º (left)" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('LLLL')
      expect(probe.direction).to eq Direction::N
    end

    it "Should turn 360º (right)" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('RRRR')
      expect(probe.direction).to eq Direction::N
    end

    it "Shouldn't turn left" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('R')
      expect(probe.direction).not_to eq Direction::W
    end

    it "Shouldn't turn right" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('L')
      expect(probe.direction).not_to eq Direction::E
    end

    it "Shouldn't move forward" do
      probe = Probe.new(probe_position_x, probe_position_y, probe_direction)
      probe.move('L')
      expect(probe.position_y).to eq 2
    end
  end
end
