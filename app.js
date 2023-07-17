const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
const cors = require("cors");
const {User, Recipe, Review} = require("./db/associations");
const { use } = require("bcrypt/promises");

app.use(cors());

app.use(express.static(__dirname + "/dist/tiny-bytes"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//api keys
// apiKey = 'a42bca2f8c2f4c5194cd8aa86c365de7';
// apiKey = 'b989a147ccb6450e920e8fa5355c632c';
// apiKey = 'dd0d974a8e534716a3175c56ecd0bde5';
// apiKey = '0550322f781e49199dd00666b1933e64';
// apiKey = 'b989a147ccb6450e920e8fa5355c632c';
apiKey = 'f082f3f33d8e400b8898966f7fcbc069';
// apiKey = 'b688d3dfcaec47b88ffd7cd4de8c743b';


// These routes calls the spoonacular api and renders
// the data for our homepage

app.use("/", require("./routes"));

app.post("/logIn", async (req, res) => {
  try {
    console.log("in log in route");
    res.send(await User.authenticate(req.body));
  } catch (error) {
    if (error.status === 401) res.sendStatus(401);
  }
});

app.get("/randomRecipe", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1&apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log("Error with server", error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
    }).pipe(res);
});

app.get("/dessertRecipe", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/complexSearch?type=dessert&number=3&apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log("Error with server", error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
});

app.get("/popularRecipe", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=3&apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log("Error with server", error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
});

//search page
app.get("/search/:query", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${req.params.query}&number=8`,
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
});

function callAPI(url, consoleWord) {
  request(
    {
      method: "GET",
      uri: `${url}&apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log("Error with server", error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      console.log(`${consoleWord}`, apiData);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  );
}

app.get("/dessertRecipe", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/complexSearch?type=dessert&number=3&apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log("Error with server", error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
});
app.get("/popularRecipe", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=3&apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log("Error with server", error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
});

//single recipe page
app.get("/recipeDetails/:recipeId", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/${req.params.recipeId}/information?apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
});
app.get("/recipeInstructions/:recipeId", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/${req.params.recipeId}/analyzedInstructions?apiKey=${apiKey}`,
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
        return;
      }
      const data = response.body;
      const apiData = JSON.parse(data);
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
});

app.get("/HTMLNutritionFacts/:recipeId", async (req, res) => {
  request(
    {
      method: "GET",
      uri: `https://api.spoonacular.com/recipes/${req.params.recipeId}/nutritionLabel?apiKey=${apiKey}`,
      headers: {"content-type": "text/html"},
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
        return;
      }
      const data = response.body;
      if (response.statusCode == 200) {
        console.log("success");
      } else {
        console.log("error with api call");
      }
    }
  ).pipe(res);
    
});
app.get("/allRecipes", async (req, res) => {
  let allRecipes = await Recipe.findAll()
  res.json(allRecipes)
})

app.get("/allReviews", async (req, res) => {
  let allReviews = await Review.findAll()
  res.json(allReviews)
})
  
app.listen(process.env.PORT || 8080);

