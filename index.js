
var fetch = require('node-fetch');
var inquirer = require('inquirer');
  console.log('----------------Pokemon Height & Weight----------------')
  inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      name: 'limit',
      message: 'Please input a limit value.',
    },
    
    {
        type: 'input',
        name: 'offset',
        message: 'Please input an offset.'
        
    }  
  ])
  .then((answers) => {
   

    bringList(answers.limit, answers.offset)
    const limit = answers.limit;
    const offset = answers.offset;
    const urlList=[]
    let weight = 0;
    let calls = 0;
    let height = 0;
    var startTime;
 
    
 
 
    function bringList(limit, offset){ 
      startTime = Date.now();
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
          .then((res) => res.json())
          .then((data) =>  
          {
            data.results.forEach(pokemon=>{
              urlList.push(pokemon.url)
            })
 
            urlList.forEach(url=>
            fetch(url)
            .then((result)=>result.json())
            .then((data)=>{
            weight +=data.weight;
            calls +=1           
            height += data.height;
            })
                    
            .then(()=> {
              if( calls == limit){
                height /= calls
                weight /= calls
                console.log( 'This is the average Height:' + parseInt(height) )
                console.log( 'This is the average Weight:' + parseInt(weight) )
                console.log("Excution time:", Date.now()-startTime, 'ms')
              }})   
            )         
           })  
 
    }
  }
  )
 