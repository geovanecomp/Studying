<?php
require "Usuario.php";
require "Lance.php";
require "Leilao.php";
require "Avaliador.php";
require_once ('PHPUnit/Framework/TestCase.php');

    class AvaliadorTest extends PHPUnit_Framework_TestCase {
        public function testDeveAceitarLancesEmOrdemDecrescente() {
            $leilao = new Leilao("Computador Gamer");

            $renan = new Usuario("Renan");
            $caio = new Usuario("Caio");
            $felipe = new Usuario("Felipe");

            $leilao->propoe(new Lance($renan, 400));
            $leilao->propoe(new Lance($caio, 350));
            $leilao->propoe(new Lance($felipe, 250));

            $avaliador = new Avaliador();
            $avaliador->avalia($leilao);

            $maiorEsperado = 400;
            $menorEsperado = 250;
            $this->assertEquals($maiorEsperado, $avaliador->getMaiorLance());
            $this->assertEquals($menorEsperado, $avaliador->getMenorLance());

        }
    }
?>
