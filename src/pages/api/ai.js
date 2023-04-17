// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
    const { dockStart } = require('@nlpjs/basic');
    const json1 = require('../../ai/va-en.json');
    // const json2 = require('../../ai/corpus-en.json')

    const { message = "Hello World" } = req.body;
    const dock = await dockStart({ use: ['Basic'] });
    const nlp = dock.get('nlp');
    await nlp.addCorpus(json1);
    // await nlp.addCorpus(json2);
    await nlp.train();
    const response = await nlp.process('en', message);
    var messageRes = "";
    if (response.answers.length > 0)
        messageRes = response.answers[Math.floor(Math.random() * response.answers.length)].answer;
    else
        messageRes = "Sorry, I don't understand";
    res.status(200).json({ message: messageRes })

}
