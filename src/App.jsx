import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase/firebase'
import { collection, addDoc,getDocs } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "./Components/Chat";

function App() {

  const [idea,setIdea] = useState("")
  const [ideas,setIdeas] = useState([])
  const [loading,setLoading]=useState(false)
  const [newidea,setNewIdea] = useState("")
  const [GeneratedContent,setGeneratedContent]=useState("");
  async function generateAIContent() {
    setLoading(true)
    const genAI = new GoogleGenerativeAI('AIzaSyC_L96_vNDSPj0W-kzvEcYZfGrv3u7zTWQ');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
Here’s an enhanced version of your prompt to make it more refined and clear:

You are provided with the following list of ideas: ${ideas.join("\n")}. Your task is to combine two or more relevant and complementary concepts from the list into a single, innovative idea that effectively addresses a specific problem or opportunity. The new idea should:

Solve a clear problem or capitalize on an opportunity, focusing on a targeted issue.
Ensure that the combined concepts are naturally complementary, making the final idea cohesive and logical.
Be clear, practical, and actionable, with a focus on simplicity and feasibility.
Avoid introducing unnecessary complexity; the solution should be straightforward yet impactful.
Clearly express the idea in one concise sentence, ensuring clarity and focus.
Do not include irrelevant concepts or vague responses — the new idea should be clear, concise, and actionable.

`;
       try {

      const result = await model.generateContent(prompt);
      setGeneratedContent(result.response.text());
      setIdeas(prevIdeas=>[...prevIdeas,result.response.text()])
      console.log(GeneratedContent)
    } catch (error) {
      console.error('Error generating AI content:', error);
    }finally{
      setLoading(false)
    }
  }
  
async function fetch(){
      try{
      const documents= await getDocs(collection(db,"Ideas"))
      const ar=[]
      documents.forEach((document)=>{
        ar.push(document.data().idea)
      })
      setIdeas(ar);
      }catch(e){
        console.log(e)
      }
    }
  
  async function add(e){
    e.preventDefault();
    
    if(!idea.trim()) return ;
    try{
      const doc=await addDoc(collection(db,"Ideas"),{
        "idea":idea
      });
      setIdea("");
      setNewIdea(idea)
      setIdeas(prevIdeas => [...prevIdeas, idea]);
      
    }catch(e){
      console.log(e)
    }finally{
      document.getElementById("type").value=""
    }
  }
  useEffect(() => {
    fetch(); 
  }, []);
 return (<>
 <div className='title'>
  <div className='img'></div>
  <div>IdeaHub</div>
 </div>
 {
  
  ideas.map((id,index)=>{
    return(
      <>
      {GeneratedContent==id && loading? <div className='ml'>
    <div  className='name' style={{color:"#4a5ad2"}}>AI</div>
   <div className='box' style={{ borderLeft: `1.7px solid #4a5ad2`}}>
  <div className='box1'>
 Thinking....
 </div>
 </div>
 </div>:
 
    <Chat name={id} typed={GeneratedContent==id?"AI":"Me"} key={index} color={`${newidea!=id && GeneratedContent!=id?"#d24a60":"#4a5ad2"}`}/>
  
        }  </>
  )
  setNewIdea("")
   })
  
 
}
 <form onSubmit={add}>
  <div  className='input'>
  <input type='text' id="type" className="inputbox" style={{color: "#000"}} placeholder='Send a idea' onChange={(e)=>setIdea(e.target.value)}/>
  <input type='submit' value=" "/>
  
 <button title='AI Idea Generator' onClick={generateAIContent}>

 </button>
  </div>
 </form>
 </>
 )
}

export default App
