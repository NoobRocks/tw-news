import React from "react";

import styles from "./styles";
import Article from "../article";

const API_KEY = "API_KEY";
const PAGE_SIZE = 20;

class Waterfall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            pageToLoad: 0,
            nextPage: 1
        };
    }

    parseDate = dateString => {
        const matchResult = dateString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/);
        return new Date(...matchResult.slice(1));
    };

    fetchCategory = (category, page) => fetch(`https://newsapi.org/v2/top-headlines?country=tw&apiKey=${API_KEY}&category=${category}&pageSize=${PAGE_SIZE}&page=${page}`).then(res => res.ok && res.json());

    fetchAllCategories = page => {
        const categories = ["entertainment", "technology", "sports"];
        return Promise.all(categories.map(c => this.fetchCategory(c, page))).then(results => {
            const fetchedArticles = results.map((r, i) => {
                return r && r.articles.map(a => ({
                    ...a,
                    category: categories[i],
                    datePublished: this.parseDate(a.publishedAt)}
                ));
            }).filter(r => !!r).reduce((r1, r2) => r1.concat(r2), []);
            console.log("fetchedArticles.length", fetchedArticles.length)
            return fetchedArticles;
        });
    };

    loadPage = page => {
        console.log("loadPage", page);
        return this.fetchAllCategories(page).then(articles => {
            const combinedArticles = this.state.articles.concat(articles);
            combinedArticles.sort((a1, a2) => a2.datePublished.getTime() - a1.datePublished.getTime());
            this.setState({
                articles: combinedArticles,
                nextPage: articles.length > 0 ? page + 1 : page,
                pageToLoad: articles.length > 0 ? page : page - 1
            });
        });
    };

    goToNextPage = () => {
        this.setState(theState => ({pageToLoad: theState.nextPage}));
    };

    onContainerScroll = event => {
        if (event.target.scrollTop >= event.target.scrollHeight - event.target.offsetHeight) {
            console.log("scrolled to bottom");
            this.goToNextPage();
        }
    };

    componentDidMount() {
        this.goToNextPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageToLoad !== this.state.pageToLoad && this.state.pageToLoad === this.state.nextPage)
            this.loadPage(this.state.pageToLoad);
    }

    render() {
        const {articles} = this.state;
        return (
            <div style={styles.container} onScroll={this.onContainerScroll}>
                {articles.map((a, i) => {
                    return (
                        <Article {...{key: `article_${i}`, ...a}}/>
                    );
                })}
            </div>
        );
    }
}

export default Waterfall;
