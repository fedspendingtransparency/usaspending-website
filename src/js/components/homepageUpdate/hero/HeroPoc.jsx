import React, { useState, useEffect } from "react";
import "./HeroPoc.scss";

const HeroPoc = () => {
    const [paused, togglePaused] = useState(true);
    const leftWords = ['Explore', 'Search', 'Track', 'Download', 'Analyze'];
    const rightWords = ['over time', 'by agency', 'by recipient', 'to communities', 'by industry', 'on contracts', 'on grants', 'by state'];

    const getRandomInt = (max) => Math.floor(Math.random() * max);

    const rotatingWords = {
        left: {
            index: null,
            previousWord: null,
            wordsArray: [...leftWords],
            tempWordsArray: [...leftWords]
        },
        right: {
            index: null,
            previousWord: null,
            wordsArray: [...rightWords],
            tempWordsArray: [...rightWords]
        }
    };

    const pickWord = (position) => {
        const { wordsArray } = rotatingWords[position];

        let {
            index, previousWord, tempWordsArray
        } = rotatingWords[position];

        if (previousWord) {
            tempWordsArray.splice(tempWordsArray.indexOf(tempWordsArray[index]), 1);
        }

        if (tempWordsArray?.length === 0) {
            tempWordsArray = [...wordsArray];
        }

        do {
            index = getRandomInt(tempWordsArray.length);
        } while (previousWord === tempWordsArray[index]);

        previousWord = tempWordsArray[index];
        return index;
    };

    useEffect(() => {
        togglePaused(false);
    }, []);

    const rotatingText = () => (<div style={{ "margin-bottom": "4rem" }}>
        <div className="hero__heading-wrapper">
            <h2 className="sentence hero__temp-h1" style={{ flexBasis: '517px' }}>
                {!paused ?
                    <div className="phraseIntro">
                        <div className="leftWords initialVertical">
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}&nbsp;</span>
                        </div>
                        <div className="leftWords slidingVertical">
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}&nbsp;</span>
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}&nbsp;</span>
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}&nbsp;</span>
                        </div>
                        <div className="leftWords finalVertical">
                            <span>{rotatingWords.left.tempWordsArray[pickWord('left')]}&nbsp;</span>
                        </div>

                    </div>
                    :
                    <div className="leftWords">
                        <span>{rotatingWords.left.tempWordsArray[rotatingWords.left.index]}</span>
                    </div>
                }
                <div className="staticBlock">government spending&nbsp;</div>
                {!paused ?
                    <div className="phraseEnd">
                        <div className="rightWords initialVertical">
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                        </div>
                        <div className="rightWords slidingVertical">
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                        </div>
                        <div className="rightWords finalVertical">
                            <span>{rotatingWords.right.tempWordsArray[pickWord('right')]}</span>
                        </div>
                    </div>
                    :
                    <div className="rightWords">
                        <span>{rotatingWords.right.tempWordsArray[rotatingWords.right.index]}</span>
                    </div>
                }
                {/*<br/>*/}
                {/*<div className="phraseEnd">*/}
                {/*    <div className="rightWords finalVertical"><span>The official source of government spending data.</span></div>*/}
                {/*</div>*/}
            </h2>
        </div>
    </div>);


    return (<>{rotatingText()}</>);
};

export default HeroPoc;
