import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    placeHolder = "Select a fruit",
    optionsArray = testArray,
    htmlName = "fruit"
}) => {
    const [inputValue, setInputValue] = useState('');
    const [openOptions, setOpenOptions] = useState(false);

    // 1) filter for inputValue 2) map to list item element
    const options = optionsArray
        .filter(({ value }) => value.indexOf(inputValue.toLowerCase()) !== -1)
        .map(({ value, text }) => (
            <li value={value}>{text}</li>
        ));

    const onChange = (e) => {
        setInputValue(e.target.value);
        setOpenOptions(e.target.value !== 0);
    };

    const onClickClear = () => setInputValue('');
    const onKeydownClear = (e) => {
        e.persist();
        if (e.key === 'Enter') onClickClear();
    };

    const onClickToggle = () => setOpenOptions((prevState) => !prevState);
    const onKeydownToggle = (e) => {
        e.persist();
        if (e.key === 'Enter') onClickToggle();
    };

    const chevron = openOptions ? "chevron-down" : "chevron-up";

    return (
        <div className="usa-combo-box">
            <label
                className="usa-label"
                id={`${htmlName}-label`}
                htmlFor={htmlName}>
                {labelText}
                <input
                    value={inputValue}
                    type="text"
                    name={htmlName}
                    onChange={onChange}
                    placeholder={placeHolder} />
                <button
                    type="button"
                    name={htmlName}
                    aria-label={`${htmlName}-on-clear`}
                    tabIndex={0}
                    onClick={onClickClear}
                    onKeyDown={onKeydownClear}>
                    <FontAwesomeIcon icon="times" tabIndex={-1} />
                </button>
                <button
                    type="button"
                    name={htmlName}
                    aria-label={`${htmlName}-on-clear`}
                    tabIndex={0}
                    onClick={onClickToggle}
                    onKeyDown={onKeydownToggle}>
                    <FontAwesomeIcon icon={chevron} />
                </button>
                <ul className="usa-select" id={`${htmlName}-select-id`}>
                    { openOptions && options }
                </ul>
            </label>
        </div>
    );
};

export default ComboBox;
