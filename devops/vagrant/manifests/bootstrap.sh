#!/bin/sh
set -e -x

if which puppet > /dev/null ; then
        echo "Puppet is already installed"
        exit 0
fi

apt-get update
echo Installing puppet
apt-get install -y puppet
echo "Puppet installed!"
exit 0

