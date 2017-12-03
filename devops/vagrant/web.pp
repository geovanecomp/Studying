exec {
	"apt-update": command => "/usr/bin/apt-get update"
}

package { ["openjdk-8-jdk", "tomcat8"]
	require => Exec["apt-update"]
	ensure => installed,
}
