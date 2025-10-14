/**
 * ArticleList.jsx
 * Created by Andrea Blackwell 9/15/25
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { FlexGridRow, FlexGridCol, Picker } from "data-transparency-ui";
import ArticleCard from '../articleCard/ArticleCard';

const propTypes = {
    articles: PropTypes.array
};

const ArticleList = ({ articles }) => {
    const [sortOrder, setSortOrder] = useState();
    const [articleList, setArticleList] = useState(articles);
    const originalArticleList = articles;
    const prevSortRef = useRef();

    useEffect(() => {
        setSortOrder("Newest");
    }, []);

    useEffect(() => {
        const tmpArticles = [...originalArticleList];
        if (prevSortRef.current === sortOrder) {
            return;
        }

        prevSortRef.current = sortOrder;
        if (sortOrder === "Newest") {
            tmpArticles.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        }


        if (sortOrder === "Oldest") {
            tmpArticles.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        }

        setArticleList(tmpArticles);
    }, [originalArticleList, sortOrder]);

    const sortBy = () => {
        const tmpArticles = [...originalArticleList];
        tmpArticles.sort((a, b) => b.value > a.value);
    };

    return (
        <section className="list-of-articles__section">
            <div className="grid-content">
                <FlexGridRow className="list-of-articles__sort">
                    <FlexGridCol width={12} className="article-sort">
                        <div className="article-sort-label">Sort By: </div>
                        <Picker
                            className="article-sort-list"
                            sortFn={sortBy}
                            options={[{
                                name: 'Newest',
                                value: '0',
                                onClick: () => {
                                    setSortOrder("Newest");
                                }
                            },
                            {
                                name: 'Oldest',
                                value: 1,
                                onClick: () => {
                                    setSortOrder("Oldest");
                                }
                            }]}
                            dropdownDirection="right"
                            backgroundColor="#ffffff"
                            selectedOption={sortOrder} />
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow hasGutter gutterSize="lg">
                    {articleList.map((article) => (
                        <FlexGridCol
                            desktopxl={3}
                            desktop={3}
                            tablet={6}
                            mobile={12}
                            className="list-of-articles__article">
                            <ArticleCard
                                onKeyUp={(e) => {
                                    e.persist();
                                }}
                                tabIndex="0"
                                title={article.title}
                                description={article.description}
                                thumbnailUrl={article.thumbnail_path}
                                fill={article.fill}
                                publishedAt={article.publishedAt}
                                onClick={(e) => {
                                    e.persist();
                                }} />
                        </FlexGridCol>))
                    }
                </FlexGridRow>
            </div>
        </section>);
};

ArticleList.propTypes = propTypes;
export default ArticleList;

