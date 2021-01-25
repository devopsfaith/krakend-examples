Krakend Chi example
====

## Build

Go 1.12 is a requirement

```bash
$ go build -o krakend_chi_example .
```

## Run

Running it as a common executable, logs are send to the stdOut and some options are available at the CLI

```bash
$ ./krakend_chi_example
  Usage of ./krakend_chi_example:
    -c string
       Path to the configuration filename (default "/etc/krakend/configuration.json")
    -d Enable the debug
    -p int
       Port of the service
```
