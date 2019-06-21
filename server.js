const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(cors());
//app.use(express.static(__dirname + '/files/'));

const storage = multer.diskStorage({
	destination : function(req, file, cb){
		const upload_path = path.join(__dirname, 'files');
		cb(null, upload_path);
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);
	}
})
const upload = multer({storage:storage});

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

app.get('/img/:name', (req, res)=>{
	const name = req.params.name
	const index = path.join(__dirname, 'files', name);
	res.sendFile(index);
})

app.listen(port, ()=>{
	console.log('server listening on port', port);
})

