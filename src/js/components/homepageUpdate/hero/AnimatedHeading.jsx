import React, { useEffect, useState } from "react";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';

const AnimatedHeading = ({ paused }) => {
    const wordPairs = [['Explore', 'by industry', 75], ['Search', 'by agency', 75], ['Track', 'over time', 75], ['Download', 'to communities', 0], ['Analyze', 'by recipient', 75]];
    const [endWordTop, setEndWordTop] = useState();
    const [wordWrap, setWordWrap] = useState(false);
    const [landingCnt, setLandingCnt] = useState(0);
    const [animatedCnt, setAnimatedCnt] = useState(0);
    const [wordOrder, setWordOrder] = useState(wordPairs);
    const [windowWidth, setWindowWidth] = useState();
    const [isMobile, setIsMobile] = useState(false);

    const shuffle = (array) => {
        // eslint-disable-next-line one-var
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            // eslint-disable-next-line no-param-reassign
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    };

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

        document.querySelector(".phrase__intro__item").style.animationPlayState = paused ? "paused" : "running";
        document.querySelector(".phrase__static__item").style.animationPlayState = paused ? "paused" : "running";
        document.querySelector(".phrase__end__item").style.animationPlayState = paused ? "paused" : "running";
        document.querySelector(".landing-phrase").style.animationPlayState = paused ? "paused" : "running";
    };

    useEffect(() => {
        pauseAll(paused);
    }, [paused]);

    // startMainAnimation doesn't include the initial phrase transition, only the main rotation
    const startMainAnimation = () => {
        document.querySelector('.phrase__intro__item .entrance__item').classList.add('phrase__intro__item--entrance');
        document.querySelector('.phrase__intro__item .rotating__items').classList.add('phrase__intro__item--rotation');

        document.querySelector('.phrase__end__item .entrance__item').classList.add('phrase__end__item--entrance');
        document.querySelector('.phrase__end__item .rotating__items').classList.add('phrase__end__item--rotation');
        const phrase = document.querySelector('.phrase');
        phrase.style.visibility = "visible";
        const clonedNode = phrase.cloneNode(true);
        phrase.parentNode.replaceChild(clonedNode, phrase);
    };

    useEffect(() => {
        document.querySelector('.phrase').style.visibility = 'hidden';
        const landing = document.querySelector('.landing-phrase');
        landing.addEventListener('animationend', () => {
            landing.style.visibility = 'hidden';
            document.querySelector('.phrase__intro__item').classList.add('phrase--entrance-animation');
            document.querySelector('.phrase__static__item').classList.add('phrase--entrance-animation');
            const endPhrase = document.querySelector('.phrase__end__item');
            endPhrase.classList.add('phrase--entrance-animation');
            endPhrase.addEventListener('animationend', () => {
                startMainAnimation();
                setAnimatedCnt((prevState) => prevState + 1);
            });
        });
    }, [landingCnt]);

    // restartPhraseAnimation includes the initial phrase transition and the main rotation
    const restartPhraseAnimation = () => {
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
        const clonedNode = phrase.cloneNode(true);
        phrase.parentNode.replaceChild(clonedNode, phrase);
    };

    const restartLandingAnimation = () => {
        const landing = document.querySelector('.landing-phrase');
        landing.classList.remove('landing-phrase--entrance-animation');
        landing.classList.add('landing-phrase--exit-animation');
        landing.style.visibility = 'visible';
        const clonedNode = landing.cloneNode(true);
        landing.parentNode.replaceChild(clonedNode, landing);
    };

    useEffect(() => {
        const animated = document.querySelector('.phrase__end__item .rotating__items').lastElementChild;
        setWordOrder((prevState) => shuffle(prevState));
        animated.addEventListener('animationstart', () => {
            setTimeout(() => {
                document.querySelector('.phrase__intro__item').classList.add('phrase--exit-animation');
                document.querySelector('.phrase__static__item').classList.add('phrase--exit-animation');
                document.querySelector('.phrase__end__item').classList.add('phrase--exit-animation');
                setTimeout(() => {
                    document.querySelector('.phrase').style.visibility = 'hidden';
                    restartLandingAnimation();
                    restartPhraseAnimation();
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
            setWordWrap(tempEndPart.offsetTop - tempStaticPart.offsetTop > 10);
        }

        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
            setIsMobile(newWidth < mediumScreen);
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
                            <span>{wordOrder[0][0]}&nbsp;</span>
                        </div>
                        <div className="rotating__items">
                            <span>{wordOrder[1][0]}&nbsp;</span>
                            <span>{wordOrder[2][0]}&nbsp;</span>
                            <span>{wordOrder[3][0]}&nbsp;</span>
                            <span>{wordOrder[4][0]}&nbsp;</span>
                        </div>
                    </div>
                </div>
                <div className="phrase__static__item"><span>government spending&nbsp;</span></div>
                <div className="phrase__end">
                    <div className="phrase__end__item">
                        <div className="entrance__item">
                            {isMobile ?
                                <span>{wordOrder[0][1]}</span>
                                :
                                <span style={{ left: wordWrap ? `${wordOrder[0][2]}px` : 'unset' }}>{wordOrder[0][1]}</span>
                            }
                        </div>
                        {isMobile ?
                            <div className="rotating__items">
                                <span>{wordOrder[1][1]}</span>
                                <span>{wordOrder[2][1]}</span>
                                <span>{wordOrder[3][1]}</span>
                                <span>{wordOrder[4][1]}</span>
                            </div>
                            :
                            <div className="rotating__items">
                                <span style={{ left: wordWrap ? `${wordOrder[1][2]}px` : 'unset' }}>{wordOrder[1][1]}</span>
                                <span style={{ left: wordWrap ? `${wordOrder[2][2]}px` : 'unset' }}>{wordOrder[2][1]}</span>
                                <span style={{ left: wordWrap ? `${wordOrder[3][2]}px` : 'unset' }}>{wordOrder[3][1]}</span>
                                <span style={{ left: wordWrap ? `${wordOrder[4][2]}px` : 'unset' }}>{wordOrder[4][1]}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>);

    return (<>{rotatingText()}</>);
};

export default AnimatedHeading;
