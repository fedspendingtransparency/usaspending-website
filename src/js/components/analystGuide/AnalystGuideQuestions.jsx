import React from 'react';
import Accordion from "../sharedComponents/accordion/accordion";

const questions = [{
    question: "What is the difference between a contract and a grant? Also, what is the difference between the data structure?",
    answer: (<><p>A contract is an agreement between the federal government and a recipient to provide goods and services to the government for a fee. Grants are a form of financial assistance, where a federal agency transfers a thing of value (either money or in kind) to the recipient in order for the recipient to carry out activities or projects to benefit the public.</p><p>Because of these differences, contract and financial assistance data have different structures, fields, and categorization systems. For example, financial assistance awards are categorized by the Catalogue of Federal Domestic Assistance (CFDA) tags, where contracts are categorized with Product and Service Codes. Furthermore, contract and financial assistance data are provided to USAspending.gov from two distinct feeder systems. Contract data is entered into a system called the Federal Procurement Data System (FPDS), which is managed by GSA, while financial assistance data is entered directly into a Treasury-managed system called the Broker.</p></>)
}]

const AnalystGuideQuestions = () => (
    <>
        <h4>General Questions</h4>
        {questions.map((item, i) => (
            <Accordion
                key={`item_${i}`}
                title={item.question}>{item.answer}
            </Accordion>
        ))}
        <p>Add accordions here</p>
    </>
);

export default AnalystGuideQuestions;

