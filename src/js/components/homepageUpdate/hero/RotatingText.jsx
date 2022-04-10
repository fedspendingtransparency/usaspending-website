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
        // document.getElementById("phrase-intro__first-rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[1].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[2].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phrase-intro__rotating-item").getElementsByTagName('span')[3].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("landing-phrase").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        //
        // document.getElementById("phase-end__first-rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[0].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[1].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[2].style.animationPlayState = paused ? "paused" : "running";
        // document.getElementById("phase-end__rotating-item").getElementsByTagName('span')[3].style.animationPlayState = paused ? "paused" : "running";

        // document.getElementsByClassName("phrase-part").style.animationPlayState = paused ? "paused" : "running";


    }, [paused]);

    useEffect(() => {
        const animated = document.querySelector('.phrase__end__item--rotation').lastElementChild;
        animated.addEventListener('animationstart', () => {
            const oldPhraseItems = document.querySelectorAll('.phrase--exit');
            oldPhraseItems.forEach((item) => {
                item.classList.add('phrase--exit-animation');
            });

            document.querySelector('.phrase__landing').classList.add('phrase__landing--entrance-animation');
        });
    }, []);

    const rotatingText = () => (<div className="hero__headline">
        <div className="phrase">
            <h1 className="phrase__landing">
                <span>The official source of government spending data.</span>
            </h1>
            <div className="phrase__intro phrase--exit">
                <div className="phrase__intro__item">
                    <div className="phrase__intro__item--entrance">
                        <span>{rotatingWords.left.tempWordsArray[1]}&nbsp;</span>
                    </div>
                    <div className="phrase__intro__item--rotation">
                        <span>{rotatingWords.left.tempWordsArray[3]}&nbsp;</span>
                        <span>{rotatingWords.left.tempWordsArray[4]}&nbsp;</span>
                        <span>{rotatingWords.left.tempWordsArray[0]}&nbsp;</span>
                        <span>{rotatingWords.left.tempWordsArray[2]}&nbsp;</span>
                    </div>
                </div>
            </div>
            <div className="phrase__static__item phrase--exit">government spending&nbsp;</div>
            <div className="phrase__end phrase--exit">
                <div className="phrase__end__item" id="phase-end__first-rotating-item">
                    <div className="phrase__intro__item--entrance">
                        <span>{rotatingWords.right.tempWordsArray[5]}</span>
                    </div>
                    <div className="phrase__end__item--rotation">
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

export default RotatingText;
