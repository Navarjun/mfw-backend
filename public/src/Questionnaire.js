import React from 'react';
import {RadioGroup} from './RadioGroup';
import {CheckboxGroup} from './CheckboxGroup';
import {TextInput} from './TextInput';
// import {$} from 'jquery';

export class Questionnaire extends React.Component {
    constructor (props) {
        super(props);
        this.state = { selectedSection: 0 };
        this.data = this.props.data;
        console.log(this.data);
        this.selectSection = this.selectSection.bind(this);
        this.next = this.next.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }

    selectSection (e) {
        this.setState({selectedSection: +e.target.dataset.index});
    }

    cancel (e) {
        e.preventDefault();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    submit (e) {
        e.preventDefault();

        const obj = {};
        // Artifact
        obj.mTitle = value('mTitle');
        obj.mBackside = value('mBackside');
        obj.mRotated = value('mRotated', false, true);
        obj.mCondition = value('mCondition', true);
        checkOther(obj, 'mCondition');
        obj.mMade = value('mMade', true);
        checkOther(obj, 'mMade');
        obj.mContains = value('mContains', true);
        checkOther(obj, 'mContains');
        obj.mNotesArtifact = value('mNotesArtifact');
        // Image and text
        obj.mShow = value('mShow');
        obj.mText = value('mText');
        obj.mLetteringStyle = value('mLetteringStyle', true);
        checkOther(obj, 'mLetteringStyle');
        obj.mNotesImageAndText = value('mNotesImageAndText');
        // Intent
        obj.mConcern = value('mConcern', true);
        checkOther(obj, 'mConcern');
        obj.mTone = value('mTone', true);
        checkOther(obj, 'mTone');
        obj.mCulturalContext = value('mCulturalContext', true);
        checkOther(obj, 'mCulturalContext');
        obj.mAdditionalTheme = value('mAdditionalTheme');
        obj.mStrategy = value('mStrategy', true);
        checkOther(obj, 'mStrategy');
        obj.mSigned = value('mSigned');
        obj.mNotesIntent = value('mNotesIntent');
        // Additional
        obj.mAdditionalKeywords = value('mAdditionalKeywords').split(',');
        obj.mAdditionalNotes = value('mAdditionalNotes');
        obj.hasManualData = true;

        if (this.props.onSubmit) {
            this.props.onSubmit(obj);
        }
    }

    next (e) {
        e.preventDefault();
        this.setState({selectedSection: 1 + parseInt(e.target.dataset.index)});
    }

    render () {
        return (
            <div>
                <div id='questionnaire-toggle'>
                    <div className='btn-group mr-2' role='group'>
                        <button className={this.state.selectedSection === 0 ? 'btn btn-primary' : 'btn btn-secondary'} onClick={this.selectSection} data-index={0}>Artifact</button>
                        <button className={this.state.selectedSection === 1 ? 'btn btn-primary' : 'btn btn-secondary'} onClick={this.selectSection} data-index={1}>Image and Text</button>
                        <button className={this.state.selectedSection === 2 ? 'btn btn-primary' : 'btn btn-secondary'} onClick={this.selectSection} data-index={2}>Intent</button>
                        <button className={this.state.selectedSection === 3 ? 'btn btn-primary' : 'btn btn-secondary'} onClick={this.selectSection} data-index={3}>Additional</button>
                    </div>
                </div>
                <form method='POST' id='questionnaire-form' onSubmit={this.submit}>
                    {/* ----------SECTION 1---------- */}
                    <section className={this.state.selectedSection === 0 ? '' : 'hide'} id='questionnaire-artifact'>
                        <TextInput name='mTitle' placeholder='Title' value={this.data.mTitle} label='Give the poster a brief title.'/>
                        {/* BACKSIDE OF THE POSTER */}
                        <RadioGroup name='mBackside' value={this.data.mBackside} label='Is it backside of the poster?' options={[
                            { label: 'Yes' },
                            { label: 'No' },
                            { label: 'Maybe' }
                        ]}></RadioGroup>

                        {/* ROTATED */}
                        <RadioGroup name='mRotated' value={this.data.mRotated} label='Is the image rotated?' options={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false }
                        ]}></RadioGroup>

                        {/* CONDITION */}
                        <CheckboxGroup label='In what condition is the poster?' values={this.data.mCondition} name='mCondition' options={[
                            { label: 'Mint' },
                            { label: 'Good' },
                            { label: 'Poor' },
                            { label: 'Folded' },
                            { label: 'Torn' },
                            { label: 'Stained' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* MADE */}
                        <CheckboxGroup label='How is it made?' values={this.data.mMade} name='mMade' options={[
                            { label: 'Drawing' },
                            { label: 'Print' },
                            { label: 'Marker' },
                            { label: 'Collage' },
                            { label: 'Crayola' },
                            { label: 'Kids Drawing' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* CONTAINS */}
                        <CheckboxGroup label='This poster contains:' values={this.data.mContains} name='mContains' options={[
                            { label: 'Text' },
                            { label: 'Illustration' },
                            { label: 'Photography' },
                            { label: 'Collage' },
                            { label: 'Drawing' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Notes for Artifact */}
                        <TextInput name='mNotesArtifact' value={this.data.mNotesArtifact} label='Notes for Section 1'/>
                        <div className='flex-edges'>
                            <button className='btn btn-outline-danger' onClick={this.cancel}>Cancel</button>
                            <button className='btn btn-outline-primary' onClick={this.next} data-index={0}>Next</button>
                        </div>
                    </section>

                    {/* ----------SECTION 2---------- */}
                    <section className={this.state.selectedSection === 1 ? '' : 'hide'} id='questionnaire-image-and-text'>
                        {/* What does it show? */}
                        <TextInput name='mShow' value={this.data.mShow} label='What does it show? (e.g. cat, coat hanger, pink triangle, etc.)'/>
                        {/* transcribed text */}
                        <TextInput name='mText' value={this.data.mText} label='What does the text say? (Please transcribe the poster text, if any)'/>
                        {/* Lettering style */}
                        <CheckboxGroup label='What lettering style is used for the poster text' values={this.data.mLetteringStyle} name='mLetteringStyle' options={[
                            { label: 'Typeface (imitative)' },
                            { label: 'Block' },
                            { label: 'Cursive' },
                            { label: 'Decorative' },
                            { label: 'Sans serif' },
                            { label: 'Serif' },
                            { label: 'Hand-written' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Notes for Image and Text */}
                        <TextInput name='mNotesImageAndText' value={this.data.mNotesImageAndText} label='Notes for Section 2'/>
                        <div className='flex-edges'>
                            <button className='btn btn-outline-danger' onClick={this.cancel}>Cancel</button>
                            <button className='btn btn-outline-primary' onClick={this.next} data-index={1}>Next</button>
                        </div>
                    </section>
                    {/* ----------SECTION 3---------- */}
                    <section className={this.state.selectedSection === 2 ? '' : 'hide'} id='questionnaire-intent'>
                        <CheckboxGroup label='What is the concern?' values={this.data.mConcern} name='mConcern' options={[
                            { label: 'Abortion' },
                            { label: 'Bernie Sanders' },
                            { label: 'Black lives matter' },
                            { label: 'Children' },
                            { label: 'Civil rights' },
                            { label: 'Climate' },
                            { label: 'Hillary Clinton' },
                            { label: 'Dreamers' },
                            { label: 'Earth' },
                            { label: 'Election' },
                            { label: 'Environment' },
                            { label: 'Feminism' },
                            { label: 'Gender equality' },
                            { label: 'Guns' },
                            { label: 'Hate' },
                            { label: 'History' },
                            { label: 'Immigration' },
                            { label: 'Hate' },
                            { label: 'Indigenous' },
                            { label: 'Institutions/supreme court/political parties' },
                            { label: 'Islam' },
                            { label: 'Labor' },
                            { label: 'Latino/a/x' },
                            { label: 'LGBTQ' },
                            { label: 'Love' },
                            { label: 'Migrant rights' },
                            { label: 'Obama nostalgia' },
                            { label: 'Police brutality' },
                            { label: 'Prisons' },
                            { label: 'Putin' },
                            { label: 'Race' },
                            { label: 'Refugees' },
                            { label: 'Religion' },
                            { label: 'Reproductive rights' },
                            { label: 'Science' },
                            { label: 'Trans rights' },
                            { label: 'Uterus' },
                            { label: 'War' },
                            { label: 'Women’s rights' },
                            { label: 'Trump' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Tone */}
                        <CheckboxGroup label='What is the tone?' values={this.data.mTone} name='mTone' options={[
                            { label: 'Assertive' },
                            { label: 'Humor' },
                            { label: 'Rage' },
                            { label: 'Fear' },
                            { label: 'Meta (comment on sign or protest, e.g. "I make the best signs")' },
                            { label: 'Loving' },
                            { label: 'Insults' },
                            { label: 'Indignation' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Cultural Context */}
                        <CheckboxGroup label='What is the cultural context?' values={this.data.mCulturalContext} name='mCulturalContext' options={[
                            { label: 'Popular memes (viral content like LOL cats)' },
                            { label: 'Internet (tweets, tech jargon (e.g. Alt R+ del))' },
                            { label: 'Pop culture (e.g. Princess Leah, song lyrics, etc)' },
                            { label: 'Things Trump said' },
                            { label: 'Famous protest slogan (e.g. We shall overcome, Black Lives Matter)' },
                            { label: 'Historic reference (e.g. Witch hunts, founding fathers, slavery, etc.)?' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Additional Theme */}
                        <TextInput name='mAdditionalTheme' value={this.data.mAdditionalTheme} label='Which additional theme (meme) would you group it under?'/>
                        {/* Strategy */}
                        <CheckboxGroup label='What is the strategy?' values={this.data.mStrategy} name='mStrategy' options={[
                            { label: 'Demand' },
                            { label: 'Complaint' },
                            { label: 'Encouragement' },
                            { label: 'Solidarity' },
                            { label: 'Call to action' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Signed */}
                        <TextInput name='mSigned' value={this.data.mSigned} label='Is the poster signed, or is the creator identified? If so, please enter the name:'/>
                        <TextInput name='mNotesIntent' value={this.data.mNotesIntent} label='Notes to Section 3:'/>
                        <div className='flex-edges'>
                            <button className='btn btn-outline-danger' onClick={this.cancel}>Cancel</button>
                            <button className='btn btn-outline-primary' onClick={this.next} data-index={2}>Next</button>
                        </div>
                    </section>
                    {/* ----------ADDITIONAL---------- */}
                    <section className={this.state.selectedSection === 3 ? '' : 'hide'} id='questionnaire-additional'>
                        <TextInput name='mAdditionalKeywords' value={this.data.mAdditionalKeywords} label='Enter a few additional keywords separated by commas (2-5, preferably):'/>
                        <TextInput name='mAdditionalNotes' value={this.data.mAdditionalNotes} label='Additional notes (notes on research, on things to look at, questions, etc.):'/>
                        {/* SUBMIT BUTTON */}
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </section>
                </form>
            </div>
        );
    }
}

function value (name, checkbox = false, isBool = false) {
    if (checkbox) {
        return Array.from(document.querySelectorAll(`input[name='${name}']:checked`)).map(d => d.value);
    }
    if (isBool) {
        return document.querySelector(`input[name='${name}']`).value === 'true';
    }
    return document.querySelector(`input[name='${name}']`).value;
}

const checkOther = function (obj, name) {
    if (obj[name] && obj[name].length && obj[name].includes('other')) {
        const input = document.querySelector(`input[name='${name + '-textbox'}']`);
        if (input && input.value) {
            const array = input.value.split(',').map(d => d.trim());
            // filter remove the 'other' value itself
            obj[name] = obj[name].filter(d => d !== 'other').concat(array);
        }
    }
};
