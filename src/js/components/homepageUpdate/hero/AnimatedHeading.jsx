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
    const pauseAll = (paused) => {
        const intro = document.querySelectorAll(".phrase__intro__item span");
        intro.forEach((item, index) => {
            intro[index].style.animationPlayState = paused ? "paused" : "running";
        });

        const end = document.querySelectorAll(".phrase__end__item span");
        end.forEach((item, index) => {
            end[index].style.animationPlayState = paused ? "paused" : "running";
        });

        document.querySelector(".landing-phrase span").style.animationPlayState = paused ? "paused" : "running";

        document.querySelector(".phrase__static__item").style.animationPlayState = paused ? "paused" : "running";
    };

    useEffect(() => {
        pauseAll(paused);
    }, [paused]);

    useEffect(() => {
        document.querySelector('.phrase').style.visibility = 'hidden';
        const landing = document.querySelector('.landing-phrase');
        landing.addEventListener('animationend', () => {
            // fade out and start animation
            landing.style.visibility = 'hidden';
            document.querySelector('.phrase__intro__item').classList.add('phrase--entrance-animation');
            document.querySelector('.phrase__static__item').classList.add('phrase--entrance-animation');
            const endPhrase = document.querySelector('.phrase__end__item');
            endPhrase.classList.add('phrase--entrance-animation');
            endPhrase.addEventListener('animationend', () => {
                document.querySelector('.phrase__intro__item .entrance__item').classList.add('phrase__intro__item--entrance');
                document.querySelector('.phrase__intro__item .rotating__items').classList.add('phrase__intro__item--rotation');

                document.querySelector('.phrase__end__item .entrance__item').classList.add('phrase__end__item--entrance');
                document.querySelector('.phrase__end__item .rotating__items').classList.add('phrase__end__item--rotation');
                const phrase = document.querySelector('.phrase');
                phrase.style.visibility = "visible";
                const clonedNode = phrase.cloneNode(true);
                phrase.parentNode.replaceChild(clonedNode, phrase);
                setAnimatedCnt((prevState) => prevState + 1);
            });
        });
    }, [landingCnt]);

    useEffect(() => {
        const animated = document.querySelector('.phrase__end__item .rotating__items').lastElementChild;
        animated.addEventListener('animationstart', () => {
            const landing = document.querySelector('.landing-phrase');
            setTimeout(() => {
                document.querySelector('.phrase__intro__item').classList.add('phrase--exit-animation');
                document.querySelector('.phrase__static__item').classList.add('phrase--exit-animation');
                document.querySelector('.phrase__end__item').classList.add('phrase--exit-animation');
                setTimeout(() => {
                    document.querySelector('.phrase').style.visibility = 'hidden';
                    landing.classList.remove('landing-phrase--entrance-animation');
                    landing.classList.add('landing-phrase--exit-animation');
                    landing.style.visibility = 'visible';
                    let clonedNode = landing.cloneNode(true);
                    landing.parentNode.replaceChild(clonedNode, landing);
                    document.querySelector('.phrase__intro__item').classList.remove('phrase--exit-animation');
                    document.querySelector('.phrase__static__item').classList.remove('phrase--exit-animation');
                    document.querySelector('.phrase__end__item').classList.remove('phrase--exit-animation');
                    document.querySelector('.phrase__intro__item').classList.remove('phrase--entrance-animation');
                    document.querySelector('.phrase__static__item').classList.remove('phrase--entrance-animation');
                    document.querySelector('.phrase__end__item').classList.remove('phrase--entrance-animation');
                    document.querySelector('.phrase__intro__item .entrance__item').classList.remove('phrase__intro__item--entrance');
                    document.querySelector('.phrase__intro__item .rotating__items').classList.remove('phrase__intro__item--rotation');
                    document.querySelector('.phrase__end__item .entrance__item').classList.remove('phrase__end__item--entrance');
                    document.querySelector('.phrase__end__item .rotating__items').classList.remove('phrase__end__item--rotation');
                    const phrase = document.querySelector('.phrase');
                    clonedNode = phrase.cloneNode(true);
                    phrase.parentNode.replaceChild(clonedNode, phrase);
                    setLandingCnt((prevState) => prevState + 1);
                }, 1500);
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
            <h1 className="landing-phrase landing-phrase--entrance-animation">
                <div>The official source of government <span style={{ whiteSpace: 'nowrap' }}>spending data</span></div>
            </h1>
            <div className="phrase">
                <div className="phrase__intro">
                    <div className="phrase__intro__item">
                        <div className="entrance__item">
                            <span>{rotatingWords.left.tempWordsArray[0]}&nbsp;</span>
                        </div>
                        <div className="rotating__items">
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
                        <div className="entrance__item">
                            <span>{rotatingWords.right.tempWordsArray[0]}</span>
                        </div>
                        <div className="rotating__items">
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
