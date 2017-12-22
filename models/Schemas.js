const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
    filename: String,
    colors: [String],
    properties: Object,
    logos: [String],
    text: [String],
    labels: [String],
    // Manually added data
    // - Artifact
    mTitle: String,
    mBackside: String,
    mRotated: Boolean,
    mCondition: [String], // Mint, Good, Poor, Folded, Torn, Stained
    mMade: [String], // Drawing, Print, Marker, Crayola, Kid's Drawing
    mContains: [String], // Text only, Text and Illustration, Text and Photography, Collage, Image only, Other
    mNotesArtifact: String,
    // - Image and text
    mShow: String,
    mText: String,
    mLetteringStyle: [String], // Typeface (imitative), Block, Cursive, Decoraive, Sans Serif, Serif, Handwritten
    mNotesImageAndText: String,
    // Intent
    mConcern: [String], // Abortion, Bernie Sanders, Black Lives Matter, Children...
    mTone: [String], // Humor, Rage, Fear, Meta, Loving, Insults, Indignation
    mCulturalContext: [String], // Popular Memes, Internet, Pop culture, Things Trump said, Famous Protest Slogan, Historic Reference
    mAdditionalTheme: String, // Open
    mStrategy: [String], // Demand, Compaint, Encouragement, Solidarity, Call to action
    mSigned: String, // signed by who?
    mNotesIntent: String,
    // Additional
    mAdditionalKeywords: String, // Comma separated
    mAdditionalNotes: String,
    hasManualData: { type: Boolean, default: false },
    searchText: String
});

module.exports = {
    image: Image
};
