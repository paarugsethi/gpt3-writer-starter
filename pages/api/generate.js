import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Write a detailed email in a formal writing style. Include the recipient's email address, subject and body of the email. The email is to be written to ";
const basePromptPrefix2 = ". The email is about "

try{
const generateAction = async (req, res) => {
    // RUN FIRST PROMPT
    console.log(`API: ${basePromptPrefix}${req.body.recipient}${basePromptPrefix2}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.recipient}${basePromptPrefix2}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 250,
    })

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({output: basePromptOutput});
};
}
catch (err){
  console.log(err);
}

export default generateAction;