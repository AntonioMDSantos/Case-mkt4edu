const express= require("express");
const dotenv = require('dotenv')
const path = require('path')
const axios= require('axios');
const bodyParser = require('body-parser');
const app = express();

dotenv.config({ path: path.join(__dirname, 'config.env') });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}))
const PORT=process.env.PORT || 8080;

app.get("/", async (req, res)=>{
	apiKey = process.env.API;
	var data='';
	var url='https://newsapi.org/v2/everything?q=tesla&from=2022-10-02&sortBy=publishedAt&apiKey='+apiKey;
		var news = await axios.get(url).then((response)=>{
		console.log(response.status);
		data = response.data;
		return data;
	}).catch(err=>{
		console.log(err)
	})
	res.render('index',{news:news.articles,title:"Home"});
});

app.listen(PORT,()=>{console.log(`Server iniciando em http://localhost:${PORT}`);})
