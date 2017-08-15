import React from 'react';
import {RadioButton} from './RadioButton';
import {CheckboxGroup} from './CheckboxGroup';
import {TextInput} from './TextInput';
// import {$} from 'jquery';

export class Questionnaire extends React.Component {
    constructor (props) {
        super(props);
        this.state = { selectedSection: 0 };
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
        obj.mMade = value('mMade', true);
        obj.mContains = value('mContains', true);
        obj.mNotesArtifact = value('mNotesArtifact');
        // Image and text
        obj.mShow = value('mShow');
        obj.mText = value('mText');
        obj.mLetteringStyle = value('mLetteringStyle', true);
        obj.mNotesImageAndText = value('mNotesImageAndText');
        // Intent
        obj.mConcern = value('mConcern', true);
        obj.mTone = value('mTone', true);
        obj.mCulturalContext = value('mCulturalContext', true);
        obj.mAdditionalTheme = value('mAdditionalTheme');
        obj.mStrategy = value('mStrategy', true);
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
                        <TextInput name='mTitle' placeholder='Title' label='Give the poster a brief title.'/>
                        {/* BACKSIDE OF THE POSTER */}
                        <div className='form-group'>
                            <label>Is it backside of the poster?</label>
                            <div className='input-group'>
                                <RadioButton value='yes' label='Yes' name='mBackside'/>
                                <RadioButton value='no' label='No' name='mBackside'/>
                                <RadioButton value='maybe' label='Maybe' name='mBackside'/>
                            </div>
                        </div>
                        {/* ROTATED */}
                        <div className='form-group'>
                            <label>Is the image rotated?</label>
                            <div className='input-group'>
                                <RadioButton value={true} label='Yes' name='mRotated'/>
                                <RadioButton value={false} label='No' name='mRotated'/>
                            </div>
                        </div>

                        {/* CONDITION */}
                        <CheckboxGroup label='In what condition is the poster?' name='mCondition' options={[
                            { label: 'Mint' },
                            { label: 'Good' },
                            { label: 'Poor' },
                            { label: 'Folded' },
                            { label: 'Torn' },
                            { label: 'Stained' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* MADE */}
                        <CheckboxGroup label='How is it made?' name='mMade' options={[
                            { label: 'Drawing' },
                            { label: 'Print' },
                            { label: 'Marker' },
                            { label: 'Crayola' },
                            { label: 'Kids Drawing' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* CONTAINS */}
                        <CheckboxGroup label='This poster contains:' name='mContains' options={[
                            { label: 'Text only' },
                            { label: 'Text and illustration' },
                            { label: 'Text and photography' },
                            { label: 'Collage' },
                            { label: 'images only' },
                            { label: 'illustration only' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Notes for Artifact */}
                        <TextInput name='mNotesArtifact' label='Notes for Section 1'/>
                        <div className='flex-edges'>
                            <button className='btn btn-outline-danger' onClick={this.cancel}>Cancel</button>
                            <button className='btn btn-outline-primary' onClick={this.next} data-index={0}>Next</button>
                        </div>
                    </section>

                    {/* ----------SECTION 2---------- */}
                    <section className={this.state.selectedSection === 1 ? '' : 'hide'} id='questionnaire-image-and-text'>
                        {/* What does it show? */}
                        <TextInput name='mShow' label='What does it show? (e.g. cat, coat hanger, pink triangle, etc.)'/>
                        {/* transcribed text */}
                        <TextInput name='mText' label='What does the text say? (Please transcribe the poster text, if any)'/>
                        {/* Lettering style */}
                        <CheckboxGroup label='What lettering style is used for the poster text' name='mLetteringStyle' options={[
                            { label: 'Typeface (imitative)' },
                            { label: 'Block' },
                            { label: 'Cursive' },
                            { label: 'Decorative' },
                            { label: 'Sans serif' },
                            { label: 'Serif' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Notes for Image and Text */}
                        <TextInput name='mNotesImageAndText' label='Notes for Section 2'/>
                        <div className='flex-edges'>
                            <button className='btn btn-outline-danger' onClick={this.cancel}>Cancel</button>
                            <button className='btn btn-outline-primary' onClick={this.next} data-index={1}>Next</button>
                        </div>
                    </section>
                    {/* ----------SECTION 3---------- */}
                    <section className={this.state.selectedSection === 2 ? '' : 'hide'} id='questionnaire-intent'>
                        <CheckboxGroup label='What is the concern?' name='mConcern' options={[
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
                            { label: 'Institutions, supreme court, political parties' },
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
                        <CheckboxGroup label='What is the tone?' name='mTone' options={[
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
                        <CheckboxGroup label='What is the cultural context?' name='mCulturalContext' options={[
                            { label: 'Popular memes (viral content like LOL cats)' },
                            { label: 'Internet (tweets, tech jargon (e.g. Alt R+ del))' },
                            { label: 'Pop culture (e.g. Princess Leah, song lyrics, etc)' },
                            { label: 'Things Trump said' },
                            { label: 'Famous protest slogan (e.g. We shall overcome, Black Lives Matter)' },
                            { label: 'Historic reference (e.g. Witch hunts, founding fathers, slavery, etc.)?' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Additional Theme */}
                        <TextInput name='mAdditionalTheme' label='Which additional theme (meme) would you group it under?'/>
                        {/* Strategy */}
                        <CheckboxGroup label='What is the strategy?' name='mStrategy' options={[
                            { label: 'Demand' },
                            { label: 'Complaint' },
                            { label: 'Encouragement' },
                            { label: 'Solidarity' },
                            { label: 'Call to action' },
                            { label: 'Other', textbox: true }
                        ]}/>
                        {/* Signed */}
                        <TextInput name='mSigned' label='Is the poster signed, or is the creator identified? If so, please enter the name:'/>
                        <TextInput name='mNotesIntent' label='Notes to Section 3:'/>
                        <div className='flex-edges'>
                            <button className='btn btn-outline-danger' onClick={this.cancel}>Cancel</button>
                            <button className='btn btn-outline-primary' onClick={this.next} data-index={2}>Next</button>
                        </div>
                    </section>
                    {/* ----------ADDITIONAL---------- */}
                    <section className={this.state.selectedSection === 3 ? '' : 'hide'} id='questionnaire-additional'>
                        <TextInput name='mAdditionalKeywords' label='Enter a few additional keywords separated by commas (2-5, preferably):'/>
                        <TextInput name='mAdditionalNotes' label='Additional notes (notes on research, on things to look at, questions, etc.):'/>
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
