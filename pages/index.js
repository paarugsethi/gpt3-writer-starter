import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { Helmet } from "react-helmet"

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [recipient, setRecipient] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    try {
      setIsGenerating(true);

      console.log("Calling OpenAI...")
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput, recipient })
      })

      const data = await response.json();
      console.log(data)
      const { output } = data;
      console.log("OpenAI replied", output.text)

      setApiOutput(`${output.text}`)
      setIsGenerating(false)
    }
    catch (err) {
      console.log(err)
      alert("ooops there seems to be an error here. please try again!")
    }
  }

  const onTextChange = (e) => {
    // console.log(e.target.value);
    setUserInput(e.target.value)
  }

  const onRecipientChange = (e) => {
    // console.log(e.target.value);
    setRecipient(e.target.value)
  }

  return (
    <div className="root">
      <Head>
        <title>Write me an Email</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>write me an email</h1>
          </div>
          <div className="header-subtitle">
            <h2>have an email you need to write? AI can do it for you.✍️</h2>
          </div>
          <div className="prompt-container">
            <textarea placeholder="who are you writing to?" className="prompt-box-recipient" onChange={onRecipientChange} />
            <textarea placeholder="what is your email about in one line?" className="prompt-box" onChange={onTextChange} />
            <div className="prompt-buttons">
              <a
                className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}
              >
                <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
            {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Output</h3>
                  </div>
                </div>
                <div className="output-content">
                  <p>{apiOutput}</p>
                </div>
              </div>
            )}
            <div className="header-subtitle">
              <h2>built by <a style={{textDecoration:'none', color:'rgba(255, 255, 255, 0.75)'}} href="https://www.twitter.com/paarugsethi" target='_blank'>@paarugsethi</a></h2>
              <p><a style={{textDecoration:'none', color:'rgba(255, 255, 255, 0.75)'}} href="https://www.buymeacoffee.com/paarug" target='_blank'>buy me a coffee.</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
