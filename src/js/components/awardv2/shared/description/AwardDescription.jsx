/**
 * AwardDescription.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { SpeechBubble, Glossary } from 'components/sharedComponents/icons/Icons';
import { descriptionInfo } from '../../shared/InfoTooltipContent';
import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';

const propTypes = {
    awardId: PropTypes.string,
    description: PropTypes.string,
    naics: PropTypes.string,
    psc: PropTypes.string
};

export default class AwardDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moreButton: true,
            buttonValue: 'read more'
        };

        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton() {
        this.setState((prevState) => {
            const buttonValue = prevState.buttonValue === 'read more'
                ? 'read less'
                : 'read more';
            return {
                moreButton: !prevState.moreButton,
                buttonValue
            };
        });
    }

    render() {
        const maxChars = 300;
        const test = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur vel recusandae consectetur saepe nulla illo porro placeat? Officia distinctio asperiores quam saepe voluptatibus, exercitationem aliquid, nam quos natus molestiae quae. Minima et, blanditiis repellat enim voluptatem eveniet? Itaque, corporis. Repellendus praesentium voluptas harum doloribus debitis, obcaecati aut beatae pariatur quas quia voluptatum! Natus fuga aut molestiae numquam architecto facere corporis alias doloribus ipsam quas dolorem officia, harum ullam est ad sequi iure nemo et quod veniam quidem aliquid, enim esse recusandae? Modi a ex magni in. Inventore aut placeat iste tempore aperiam tenetur, consequatur mollitia aspernatur aliquam culpa error voluptatem molestiae officiis qui corporis numquam veritatis. Dolores qui, atque, rem similique nisi, aut officia quis modi minima debitis ut sequi voluptatem quasi odit corrupti aliquam enim minus impedit aliquid quas nesciunt dolorem neque in! Iusto, voluptatem beatae? Quam eius eum doloribus aperiam laudantium. Deleniti ullam asperiores cumque atque hic ea quod? Harum, labore nihil? Dolorem quia aliquam, nihil, debitis voluptatum ab amet quam unde dolores nemo iure odio est libero aut quas laudantium quo laboriosam, maxime laborum aperiam dolorum nesciunt vitae quidem distinctio! Voluptatibus fugiat doloremque nisi sunt, quia aut rerum, repellat eum voluptatem corporis expedita asperiores optio deleniti, tenetur nihil ab accusamus saepe voluptatum doloribus? Expedita natus fugiat voluptatibus, quas deleniti eius hic odit aperiam recusandae sed doloremque, aliquid, nobis quam minima autem temporibus nostrum consectetur. Repellat saepe soluta asperiores doloremque, aperiam cum recusandae optio facere voluptatibus, eveniet quisquam esse necessitatibus temporibus porro dolores enim quae labore itaque tempore iure voluptate minus ducimus quas! Minus eum voluptate tenetur voluptatum expedita accusamus commodi libero unde aperiam odit beatae voluptas autem impedit, praesentium optio, laborum aspernatur repellat ut et ab maiores distinctio natus recusandae voluptatem? Atque necessitatibus amet aliquam iure dolorem sed odit debitis. Architecto maiores deleniti facere iste blanditiis eum odio asperiores impedit odit distinctio ducimus incidunt aliquam unde, neque, recusandae necessitatibus nam aspernatur laudantium pariatur quia sapiente fuga reiciendis dolore consequatur. Quis molestiae fugiat sint consequatur autem distinctio. Provident labore, commodi veritatis nulla culpa ad quidem libero nesciunt quaerat placeat quam incidunt esse dolore laborum ipsam excepturi iste minima pariatur eligendi vero? Dolores asperiores assumenda debitis! Fugiat reprehenderit eligendi ad id, debitis non nihil vero aliquid. Fuga placeat officia, ad quo perferendis quia maiores facilis laborum est eum, error doloribus minus vel illo saepe accusantium harum provident, repellendus laboriosam facere pariatur explicabo laudantium at! Facere, quod dolores. Soluta, reiciendis.";
        // let value = this.props.description;
        let value = test;
        const overflow = value.length > maxChars;
        if (overflow && this.state.moreButton) {
            value = `${value.substring(0, maxChars)}...`;
        }

        let button = null;
        if (overflow) {
            button = (
                <button
                    onClick={this.toggleButton}
                    className="award-description__button">
                    {this.state.buttonValue}
                </button>
            );
        }

        return (
            <AwardSection type="column" className="award-viz award-description">
                <AwardSectionHeader icon={<SpeechBubble />} tooltip={descriptionInfo} title="Description" />
                <div className="award-description__content">
                    <p className="award-description__description">
                        {value} {button}
                    </p>
                    <div className="award-description__naics-psc">
                        <div className="naics-psc__section">
                            <div className="naics-psc__heading">
                                North American Industry Classification System (NAICS) Code
                                <div className="naics-psc__icon">
                                    <a href={`#/award/${this.props.awardId}/?glossary=naics`}>
                                        <Glossary />
                                    </a>
                                </div>
                            </div>
                            {this.props.naics}
                        </div>
                        <div className="naics-psc__section naics-psc__section_psc">
                            <div className="naics-psc__heading">
                                Product Service Code (PSC)
                                <div className="naics-psc__icon">
                                    <a href={`#/award/${this.props.awardId}/?glossary=productservice-code-psc`}>
                                        <Glossary />
                                    </a>
                                </div>
                            </div>
                            {this.props.psc}
                        </div>
                    </div>
                </div>
            </AwardSection>
        );
    }
}
AwardDescription.propTypes = propTypes;
