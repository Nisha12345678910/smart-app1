

const Clarifai =require('clarifai');
const app = new Clarifai.App({
 apiKey: 'e3ce03d4161a48da86c9f061911d6bb1'

});


const handleApi =(req ,res)=>{
 app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
      .then(data =>{
      	res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with api'))
}


const  handleImage = (req, res ,db) => {
   

const {id} = req.body;
   
  db('users').where('id','=',id )
  .increment('entries',1)
  .returning('entries')
  .then(entries=>{
res.json(entries[0]);
  })
 
   .catch(err =>res.status(400).json('erroe getting user'))

}

module.exports={
	handleImage ,
  handleApi
}