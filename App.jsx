import React from "react"
import { nanoid } from "nanoid"
import Header from "./components/Header"
import Article from "./components/Article"
import archivedArticles from "./data/archivedArticles"
import favoritedArticles from "./data/favoritedArticles"
import savedArticles from "./data/savedArticles"
import trashedArticles from "./data/trashedArticles"

export default function App() {
	const [articleQueue, setArticleQueue] = React.useState(savedArticles)
    
	const stats = getStats()

	const articleComponents = articleQueue.map((articleData) => {
		return <Article articleData={articleData} key={articleData.id} />
	})

	const noArticlesMessage = <p className="no-articles-message">There are no articles to show.</p>
    
    function getStats() {
		return {
			numOfFavorites: favoritedArticles.length,
			numOfArchived: archivedArticles.length,
			numOfTrashed: trashedArticles.length,
		}
	}

	function getTargetArticle(id) {
		return savedArticles.find((item) => item.id === id)
	}

	function removeFromSavedArticles(targetArticle) {
		const targetIndex = savedArticles.indexOf(targetArticle)
		savedArticles.splice(targetIndex, 1)
	}  
    
    
/*-----State Setting Functions-------------------------------------------*/
    
    function favorite(id) {
		const targetArticle = getTargetArticle(id)
		if (favoritedArticles.includes(targetArticle)) {
			const targetIndex = favoritedArticles.indexOf(targetArticle)
			favoritedArticles.splice(targetIndex, 1)
		} else {
			favoritedArticles.push(targetArticle)
		}
		setArticleQueue([...savedArticles])
	}

	function archive(id) {
		const targetArticle = getTargetArticle(id)
		removeFromSavedArticles(targetArticle)
		archivedArticles.push(targetArticle)
        setArticleQueue([...savedArticles])
	}

	function trash(id) {
		const targetArticle = getTargetArticle(id)
		removeFromSavedArticles(targetArticle)
		if (favoritedArticles.includes(targetArticle)) {
			const targetIndex = favoritedArticles.indexOf(targetArticle)
			favoritedArticles.splice(targetIndex, 1)
		}
		trashedArticles.push(targetArticle)
        setArticleQueue([...savedArticles])
	}
    
    function toggleExpand(id) {
        const targetArticle = getTargetArticle(id)
        targetArticle.expanded = !targetArticle.expanded
        setArticleQueue([...savedArticles])
    }
    
/*-------------------------------------------------------------------------*/

/* Challenge

    The four buttons for each article aren't working. Your task is to set them up as follows: 
    
        1. You should add a single onClick event handler to the "articles-container" div. No other     event handlers should be added to the project. The event handler should use the buttons' 
		   "button-type" and "article-id" data attributes to do the following: 
          
               if the button's       Then use the button's 
			   "button-type"         "article-id" data value
			   data value is: 	     to do the following:    				   
			╷---------------------╷-----------------------------╷					
		  	|      "favorite"     |	    favorite(idValue)       |
			|---------------------|-----------------------------|
			|      "archive"      |	    archive(idValue)        |
			|---------------------|-----------------------------|
			|       "trash"       |	      trash(idValue)        |
            |---------------------|-----------------------------|
			|    "toggleExpand"   |	  toggleExpand(idValue)     |	
			¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯	
			                         idValue = the value of the "article-id" data attribute. 
									 This is just for illustrative purposes — you don't have to 
									 name it this way!
			        
        2. The first three functions listed above already work and should not be changed. However, 
           the toggleExpand function (line 70) is currently broken and must be fixed. You *just* need to make a very small (but important) change to fix it! Try to identify and articulate what exactly the issue was and why your solution fixed it.  
		   
		   Answer: When the spread operator wasn't used, the code was telling the state to update with what it already had. In this type of situation, React ignores it because it doesn't perceive a difference between the previous state and the current state. When the spread operator is used, even though it has the same content, the array is considered different. React recognizes this, prompting it to update and re-render.
		   
		3. Your code for the event handler should be as concise and DRY (Don't Repeat Yourself) as 
           possible, while maintaining readability. 
		
		4. You should test the app to make sure it's working correctly. After completing the 
		   above tasks, an article should expand when you click the expand button, the heart-shaped favorite button should toggle on and off when you click it, and the article should disappear if you click the archive or trash button. The numbers at the top of the app should also reflect the number of articles you've favorited, archived, or trashed. 
		   
		Bonus Challenge: Even though the four functions listed above will work the way they're set up (after you fix the fourth one), there s something unorthodox and arguably "wrong" going on with them — something the React Documentation warns against. See if you can figure out what it is!  
		
		Answer: We are mutating state! This is one of the situations where state mutation occurs. However, this is not recommended in the React documentation
		
 */

	    const onClickHandler = (event) =>{
		const buttonType = event.target.getAttribute("data-button-type")
		const articleId = event.target.getAttribute("data-article-id")
		
		const eventHandlers = {favorite, archive, trash, toggleExpand}

		if (buttonType) {
			eventHandlers[buttonType](articleId)
		}
	}
	
	return (
		<div className="wrapper">
			<Header stats={stats} setArticleQueue={setArticleQueue} />
			<div className="articles-container" onClick={onClickHandler}>
				{articleQueue.length > 0 ? articleComponents : noArticlesMessage}
			</div>
		</div>
	)
}

