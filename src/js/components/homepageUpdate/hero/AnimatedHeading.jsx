import React, { useEffect } from "react";

const AnimatedHeading = ({ paused }) => {
    const leftWords = ['Explore', 'Search', 'Track', 'Download', 'Analyze'];
    const rightWords = ['over time', 'by agency', 'by recipient', 'to communities', 'by industry', 'on contracts', 'on grants', 'by state'];
    // TODO with DEV-8677
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

    // TODO with DEV-8677
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
        document.querySelectorAll(".phrase__intro__item span").forEach((item) => {
            item.style.animationPlayState = paused ? "paused" : "running";
        });

        document.querySelectorAll(".phrase__end__item span").forEach((item) => {
            item.style.animationPlayState = paused ? "paused" : "running";
        });

        document.querySelector(".landing-phrase span").style.animationPlayState = paused ? "paused" : "running";

        document.querySelector(".phrase__static__item").style.animationPlayState = paused ? "paused" : "running";
    }, [paused]);

    useEffect(() => {
        const animated = document.querySelector('.phrase__end__item--rotation').lastElementChild;
        animated.addEventListener('animationstart', () => {
            document.querySelector('.phrase').classList.add('phrase--exit-animation');
            setTimeout(() => {
                document.querySelector('.phrase').style.display = 'none';
                document.querySelector('.landing-phrase').classList.add('landing-phrase--entrance-animation');
            }, 500);
        });
    }, []);

    const rotatingText = () => (<div className="hero__headline">
        <h1 className="landing-phrase">
            <span>The official source of government spending data.</span>
        </h1>
        <div className="phrase">
            <div className="phrase__intro">
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
            <div className="phrase__static__item"><span>government spending&nbsp;</span></div>
            <div className="phrase__end">
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

export default AnimatedHeading;
