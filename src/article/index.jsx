import React from "react";

import styles from "./styles";

class Article extends React.PureComponent {
    render() {
        const {author, datePublished, title, url, urlToImage, category} = this.props;
        return (
            <div style={styles.container}>
                <img style={styles.image} alt={title} title={title} src={urlToImage}/>
                <div style={{width: "2%", flexShrink: "0"}}/>
                <div style={styles.detailsContainer}>
                    <div>
                        <span>{"("}<i>{category}</i>{")"}</span>
                        <span>{" "}</span>
                        <span><b>{author}</b></span>
                    </div>
                    <a style={styles.postLink} href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                    <div style={styles.dateString}>{datePublished.toLocaleString()}</div>
                </div>
            </div>
        );
    }
}

export default Article;
