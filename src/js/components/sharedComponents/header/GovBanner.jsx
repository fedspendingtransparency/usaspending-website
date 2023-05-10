import React from 'react';

const GovBanner = () => {
    return(
        <section className="usa-banner" data-testid="govBanner">
            <div className="usa-accordion">
                <header className="usa-banner__header">
                    <div className="usa-banner__inner" data-testid="banner-header-inner-div">
                        <div className="grid-col-auto" data-testid="banner-header-flag-div">
                            {/*<img*/}
                            {/*className="usa-banner__header-flag" alt="U.S. flag"*/}
                            {/*src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAsCAIAAABaPSmoAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAQKADAAQAAAABAAAALAAAAAA5W/rGAAABlElEQVRoBe2ZTU4DMQyFYzTLXoHOhhsAW24AR4GzFdb8iC2cABaoPUYXDFKlJt+TSJtZpFEkd+W4jhPnOX5Jxs4vV2H/M7O9GMI0JRkStbAOooef98V97L39pVVUh7yfZJOZTjhLJn1KHkBr3Abm3/rjNs5nvHqM8vrzLspZ/fVTtOH+GV9/kr6C5ClUYVFnueweAVuCByR01HLmtNgUNJ4XD9FqQjHn3vufHWK3nZCbTvcIeAAK9OlbQ0ByMUc3BZywBFdsyBXghIs354GDsPoeOLg8J/jTmMfcA6zTnAdrtthgL5E3yAPUix9xlEYDbWTvDJ5Cab3aSN0jMDAvpZajxhfdB2BPbnEeOJKZ3adQ9wGYvAsBLqnTBXqYyBvRC96FpK6j9lNPPyVy9wh4ACUw17Qxnn9qDlTLt6dQrZUt9ds9AvZ1Mx4NVr4boMrPrd+ZKwOPTjyaybxyfbtHwAMQnBs0nAcaLLoM6XtAlqNBw77BA3IHyJzXhRNyRIC+oI3Agj/3DMZx2ddTqEHWyJDdI/AHdI1y3pPhjf8AAAAASUVORK5CYII=">*/}
                        </div>
                        <div className="grid-col-fill tablet:grid-col-auto" data-testid="banner-header-grid-div"><p
                            className="usa-banner__header-text">An official website of the United States government</p><p
                            className="usa-banner__header-action" aria-hidden="true">Here’s how you know</p></div>
                        <button type="button" className="usa-accordion__button usa-banner__button" aria-expanded="false"
                                aria-controls="gov-banner"><span className="usa-banner__button-text">Here’s how you know</span>
                        </button>
                    </div>
                </header>
                <div className="usa-banner__content usa-accordion__content" hidden="" id="gov-banner">
                    <div className="grid-row grid-gap-lg">
                        <div className="usa-banner__guidance tablet:grid-col-6">
                            {/*<img*/}
                            {/*className="usa-banner__icon usa-media-block__img"*/}
                            {/*src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiPjx0aXRsZT5pY29uLWRvdC1nb3Y8L3RpdGxlPjxwYXRoIGZpbGw9IiMyMzc4QzMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMyIDBjMTcuNjczIDAgMzIgMTQuMzI3IDMyIDMyIDAgMTcuNjczLTE0LjMyNyAzMi0zMiAzMkMxNC4zMjcgNjQgMCA0OS42NzMgMCAzMiAwIDE0LjMyNyAxNC4zMjcgMCAzMiAwem0wIDEuMjA4QzE0Ljk5NCAxLjIwOCAxLjIwOCAxNC45OTQgMS4yMDggMzJTMTQuOTk0IDYyLjc5MiAzMiA2Mi43OTIgNjIuNzkyIDQ5LjAwNiA2Mi43OTIgMzIgNDkuMDA2IDEuMjA4IDMyIDEuMjA4em0xMC41OSAzOC44NThhLjg1Ny44NTcgMCAwIDEgLjg4Mi44MjJ2MS42NDJIMTguODg2di0xLjY0MmEuODU3Ljg1NyAwIDAgMSAuODgyLS44MjJINDIuNTl6TTI1LjQ0MyAyNy43NzR2OS44MjloMS42NDJ2LTkuODNoMy4yNzN2OS44M0gzMnYtOS44M2gzLjI3MnY5LjgzaDEuNjQzdi05LjgzaDMuMjcydjkuODNoLjc2YS44NTcuODU3IDAgMCAxIC44ODIuODIxdi44MjFoLTIxLjN2LS44MDlhLjg1Ny44NTcgMCAwIDEgLjg4LS44MmguNzYydi05Ljg0MmgzLjI3MnptNS43MzYtOC4xODhsMTIuMjkzIDQuOTE1djEuNjQyaC0xLjYzYS44NTcuODU3IDAgMCAxLS44ODIuODIySDIxLjQxYS44NTcuODU3IDAgMCAxLS44ODItLjgyMmgtMS42NDJ2LTEuNjQybDEyLjI5My00LjkxNXoiLz48L3N2Zz4="*/}
                            {/*role="img" alt="" aria-hidden="true" />*/}
                            <div className="usa-media-block__body">
                                <p><strong>Official websites use .gov</strong><br/>A <strong>.gov</strong> website belongs to an official government organization in the United States.</p>
                            </div>
                        </div>
                        <div className="usa-banner__guidance tablet:grid-col-6">
                            {/*<img*/}
                            {/*className="usa-banner__icon usa-media-block__img"*/}
                            {/*src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiPjx0aXRsZT5pY29uLWh0dHBzPC90aXRsZT48cGF0aCBmaWxsPSIjNzE5RjJBIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAwYzE3LjY3MyAwIDMyIDE0LjMyNyAzMiAzMiAwIDE3LjY3My0xNC4zMjcgMzItMzIgMzJDMTQuMzI3IDY0IDAgNDkuNjczIDAgMzIgMCAxNC4zMjcgMTQuMzI3IDAgMzIgMHptMCAxLjIwOEMxNC45OTQgMS4yMDggMS4yMDggMTQuOTk0IDEuMjA4IDMyUzE0Ljk5NCA2Mi43OTIgMzIgNjIuNzkyIDYyLjc5MiA0OS4wMDYgNjIuNzkyIDMyIDQ5LjAwNiAxLjIwOCAzMiAxLjIwOHptMCAxOC44ODZhNy4yNDUgNy4yNDUgMCAwIDEgNy4yNDUgNy4yNDV2My4xMDNoLjUyYy44NiAwIDEuNTU3LjY5OCAxLjU1NyAxLjU1OHY5LjMyMmMwIC44Ni0uNjk3IDEuNTU4LTEuNTU3IDEuNTU4aC0xNS41M2MtLjg2IDAtMS41NTctLjY5Ny0xLjU1Ny0xLjU1OFYzMmMwLS44Ni42OTctMS41NTggMS41NTctMS41NThoLjUyVjI3LjM0QTcuMjQ1IDcuMjQ1IDAgMCAxIDMyIDIwLjA5NHptMCAzLjEwM2E0LjE0MiA0LjE0MiAwIDAgMC00LjE0MiA0LjE0MnYzLjEwM2g4LjI4NFYyNy4zNEE0LjE0MiA0LjE0MiAwIDAgMCAzMiAyMy4xOTd6Ii8+PC9zdmc+"*/}
                            {/*role="img" alt="" aria-hidden="true" />*/}
                            <div className="usa-media-block__body">
                                <p><strong>Secure .gov websites use HTTPS</strong><br/>A <strong>lock ( <span
                                    className="icon-lock"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="64"
                                                               viewBox="0 0 52 64" className="usa-banner__lock-image" role="img"
                                                               aria-labelledby="banner-lock-title banner-lock-description"
                                                               focusable="false"><title id="banner-lock-title">Lock</title><desc
                                    id="banner-lock-description">A locked padlock</desc><path fill="#000000" fill-rule="evenodd"
                                                                                              d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"></path></svg></span> )</strong> or <strong>https://</strong> means
                                    you’ve safely connected to the .gov website. Share sensitive information only on official,
                                    secure websites.</p>
                            </div></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GovBanner;
