const express = require("express");
const router = express.Router();

const Journal = require("../models/Journal");
const analyzeEmotion = require("../services/llmService");


// CREATE JOURNAL

router.post("/journal", async (req, res) => {
    const { userId, ambience, text } = req.body;

    const analysis = await analyzeEmotion(text);

    const entry = new Journal({
        userId,
        ambience,
        text,
        emotion: analysis.emotion,
    });

    await entry.save();

    res.json({
        ...entry._doc,
        analysis
    });
});

// GET ENTRIES
router.get("/journal/insights/:userId", async (req, res) => {

    const entries = await Journal.find({
        userId: req.params.userId
    });

    const totalEntries = entries.length;

    const ambienceCount = {};
    const emotionCount = {};

    entries.forEach(e => {

        ambienceCount[e.ambience] =
            (ambienceCount[e.ambience] || 0) + 1;

        emotionCount[e.emotion] =
            (emotionCount[e.emotion] || 0) + 1;

    });

    const mostUsedAmbience =
        Object.keys(ambienceCount)
            .sort((a,b)=>ambienceCount[b]-ambienceCount[a])[0];

    const topEmotion =
        Object.keys(emotionCount)
            .sort((a,b)=>emotionCount[b]-emotionCount[a])[0];

    res.json({
        totalEntries,
        mostUsedAmbience,
        topEmotion
    });

});

// ANALYZE TEXT
router.post("/journal/analyze", async(req,res)=>{

    const {text} = req.body;

    const result = await analyzeEmotion(text);

    res.send(result);

});


// INSIGHTS
router.get("/journal/insights/:userId", async(req,res)=>{

    const entries = await Journal.find({
        userId:req.params.userId
    });

    const totalEntries = entries.length;

    const ambienceCount = {};

    entries.forEach(e=>{
        ambienceCount[e.ambience] =
            (ambienceCount[e.ambience] || 0) + 1;
    });

    const mostUsedAmbience =
        Object.keys(ambienceCount)
            .sort((a,b)=>ambienceCount[b]-ambienceCount[a])[0];

    res.json({
        totalEntries,
        mostUsedAmbience
    });

});

module.exports = router;