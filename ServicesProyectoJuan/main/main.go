package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"strings"
)

type Metadata struct {
	Build string `json:"build"`
}


type NameItem struct {
	Name string `json:"name"`
	Metadata Metadata `json:"metadata"`
}

func main() {

	router := gin.Default()

	// This handler will match /user/john but will not match /user/ or /user
	router.GET("/user/:name", func(c *gin.Context) {
		eleccion := c.Param("name")

		eleccion = strings.Replace(eleccion, ":", "",1)

		url := "https://web.furycloud.io/api/fury/applications/"+eleccion+"/services"
		method := "GET"

		client := &http.Client {
		}
		req, err := http.NewRequest(method, url, nil)

		if err != nil {
			fmt.Println(err)
			return
		}
		req.Header.Add("cookie", "_ga=GA1.1.1024183244.1630961394;" +
			" _hjid=2d354b23-225f-441c-9584-7e5e2baa54f8;" +
			" GCP_IAAP_AUTH_TOKEN_35A08D1094D01B32=..;" +
			" GCP_IAP_UID=104015167789689800947;" +
			" _hjIncludedInPageviewSample=1;" +
			" _hjAbsoluteSessionInProgress=0;" +
			" _hjIncludedInSessionSample=1;" +
			" X-Token=%7B%%22%3A%7B%22full_name%22%3A%%20Pablo%%22%2C%22email%22%3A%.%.com%22%7D%2C%%22%3A%%5D%7D;" +
			" _ga_28MSZRPJS9=GS1.1.1632704687.16.1.1632705133.0")

		res, err := client.Do(req)
		if err != nil {
			fmt.Println(err)
			return
		}
		defer res.Body.Close()

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("")

		var nameItems []NameItem
		if err := json.Unmarshal(body, &nameItems); err != nil {
			// handle errors in deserialization
		}
		fmt.Println("Ambientes que posee este servicio y version deployada en cada uno:")

		for _, nameItem := range nameItems {
			code := nameItem.Name
			metadata := nameItem.Metadata

			fmt.Println(code)
			fmt.Println(metadata)

		}
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		c.Writer.Header().Set("Content-Type", "application/json")
		c.String(http.StatusOK, "%s", nameItems)


	})

	router.Run(":8080")


}
