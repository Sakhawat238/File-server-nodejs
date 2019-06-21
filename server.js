const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest:'files/'});

const port = process.env.PORT || 3000;


app.get('/',(req, res)=>{
	res.status(200).json({
		'messages': 'Welcome'
	})
})

app.post('/img-upload',upload.single('image'), (req, res)=>{
	console.log(req.file)
	res.status(200).json({
		'messages': 'image uploaded successfully'
	})
	
})

app.listen(port, ()=>{
	console.log('server listening on port', port);
})

