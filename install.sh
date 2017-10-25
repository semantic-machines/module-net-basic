#!/bin/bash

VEDA_VERSION=5.1.16
PROJECT_NAME=module-net-complex-route

wget https://github.com/semantic-machines/veda/archive/v$VEDA_VERSION.zip
unzip v$VEDA_VERSION.zip
cp -r veda-$VEDA_VERSION/* $PWD 
mkdir $PWD/ontology/$PROJECT_NAME
cp -r $PWD/qa/data/* $PWD/ontology/$PROJECT_NAME
cp -r $PWD/onto/* $PWD/ontology/$PROJECT_NAME
./control-install.sh