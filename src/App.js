import React from 'react';
import './App.scss'



  const questions =
   [
    "Which animal does not close its eyes while sleeping?",
    "Which one?",
    "Which one?",
   ]



    const answers = 
   [ 
     ["fish","corocodile","mouse","worm"],
     ["0","0","0","10"],
     ["0","0","10","0"]
   ]


  //  const key =
  //  [
  //    "eight","belgium","aram oceon"
  //  ]

  const key =
  [
    "fish","10","10"
  ]




class App extends React.Component{
      constructor(props) {
            super(props);
            this.state = {
              //what question we are at
              counter : 0,
              //sum of scores
              score:0,
              //list of the best players
              top_score:
              [
                ["ali","10"],
                ["mira","0"],
                ["nilla","0"],
                ["diba","20"],
                ["elahe","30"]
              ],
              //list of the answer the user choose
              user_answer:[],
              //show `whats your name` page
              is_whats_your_name : true,
              //name of the player
              whats_your_name:"",

              is_score_page:false
        }

      }


      //Next button
      button=()=>{
        const len = this.state.top_score.length
        console.log(this.state.user_answer[this.state.counter])

        //counter++
        if (this.state.counter<questions.length-1 && !this.state.user_answer[this.state.counter])
          {
            alert('choose your answer')
          }
          else{
            this.setState({ counter: this.state.counter + 1 })  

          }




        //calculating the score
       if (this.state.counter===questions.length-1 )
         {
          let score = this.state.score;
            for(let i = 0 ; i < this.state.user_answer.length; i++){
              if(this.state.user_answer[i]===key[i]){
                score += 10;                
                }
            }
            this.setState({score});
            this.state.top_score[len-1].push(score)

            //sort 5 top score ascending
            this.state.top_score.sort(function(a, b) {
              return parseFloat(b[1]) - parseFloat(a[1]);
          });

            this.setState({is_whats_your_name: true,is_score_page:true})
         } 





      

         
      }


      userAnswer=(e)=>{
        const counter = this.state.counter
        const user_answer = this.state.user_answer

        //fill the `user_answer` array
        user_answer.splice(counter,user_answer.length, e.target.innerText);
      }


      set_name=(e)=>{
        this.setState({whats_your_name: e.target.value},()=>{
          console.log(this.state.whats_your_name)
        })
      }


      go=()=>{
          if(!this.state.whats_your_name.length==0)
            {
              this.setState({is_whats_your_name: false})
            }
          
          else
            {
              alert("Please write your name")
            }

          //add the final name to array => top_score
          this.state.top_score.push([this.state.whats_your_name]);


        
      }







  render(){

    const counter = this.state.counter


    return(
      <div>
        {/* whats your name panel */}
        {this.state.is_whats_your_name  && !this.state.is_score_page
          &&
          <div className="whats_your_name">
               <input type="text" placeholder="whats your name" onChange={this.set_name.bind(this)} />
               <button onClick={this.go}>GO!</button>
          </div>  
            }




        {/* quiestions panel */}
        {!this.state.is_whats_your_name 
          &&
          <div className="container">
          {/* quiestion title */}
          <p>{questions[counter]}</p>

          {/* options */}
          <div className={"options"} >
              {answers[counter].map(function(name, index){
                  return <li key={index} onClick={this.userAnswer.bind(this)} tabIndex="1">{name}</li>;
              }, this)}
          </div>
    

          {/* next butt */}
          <button onClick={this.button}>Next</button>
            



</div>


        }

        {/* score panel */}
        {this.state.is_score_page 
          &&
          <div className="score_page">
            <p>T<br/>O<br/>P<br/><br/> S<br/>C<br/>O<br/>R<br/>E<br/>S</p>
            <div className={'score_names'}>
            {this.state.top_score.slice(0, 5).map(function(name, index){
                  return <li key={index} >{name[0]}</li>;
              }, this)}
            </div>

            <div className={'score_numbers'}>
            {this.state.top_score.slice(0, 5).map(function(name, index){
                  return <li key={index} >{name[1]}</li>;
              }, this)}
            </div>


          </div>
            }
      
      
      
      </div>
    )
  }

}

export default App;

