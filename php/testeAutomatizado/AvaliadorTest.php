<?php
require "Usuario.php";
require "Lance.php";
require "Leilao.php";
require "Avaliador.php";
require_once ('PHPUnit/Framework/TestCase.php');

class AvaliadorTest extends PHPUnit_Framework_TestCase {
    public function testDeveAceitarLancesEmOrdemDecrescente() {
        $leilao = new Leilao("Computador Gamer");

        $geovane = new Usuario("Geovane");
        $caio = new Usuario("Caio");
        $felipe = new Usuario("Felipe");

        $leilao->propoe(new Lance($geovane, 400));
        $leilao->propoe(new Lance($caio, 350));
        $leilao->propoe(new Lance($felipe, 250));

        $avaliador = new Avaliador();
        $avaliador->avalia($leilao);

        $maiorEsperado = 400;
        $menorEsperado = 250;
        $this->assertEquals($maiorEsperado, $avaliador->getMaiorLance());
        $this->assertEquals($menorEsperado, $avaliador->getMenorLance());

    }

    public function testDeveAceitarLancesEmOrdemCrescente() {
        $leilao = new Leilao("Computador Gamer");

        $geovane = new Usuario("Geovane");
        $caio = new Usuario("Caio");
        $felipe = new Usuario("Felipe");

        $leilao->propoe(new Lance($geovane, 250));
        $leilao->propoe(new Lance($caio, 350));
        $leilao->propoe(new Lance($felipe, 400));

        $avaliador = new Avaliador();
        $avaliador->avalia($leilao);

        $maiorEsperado = 400;
        $menorEsperado = 250;
        $this->assertEquals($maiorEsperado, $avaliador->getMaiorLance());
        $this->assertEquals($menorEsperado, $avaliador->getMenorLance());

    }

    public function testDeveAceitarApenasUmLance() {
        $leilao = new Leilao("Comptudor Gamer");

        $geovane = new Usuario("Geovane");

        $leilao->propoe(new Lance($geovane, 2000));

        $avaliador = new Avaliador();
        $avaliador->avalia($leilao);

        $maiorEsperado = 2000;
        $menorEsperado = 2000;

        $this->assertEquals($maiorEsperado, $avaliador->getMaiorLance());
        $this->assertEquals($menorEsperado, $avaliador->getMenorLance());
    }

    public function testDeveObterTresMaioresLances(){
        $leilao = new Leilao("Computador Gamer");

        $geovane = new Usuario("Geovane");
        $caio = new Usuario("Caio");

        $leilao->propoe(new Lance($geovane, 200));
        $leilao->propoe(new Lance($caio, 300));
        $leilao->propoe(new Lance($geovane, 400));
        $leilao->propoe(new Lance($caio, 500));

        $maioresLancesEsperados = [500, 400, 300];

        $avaliador = new Avaliador();
        $avaliador->avalia($leilao);

        $this->assertEquals(count($maioresLancesEsperados), count($avaliador->getMaioresLances()));
        $this->assertEquals($maioresLancesEsperados[0], $avaliador->getMaioresLances()[0]->getValor());
        $this->assertEquals($maioresLancesEsperados[1], $avaliador->getMaioresLances()[1]->getValor());
        $this->assertEquals($maioresLancesEsperados[2], $avaliador->getMaioresLances()[2]->getValor());

    }
}
?>
