const Sentiment = require("sentiment");

const sentiment = new Sentiment();

async function analyzeEmotion(text){

    const result = sentiment.analyze(text);

    let emotion = "neutral";

    if(result.score > 3) emotion = "happy";
    else if(result.score < -3) emotion = "sad";
    else emotion = "calm";

    return {
        emotion: emotion,
        keywords: result.words.slice(0,3),
        summary: `Detected ${emotion} sentiment with score ${result.score}`
    };

}

module.exports = analyzeEmotion;