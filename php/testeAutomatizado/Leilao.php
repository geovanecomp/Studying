<?php
	class Leilao {
		private $descricao;
		private $lances;

		function __construct($descricao) {
			$this->descricao = $descricao;
			$this->lances = array();
		}

		public function propoe(Lance $lance) {
			return $this->lanceValido($lance) ? $this->lances[] = $lance : null;
		}

		public function getDescricao() {
			return $this->descricao;
		}

		public function getLances() {
			return $this->lances;
		}

		public function getUltimoLance() {
			$posicaoUltimoLance = count($this->lances) - 1;
			return $this->lances[$posicaoUltimoLance];
		}

		private function lanceValido($lance){
			$numeroMaximoLances = 4;

			if ($this->contarNumeroLances($lance->getUsuario()) > $numeroMaximoLances) {
				return false;
			}

			if (count($this->lances) > 0 && $this->getUltimoLance()->getUsuario() == $lance->getUsuario()) {
				return false;
			}

			return true;
		}

		private function contarNumeroLances(Usuario $usuario){
			$quantidadeLances = 0;

			foreach ($this->lances as $lance) {
				if ($lance->getUsuario() == $usuario) {
					$quantidadeLances++;
				}
			}

			return $quantidadeLances;
		}
	}
?>
