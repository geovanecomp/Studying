exec { "apt-update":
  command => "/usr/bin/apt-get update"
}

exec { "createTestDB":
  command => "mysqladmin -uroot create testDB",
  unless => "mysql -uroot testDB",
  path => "/usr/bin",
  require => Service["mysql"]
}

exec { "installSlim":
  command => "composer require slim/slim '^3.0'",
  path => "/usr/bin",
  require => Package["composer"]
}

package { ["openjdk-8-jre", "tomcat8", "mysql-server", "php7.0", "composer"]:
  ensure => installed,
  require => Exec["apt-update"]
}

service { "tomcat8":
  ensure => running,
  enable => true,
  hasstatus => true,
  hasrestart => true,
  require => Package["tomcat8"]
}

service { "mysql":
  ensure => running,
  enable => true,
  hasstatus => true,
  hasrestart => true,
  require => Package ["mysql-server"]
}


