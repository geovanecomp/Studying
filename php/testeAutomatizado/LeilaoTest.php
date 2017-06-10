<?php
require "Usuario.php";
require "Lance.php";
require "Leilao.php";
class LeilaoTest extends PHPUnit_Framework_TestCase {
    public function testDeveProporUmLance() {

        $leilao = new Leilao("Macbook caro");

        $this->assertEquals(0, count($leilao->getLances()));

        $geovane = new Usuario("Geovane");

        $lanceEsperado = 2000;

        $leilao->propoe(new Lance($geovane, $lanceEsperado));

        $this->assertEquals(1, count($leilao->getLances()));
        $this->assertEquals($lanceEsperado, $leilao->getLances()[0]->getValor());

    }

    public function testDeveBloquearDoisLancesSeguidos() {
        $leilao = new Leilao("Macbook caro");

        $geovane = new Usuario("Geovane");

        $lanceEsperado = 2000;

        $leilao->propoe(new Lance($geovane, $lanceEsperado));
        $leilao->propoe(new Lance($geovane, 3000));

        $this->assertEquals(1, count($leilao->getLances()));
        $this->assertEquals($lanceEsperado, $leilao->getLances()[0]->getValor());

    }

    public function testDevePermitirAteCincoLances() {
        $leilao = new Leilao("Macbook caro");

        $geovane = new Usuario("Geovane");
        $gege = new Usuario("Gege");

        $lanceEsperado = 2000;

        $leilao->propoe(new Lance($geovane, 2000));
        $leilao->propoe(new Lance($gege, 3000));

        $leilao->propoe(new Lance($geovane, 4000));
        $leilao->propoe(new Lance($gege, 5000));

        $leilao->propoe(new Lance($geovane, 6000));
        $leilao->propoe(new Lance($gege, 7000));

        $leilao->propoe(new Lance($geovane, 8000));
        $leilao->propoe(new Lance($gege, 9000));

        $leilao->propoe(new Lance($geovane, 10000));
        $leilao->propoe(new Lance($gege, 11000));

        //Deve proibir o sexto lance
        $leilao->propoe(new Lance($geovane, 12000));

        //Neste caso só pode permitir 10 lances no array
        $this->assertEquals(10, count($leilao->getLances()));

        //O ultimo lance deve ser 11000
        $this->assertEquals(11000, $leilao->getUltimoLance()->getValor());


    }
}

?>
