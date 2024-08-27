import React, { useEffect, useRef, useState } from "react";
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import './tempPage.css';

function TempPage() {
    const initialData = [
        {
            name: "",
            id: 0,
            children: [],
            parent: null
        }];

    const loadedAlertElement = useRef(null);
    const [data, setData] = useState(initialData);
    const [preSearchData, setPreSearchData] = useState([]);
    const [nodesAlreadyLoaded, setNodesAlreadyLoaded] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isUpdatingExpandedIds, setIsUpdatingExpandedIds] = useState(false);
    const [isUpdatingData, setIsUpdatingData] = useState(false);
    const [expandedIds, setExpandedIds] = useState([]);
    const [initialFetchData, setInitialFetchData] = useState([]);

    const updateTreeData = (list, id, children) => {
        const d = list.map((node) => {
            if (node.id === id) {
                node.children = children.map((el) => el.id);
            }
            return node;
        });
        return d.concat(children);
    };

    const createEntry = (obj, parent = 0, children = []) => ({
        name: obj.naics_description,
        id: obj.naics,
        parent,
        children,
        metadata: {
            count: obj.count,
            naics: obj.naics
        },
        isBranch: obj.count > 0
    });

    function getAllInstancesOfKey(obj, targetKey) {
        // Initialize an array to store all instances of the target key
        const result = [];

        // Helper function to perform recursive traversal
        function traverse(current) {
            // Base case: If current is not an object or array, return
            if (current === null || typeof current !== 'object') {
                return;
            }

            // If current is an array, iterate through each element
            if (Array.isArray(current)) {
                current.forEach((item) => traverse(item));
            } else {
                // If current is an object, check each key
                Object.keys(current).forEach((key) => {
                    if (key === targetKey && current[key]) {
                    // If the key matches the target, add the value to the result array
                        result.push(current[key]);
                    }
                    // Recursively traverse the value associated with the current key
                    traverse(current[key]);
                });
            }
        }

        // Start the traversal from the top-level object
        traverse(obj);

        return result;
    }

    function addKeyInObject(obj, oldKey, newKey, isMetadata = false) {
        // If the input is not an object or array, return it as is
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        // If the input is an array, iterate through its elements
        if (Array.isArray(obj)) {
            return obj.map((item) => addKeyInObject(item, oldKey, newKey, isMetadata));
        }

        // Create a new object to avoid mutating the original one
        const result = {};

        // Iterate through the object's keys
        Object.keys(obj).forEach((key) => {
            // Add the value of the old key to the new key
            if (key === oldKey) {
                result[key] = obj[key]; // keep the old key
                if (isMetadata === true) {
                    result[newKey] = {
                        [oldKey]: obj[key]
                    };
                } else {
                    result[newKey] = obj[key]; // add the new key with the same value
                }
            } else {
                // Recursively apply the function to the value
                result[key] = addKeyInObject(obj[key], oldKey, newKey, isMetadata);
            }
        });

        return result;
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            const d = await fetch(`https://api.usaspending.gov/api/v2/references/naics/`);
            const json = await d.json();
            const initData = json.results.map((obj) => createEntry(obj));
            setData((value) => updateTreeData(value, 0, initData));
            setInitialFetchData(data);
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        const search = async () => {
            const d = await fetch(`https://api.usaspending.gov/api/v2/references/naics/?filter=${searchString}`);
            const json = await d.json();

            let convertedObj = addKeyInObject(addKeyInObject(json.results, 'naics', 'id'), 'naics_description', 'name');
            // Add metadata object that contains count because that persists through a flattenTree
            convertedObj = addKeyInObject(convertedObj, 'count', 'metadata', true);
            const newTree = flattenTree(createEntry({}, 0, convertedObj));
            // setExpandedIds([]);
            setPreSearchData(data);
            setData(newTree);
            // setIsUpdatingExpandedIds(true);
        };

        if (searchString.length >= 2) {
            search();
        } else if (preSearchData.length > 0 && searchString.length < 2) {
            setData(preSearchData);
        }
    }, [searchString]);

    // Expand all node from search if search is happening
    useEffect(() => {
        if (searchString.length >= 2 && isUpdatingExpandedIds) {
            setExpandedIds(getAllInstancesOfKey(data, 'id'));
            console.log(data);
            console.log(getAllInstancesOfKey(data, 'id'));
            setIsUpdatingExpandedIds(false);
        }
    }, [data, isUpdatingExpandedIds]);

    useEffect(() => {
        if (searchString.length >= 2 && isUpdatingData) {
            setExpandedIds([]);
            console.log()
            setIsUpdatingData(false);
        }
    }, [data, isUpdatingData]);

    const onLoadData = async ({ element }) => new Promise((resolve) => {
        if (element.children.length > 0) {
            resolve();
            return;
        }

        if (searchString.length < 2) {
            fetch(`https://api.usaspending.gov/api/v2/references/naics/${element.id}`)
                .then((resp) => resp.json())
                .then((d) => {
                    const newChildren = d.results[0].children.map((obj) => createEntry(obj, element.naics));

                    console.log('new children', newChildren);

                    setData((value) => updateTreeData(value, element.id, newChildren));
                    console.log('new data', data);
                });
        }
    });

    const wrappedOnLoadData = async (props) => {
        const nodeHasNoChildData = props.element.children.length === 0;
        const nodeHasAlreadyBeenLoaded = nodesAlreadyLoaded.find(
            (e) => e.id === props.element.id
        );

        await onLoadData(props);

        if (nodeHasNoChildData && !nodeHasAlreadyBeenLoaded) {
            const el = loadedAlertElement.current;
            setNodesAlreadyLoaded([...nodesAlreadyLoaded, props.element]);
            if (el) {
                (el.innerHTML = `${props.element.name} loaded`);
            }

            // Clearing aria-live region so loaded node alerts no longer appear in DOM
            setTimeout(() => {
                if (el) {
                    (el.innerHTML = "");
                }
            }, 5000);
        }
    };

    console.log(document.getElementById('naics-treeview'));

    return (
        <>
            <div>
                <input type="text" onChange={(e) => setSearchString(e.target.value)} value={searchString} placeholder="Search filters..." />
                <button onClick={() => setSearchString("")}>Clear</button>
                <div
                    className="visually-hidden"
                    ref={loadedAlertElement}
                    role="alert"
                    aria-live="polite" />
                <div className="checkbox">
                    <TreeView
                        id="naics-treeview"
                        data={data}
                        style={{ listStyle: "none", listStyleType: "none" }}
                        aria-label="Checkbox tree"
                        onLoadData={wrappedOnLoadData}
                        multiSelect
                        propagateSelect
                        togglableSelect
                        propagateSelectUpwards
                        // selectedIds={searchString.length >= 2? getAllInstancesOfKey(data, 'id') : []}
                        // expandedIds={searchString.length >= 2 ? getAllInstancesOfKey(data, 'id') : []}
                        nodeRenderer={({
                            element,
                            isBranch,
                            isExpanded,
                            isSelected,
                            isHalfSelected,
                            getNodeProps,
                            level,
                            handleSelect,
                            handleExpand,
                            treeState
                        }) => {
                            setSelectedIds(treeState.selectedIds);
                            const branchNode = (isExpanded, element) => (isExpanded && element.children.length === 0 ? (
                                <>
                                    <span
                                        role="alert"
                                        aria-live="assertive"
                                        className="visually-hidden">
                    loading {element.name}
                                    </span>
                                    <AiOutlineLoading
                                        aria-hidden
                                        className="loading-icon" />
                                </>
                            ) : (
                                <ArrowIcon isOpen={isExpanded} />
                            ));
                            return (
                                <div
                                    {...getNodeProps({ onClick: handleExpand })}
                                    style={{
                                        marginLeft: 40 * (level - 1),
                                        padding: "1rem 0"
                                    }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <CheckBoxIcon
                                            className="checkbox-icon"
                                            onClick={(e) => {
                                                handleSelect(e);
                                                e.stopPropagation();
                                            }}
                                            variant={
                                                isHalfSelected ? "some" : isSelected ? "all" : "none"
                                            } />
                                        <div>
                                            <span className="name">{element.id} - {element.name} </span>
                                            <div style={{ fontStyle: "italic" }}>{element.metadata.count > 0 && `${element.metadata?.count} codes`}</div>
                                        </div>
                                        <div>
                                            {isBranch && branchNode(isExpanded, element)}
                                        </div>
                                    </div>
                                </div>
                            );
                        }} />
                </div>
            </div>
        </>
    );
};

const ArrowIcon = ({ isOpen, className }) => {
    const baseClass = "arrow";
    const classes = cx(
        baseClass,
        { [`${baseClass}--closed`]: !isOpen },
        { [`${baseClass}--open`]: isOpen },
        className
    );
    return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
    switch (variant) {
        case "all":
            return <FaCheckSquare {...rest} />;
        case "none":
            return <FaSquare {...rest} />;
        case "some":
            return <FaMinusSquare {...rest} />;
        default:
            return null;
    }
};

export default TempPage;
