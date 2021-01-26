// ce is an example of how to customize a complete KrakenD API Gateway.
//
// this example adds a dummy gin middleware.

package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	krakend "github.com/devopsfaith/krakend-ce"
	cmd "github.com/devopsfaith/krakend-cobra"
	flexibleconfig "github.com/devopsfaith/krakend-flexibleconfig"
	viper "github.com/devopsfaith/krakend-viper"
	"github.com/devopsfaith/krakend/config"
	"github.com/gin-gonic/gin"
)

const (
	fcPartials  = "FC_PARTIALS"
	fcTemplates = "FC_TEMPLATES"
	fcSettings  = "FC_SETTINGS"
	fcPath      = "FC_OUT"
	fcEnable    = "FC_ENABLE"
)

func main() {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		select {
		case sig := <-sigs:
			log.Println("Signal intercepted:", sig)
			cancel()
		case <-ctx.Done():
		}
	}()

	krakend.RegisterEncoders()

	var cfg config.Parser
	cfg = viper.New()
	if os.Getenv(fcEnable) != "" {
		cfg = flexibleconfig.NewTemplateParser(flexibleconfig.Config{
			Parser:    cfg,
			Partials:  os.Getenv(fcPartials),
			Settings:  os.Getenv(fcSettings),
			Path:      os.Getenv(fcPath),
			Templates: os.Getenv(fcTemplates),
		})
	}

	eb := krakend.ExecutorBuilder{
		Middlewares: []gin.HandlerFunc{func(c *gin.Context) {
			fmt.Println("dummy mw executed for req", c.Request.URL.String())
			// TODO: do semthing useful here
			c.Next()
		}},
	}

	cmd.Execute(cfg, eb.NewCmdExecutor(ctx))
}
