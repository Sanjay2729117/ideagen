import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase/firebase'
import { collection, addDoc,getDocs } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "./Components/Chat";

function App() {

  const [idea,setIdea] = useState("")
  const [ideas,setIdeas] = useState([])
  const [GeneratedContent,setGeneratedContent]=useState("");
  async function generateAIContent() {
    const genAI = new GoogleGenerativeAI('AIzaSyC_L96_vNDSPj0W-kzvEcYZfGrv3u7zTWQ');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are given the following list of ideas: ${ideas.join("\n")}. Your task is to combine **two or more relevant** and **complementary** concepts from this list into a **single, innovative idea**. The new idea should:
    - **Focus on a specific problem** or opportunity that can be addressed.
    - Combine concepts that naturally align or support each other, without adding unrelated elements.
    - Be **concise and practical**, ensuring the new idea is actionable and clear.
    - Avoid complexity — keep the new idea straightforward but impactful.
    
    Generate a single, focused innovative idea by **mixing only the most relevant concepts** from the list. Provide this idea in **one clear sentence** that clearly outlines the new, combined concept, avoiding vague or generic responses.`;
       try {
      const result = await model.generateContent(prompt);
      setGeneratedContent(result.response.text());
      console.log(GeneratedContent)
    } catch (error) {
      console.error('Error generating AI content:', error);
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
      setIdea("")
      fetch();
    }catch(e){
      console.log(e)
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
    <Chat name={id} key={index} color='#d24a60'/>
  )
   })
  
 
}{ GeneratedContent &&
<div className='ml'>
  <div  className='name1'>AI</div>
  <div className='box1-1'>
  <div className='box1'>
 {GeneratedContent}
 </div>
 </div>
 </div>
}
 <form onSubmit={add}>
  <div  className='input'>
  <input type='text' className="inputbox" style={{color: "#000"}} placeholder='Send a idea' onChange={(e)=>setIdea(e.target.value)}/>
  <input type='submit' value=" "/>
  
 <button title='AI Idea Generator' onClick={generateAIContent}>

 </button>
  </div>
 </form>
 </>
 )
}

export default App
