#!/bin/sh

docker run \
	--rm \
	-v /"$PWD":/usr/src/app \
	-w //usr/src/app \
	python \
	sh -c "pip install -r requirements.txt && python rescale-images.py"
