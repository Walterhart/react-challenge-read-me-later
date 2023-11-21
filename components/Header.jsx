import React from "react"
import savedArticles from "../data/savedArticles"

export default function Header({stats, setArticleQueue}) {
    
    const [userInput, setUserInput] = React.useState("")
    
    function handleChange(e){
        const newInput = e.target.value
        setUserInput(newInput)
        setArticleQueue(queuedArticles.filter(article => {
            return article.title.toLowerCase().includes(newInput.toLowerCase())}))
    }
    
    return (
        <header>
            <div className="header-top-container">
                <img src="./images/icons/book-bookmark-solid.svg"/>
                <h1>Read-Me-Later</h1>
            </div>
            <div className="header-bottom-container">
                <div className="header-button-container">
                    <button className="favorites">
                        {stats.numOfFavorites}
                    </button>
                    <button className="archived">
                        {stats.numOfArchived}
                    </button>
                    <button className="trash">
                         {stats.numOfTrashed}
                    </button>
                </div>
                <div className="search-container">
                    <img src="/images/icons/search.svg"/>
                    <input value={userInput} onChange={handleChange}/>
                </div>
            </div>
        </header>
    )
}