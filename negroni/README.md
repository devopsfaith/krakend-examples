Krakend NEGRONI example
====

## Build

Go 1.12 is a requirement

	$ go build -o krakend_negroni_example .

## Run

Running it as a common executable, logs are send to the stdOut and some options are available at the CLI

	$ ./krakend_negroni_example
	Usage of ./krakend_negroni_example:
	  -c string
	    	Path to the configuration filename (default "/etc/krakend/configuration.json")
	  -d	Enable the debug
	  -p int
	    	Port of the service
