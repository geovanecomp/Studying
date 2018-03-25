require_relative '../app/plateau'
require_relative '../app/probe'
require_relative '../app/main'

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

RSpec.describe main, "#Main" do
  context "Main actions" do
    it "Should do a complex movement (Example 1)" do
      probe = move(probe1_commands, probe1, plateau)
      expect(probe.position_x).to eq 1
      expect(probe.position_y).to eq 3
    end

    it "Should do a complex movement (Example 2)" do
      probe = move(probe2_commands, probe2, plateau)
      expect(probe.position_x).to eq 5
      expect(probe.position_y).to eq 1
    end
  end  
end
