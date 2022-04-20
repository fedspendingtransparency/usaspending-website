import React, { useEffect, useState } from "react";

const AnimatedHeading = ({ paused }) => {
    const leftWords = ['Explore', 'Search', 'Track', 'Download', 'Analyze'];
    const rightWords = ['by industry', 'by agency', 'over time', 'to communities', 'by recipient'];
    const [endWordTop, setEndWordTop] = useState();
    const [landingCnt, setLandingCnt] = useState(0);
    const [animatedCnt, setAnimatedCnt] = useState(0);

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

    // eslint-disable-next-line no-shadow
    const pauseAll = (paused, isLanding) => {
        const intro = document.querySelectorAll(".phrase__intro__item span");
        intro.forEach((item, index) => {
            intro[index].style.animationPlayState = paused ? "paused" : "running";
        });

        const end = document.querySelectorAll(".phrase__end__item span");
        end.forEach((item, index) => {
            end[index].style.animationPlayState = paused ? "paused" : "running";
        });

        if (!isLanding) {
            document.querySelector(".landing-phrase span").style.animationPlayState = paused ? "paused" : "running";
        }

        document.querySelector(".phrase__static__item").style.animationPlayState = paused ? "paused" : "running";
    };

    useEffect(() => {
        pauseAll(paused);
    }, [paused]);

    useEffect(() => {
        pauseAll(true, true);
        const phrase = document.querySelector('.phrase');
        document.querySelector('.phrase').style.visibility = 'hidden';
        document.querySelector('.landing-phrase').classList.remove('landing-phrase--entrance-animation');

        const landing = document.querySelector('.landing-phrase');
        landing.addEventListener('animationend', () => {
            // fade out and start animation
            landing.style.visibility = 'hidden';
            phrase.style.visibility = 'visible';
            pauseAll(false, false);
            const clonedNode = phrase.cloneNode(true);
            phrase.parentNode.replaceChild(clonedNode, phrase);
            setAnimatedCnt((prevState) => prevState + 1);
        });

    },[landingCnt]);

    useEffect(() => {
        const phrase = document.querySelector('.phrase');
        const animated = phrase.querySelector('.phrase__end__item--rotation').lastElementChild;
        animated.addEventListener('animationstart', () => {
            const landing = document.querySelector('.landing-phrase');
            setTimeout(() => {
                // document.querySelector('.phrase__intro__item').classList.add('phrase--exit-animation');
                // document.querySelector('.phrase__static__item').classList.add('phrase--exit-animation');
                // document.querySelector('.phrase__end__item').classList.add('phrase--exit-animation');
                document.querySelector('.phrase').style.visibility = 'hidden';
                landing.style.visibility = 'visible';
                const clonedNode = landing.cloneNode(true);
                landing.parentNode.replaceChild(clonedNode, landing);
                landing.classList.add('landing-phrase--entrance-animation');
                document.querySelector('.phrase__intro__item').classList.remove('phrase--exit-animation');
                document.querySelector('.phrase__static__item span').classList.remove('phrase--exit-animation');
                document.querySelector('.phrase__end__item').classList.remove('phrase--exit-animation');
                setLandingCnt((prevState) => prevState + 1);
            }, 2500);
        });

    }, [animatedCnt]);

    // hack to center text if it goes to two lines on desktop
    const handleWindowResize = () => {
        const tempEndPart = document.querySelector(".phrase__end");
        const tempStaticPart = document.querySelector(".phrase__static__item");

        if (endWordTop !== tempEndPart.offsetTop) {
            setEndWordTop(tempEndPart.offsetTop);
            const animatedSpan = document.querySelectorAll(".phrase__end span");
            if (tempEndPart.offsetTop - tempStaticPart.offsetTop > 10) {
                animatedSpan.forEach((item, index) => {
                    if (index !== 3) {
                        animatedSpan[index].classList.add('phrase__end--center');
                    }
                });
            }
            else {
                animatedSpan.forEach((item, index) => {
                    animatedSpan[index].classList.remove('phrase__end--center');
                });
            }
        }
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const rotatingText = () => (
        <div className="hero__headline">
            <h1 className="landing-phrase landing-phrase--exit-animation">
                <div>The official source of government <span style={{ whiteSpace: 'nowrap' }}>spending data</span></div>
            </h1>
            <div className="phrase">
                <div className="phrase__intro">
                    <div className="phrase__intro__item">
                        <div className="phrase__intro__item--entrance">
                            <span>{rotatingWords.left.tempWordsArray[0]}&nbsp;</span>
                        </div>
                        <div className="phrase__intro__item--rotation">
                            <span>{rotatingWords.left.tempWordsArray[1]}&nbsp;</span>
                            <span>{rotatingWords.left.tempWordsArray[2]}&nbsp;</span>
                            <span>{rotatingWords.left.tempWordsArray[3]}&nbsp;</span>
                            <span>{rotatingWords.left.tempWordsArray[4]}&nbsp;</span>
                        </div>
                    </div>
                </div>
                <div className="phrase__static__item"><span>government spending&nbsp;</span></div>
                <div className="phrase__end">
                    <div className="phrase__end__item">
                        <div className="phrase__end__item--entrance">
                            <span>{rotatingWords.right.tempWordsArray[0]}</span>
                        </div>
                        <div className="phrase__end__item--rotation">
                            <span>{rotatingWords.right.tempWordsArray[1]}</span>
                            <span>{rotatingWords.right.tempWordsArray[2]}</span>
                            <span>{rotatingWords.right.tempWordsArray[3]}</span>
                            <span>{rotatingWords.right.tempWordsArray[4]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>);


    return (<>{rotatingText()}</>);
};

export default AnimatedHeading;
