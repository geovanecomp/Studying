<?php
require "Usuario.php";
require "Lance.php";
require "Leilao.php";
class LeilaoTest extends PHPUnit_Framework_TestCase {
    public function testDeveProporUmLance() {

        $leilao = new Leilao("Macbook caro");

        $this->assertEquals(0, count($leilao->getLances()));

        $geovane = new Usuario("Geovane");

        $leilao->propoe(new Lance($geovane, 2000));

        $lanceEsperado = 2000;

        $this->assertEquals(1, count($leilao->getLances()));
        $this->assertEquals($lanceEsperado, $leilao->getLances()[0]->getValor());

    }
}

?>
