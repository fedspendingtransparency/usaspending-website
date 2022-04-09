import React, { useEffect } from "react";

const RotatingText = ({ paused }) => {
    const leftWords = ['Explore', 'Search', 'Track', 'Download', 'Analyze'];
    const rightWords = ['over time', 'by agency', 'by recipient', 'to communities', 'by industry', 'on contracts', 'on grants', 'by state'];
    // let currentLeftWord;
    // const [currentRightWords, setCurrentRightWords] = useState(null);

    // const getRandomInt = (max) => Math.floor(Math.random() * max);

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

    // const pickWord = (position) => {
    //     const { wordsArray } = rotatingWords[position];
    //
    //     let {
    //         index, previousWord, tempWordsArray
    //     } = rotatingWords[position];
    //
    //     if (previousWord) {
    //         tempWordsArray.splice(tempWordsArray.indexOf(tempWordsArray[index]), 1);
    //     }
    //
    //     if (tempWordsArray?.length === 0) {
    //         tempWordsArray = [...wordsArray];
    //     }
    //
    //     do {
    //         index = getRandomInt(tempWordsArray.length);
    //     } while (previousWord === tempWordsArray[index]);
    //
    //     previousWord = tempWordsArray[index];
    //     rotatingWords[position].currentWord = previousWord;
    //     return index;
    // };

    useEffect(() => {
        document.getElementById("phrase-intro__first-rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[1].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[2].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[3].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("landing-phrase").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";

        document.getElementById("phase-end__first-rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[1].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[2].style.animationPlayState = paused ? "paused" : "running";
        document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[3].style.animationPlayState = paused ? "paused" : "running";

        // document.getElementsByClassName("phrase-part").style.animationPlayState = paused ? "paused" : "running";


    }, [paused]);

    const rotatingText = () => (<div className="hero__headline">
        <div className="hero__headline__phrase-container">
            <h1 className="landing-phrase" id="landing-phrase">
                <span>The official source of government spending data.</span>
            </h1>
            <div className="phrase-intro phrase-part" id="phrase-intro">
                <div className="phrase-intro__item first-rotating-item" id="phrase-intro__first-rotating-item">
                    <span>{rotatingWords.left.tempWordsArray[1]}&nbsp;</span>
                </div>
                <div className="phrase-intro__item rotating-item" id="phrase-intro__rotating-item">
                    <span>{rotatingWords.left.tempWordsArray[3]}&nbsp;</span>
                    <span>{rotatingWords.left.tempWordsArray[4]}&nbsp;</span>
                    <span>{rotatingWords.left.tempWordsArray[2]}&nbsp;</span>
                    <span>{rotatingWords.left.tempWordsArray[0]}&nbsp;</span>
                </div>
            </div>
            <div className="static__item phrase-part">government spending&nbsp;</div>
            <div className="phrase-end phrase-part">
                <div className="phrase-end__item first-rotating-item" id="phase-end__first-rotating-item">
                    <span>{rotatingWords.right.tempWordsArray[5]}</span>
                </div>
                <div className="phrase-end__item rotating-item" id="phase-end__rotating-item">
                    <span>{rotatingWords.right.tempWordsArray[3]}</span>
                    <span>{rotatingWords.right.tempWordsArray[2]}</span>
                    <span>{rotatingWords.right.tempWordsArray[7]}</span>
                    <span>{rotatingWords.right.tempWordsArray[4]}</span>
                </div>
            </div>
        </div>
    </div>);


    return (<>{rotatingText()}</>);
};

export default RotatingText;
