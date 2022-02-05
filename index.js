const express = require('express')
const app = express()
const fs = require('fs')


const port = 3000

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));


app.get('/',(req,res) =>{
	let data = getData();
	let cnt = data.counter;
	cnt++;
	changeCounter(cnt,data);
	res.render('index',{
		cnt:cnt
	})
})

app.listen(port,() =>{
	console.log(`Server ready at port ${port}`)
})

function getData(){
	let rawData = fs.readFileSync('db.json')
	let data = JSON.parse(rawData)
	return data;
}

function changeCounter(newCnt,data){
	data.counter = newCnt
	fs.writeFileSync('db.json',JSON.stringify(data))
}