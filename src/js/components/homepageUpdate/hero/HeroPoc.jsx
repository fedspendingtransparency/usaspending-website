import React, { useState, useEffect } from "react";
import "./HeroPoc.scss";

const HeroPoc = ({ paused }) => {
    const [isPaused, setPaused] = useState(true);
    const leftWords = ['Explore', 'Search', 'Track', 'Download', 'Analyze'];
    const rightWords = ['over time', 'by agency', 'by recipient', 'to communities', 'by industry', 'on contracts', 'on grants', 'by state'];
    let currentLeftWord;
    const [currentRightWords, setCurrentRightWords] = useState(null);

    const getRandomInt = (max) => Math.floor(Math.random() * max);

    const rotatingWords = {
        left: {
            index: null,
            previousWord: null,
            wordsArray: [...leftWords],
            tempWordsArray: [...leftWords],
            currentWord: null
        },
        right: {
            index: null,
            previousWord: null,
            wordsArray: [...rightWords],
            tempWordsArray: [...rightWords],
            currentWord: null
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
        rotatingWords[position].currentWord = previousWord;
        return index;
    };

    useEffect(() => {
        document.getElementById("initialVertical").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical").getElementsByTagName('span')[1].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical").getElementsByTagName('span')[2].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical").getElementsByTagName('span')[3].style.animationPlayState = paused ? "paused" : "running";

        document.getElementById("initialVertical2").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical2").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical2").getElementsByTagName('span')[1].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical2").getElementsByTagName('span')[2].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("slidingVertical2").getElementsByTagName('span')[3].style.animationPlayState = paused ? "paused" : "running";


    }, [paused]);

    const rotatingText = () => (<div className="rotation-text-container">
        <div className="hero__heading-wrapper">
            <div className="sentence hero__temp-h1">
                <div className="landingPhrase finalVertical">
                    <span>The official source of government spending data.</span>
                </div>
                <div className="phraseIntro wholePhrase" id="phraseIntro">
                    <div className="leftWords initialVertical" id="initialVertical">
                        <span>{rotatingWords.left.tempWordsArray[1]}&nbsp;</span>
                    </div>
                    <div className="leftWords slidingVertical" id="slidingVertical">
                        <span>{rotatingWords.left.tempWordsArray[3]}&nbsp;</span>
                        <span>{rotatingWords.left.tempWordsArray[4]}&nbsp;</span>
                        <span>{rotatingWords.left.tempWordsArray[2]}&nbsp;</span>
                        <span>{rotatingWords.left.tempWordsArray[0]}&nbsp;</span>
                    </div>
                </div>
                <div className="staticBlock wholePhrase">government spending&nbsp;</div>
                <div className="phraseEnd wholePhrase">
                    <div className="rightWords initialVertical" id="initialVertical2">
                        <span>{rotatingWords.right.tempWordsArray[5]}</span>
                    </div>
                    <div className="rightWords slidingVertical" id="slidingVertical2">
                        <span>{rotatingWords.right.tempWordsArray[3]}</span>
                        <span>{rotatingWords.right.tempWordsArray[2]}</span>
                        <span>{rotatingWords.right.tempWordsArray[7]}</span>
                        <span>{rotatingWords.right.tempWordsArray[4]}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>);


    return (<>{rotatingText()}</>);
};

export default HeroPoc;
