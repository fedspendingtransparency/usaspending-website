import React from 'react';

const testArray = [
    { value: "apple", text: "Apple" },
    { value: "apricot", text: "Apricot" },
    { value: "avocado", text: "Avocado" },
    { value: "banana", text: "Banana" },
    { value: "blackberry", text: "Blackberry" },
    { value: "blood-orange", text: "Blood orange" },
    { value: "blueberry", text: "Blueberry" },
    { value: "boysenberry", text: "Boysenberry" },
    { value: "breadfruit", text: "Breadfruit" },
    { value: "buddhas-hand-citron", text: "Buddha's hand citron" },
    { value: "cantaloupe", text: "Cantaloupe" },
    { value: "clementine", text: "Clementine" },
    { value: "crab-apple", text: "Crab apple" },
    { value: "currant", text: "Currant" },
    { value: "cherry", text: "Cherry" },
    { value: "custard-apple", text: "Custard apple" },
    { value: "coconut", text: "Coconut" },
    { value: "cranberry", text: "Cranberry" },
    { value: "date", text: "Date" },
    { value: "dragonfruit", text: "Dragonfruit" },
    { value: "durian", text: "Durian" },
    { value: "elderberry", text: "Elderberry" },
    { value: "fig", text: "Fig" },
    { value: "gooseberry", text: "Gooseberry" },
    { value: "grape", text: "Grape" },
    { value: "grapefruit", text: "Grapefruit" },
    { value: "guava", text: "Guava" },
    { value: "honeydew-melon", text: "Honeydew melon" },
    { value: "jackfruit", text: "Jackfruit" },
    { value: "kiwifruit", text: "Kiwifruit" },
    { value: "kumquat", text: "Kumquat" },
    { value: "lemon", text: "Lemon" },
    { value: "lime", text: "Lime" },
    { value: "lychee", text: "Lychee" },
    { value: "mandarine", text: "Mandarine" },
    { value: "mango", text: "Mango" },
    { value: "mangosteen", text: "Mangosteen" },
    { value: "marionberry", text: "Marionberry" },
    { value: "nectarine", text: "Nectarine" },
    { value: "orange", text: "Orange" },
    { value: "papaya", text: "Papaya" },
    { value: "passionfruit", text: "Passionfruit" },
    { value: "peach", text: "Peach" },
    { value: "pear", text: "Pear" },
    { value: "persimmon", text: "Persimmon" },
    { value: "plantain", text: "Plantain" },
    { value: "plum", text: "Plum" },
    { value: "pineapple", text: "Pineapple" },
    { value: "pluot", text: "Pluot" },
    { value: "pomegranate", text: "Pomegranate" },
    { value: "pomelo", text: "Pomelo" },
    { value: "quince", text: "Quince" },
    { value: "raspberry", text: "Raspberry" },
    { value: "rambutan", text: "Rambutan" },
    { value: "soursop", text: "Soursop" },
    { value: "starfruit", text: "Starfruit" },
    { value: "strawberry", text: "Strawberry" },
    { value: "tamarind", text: "Tamarind" },
    { value: "tangelo", text: "Tangelo" },
    { value: "tangerine", text: "Tangerine" },
    { value: "ugli-fruit", text: "Ugli fruit" },
    { value: "watermelon", text: "Watermelon" },
    { value: "white-current", text: "White currant" },
    { value: "yuzu", text: "Yuzu" }
];

const ComboBox = ({
    labelText = "Select a fruit",
    placeHolderText = "Select a fruit",
    optionsArray = testArray,
    htmlName = "fruit"
}) => {
    const options = optionsArray.map(({ value, text }) => (
        <option value={value}>{text}</option>
    ));

    return (
        <>
            <label
                className="usa-label"
                htmlFor={htmlName}>
                {labelText}
            </label>
            <div className="usa-combo-box">
                <select className="usa-select" name={htmlName} id="fruit">
                    <option value>{placeHolderText}</option>
                    {options}
                </select>
            </div>
        </>
    );
};

export default ComboBox;
