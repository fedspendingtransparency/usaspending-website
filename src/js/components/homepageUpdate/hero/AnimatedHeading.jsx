import React, { useEffect, useState } from "react";

const AnimatedHeading = ({ paused }) => {
    const leftWords = ['Explore', 'Search', 'Track', 'Download', 'Analyze'];
    const rightWords = ['by industry', 'by agency', 'over time', 'to communities', 'by recipient'];
    const [endWordTop, setEndWordTop] = useState();
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
    }, [paused]);

    useEffect(() => {
        const animated = document.querySelector('.phrase__end-rotation').lastElementChild;
        animated.addEventListener('animationstart', () => {
            // const intro = document.querySelectorAll(".phrase__intro__item span");
            // intro.forEach((item, index) => {
            //     intro[index].style.animationPlayState = "paused";
            // });

            setTimeout(() => {
                document.querySelectorAll('.phrase__static__item').classList.add('phrase--exit-animation');
                setTimeout(() => {
                    // document.querySelector('.phrase').style.display = 'none';
                    document.querySelector('.landing-phrase').classList.add('landing-phrase--entrance-animation');
                }, 2000);
            }, 3000);
        });

        const endingAnimation = document.querySelector('.phrase__end__item--entrance span');
        endingAnimation.addEventListener('animationend', () => {
            document.querySelector('.phrase__end-rotation').classList.add('phrase__end__item--rotate');
        });
    }, []);

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
            <h1 className="landing-phrase">
                <span>The official source of government spending data</span>
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
                        <div className="phrase__end-rotation">
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
