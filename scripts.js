const apiKey = process.env.NEWS_API_KEY;
let category = '';

let nav = document.querySelectorAll('li a')

window.addEventListener('load', function() {
    let i = 0;
    while(i < nav.length) {
        nav[i].addEventListener('click', categoryFilter)
        i++;
    }
   
})

function categoryFilter (e) {
    e.preventDefault();
    category = e.target.className + '';
    
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;
    console.log(url)
    fetchNews(url)
}


async function fetchNews(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles)
    } catch(error) {
        console.log(`Site cannot be reached`, error)
    }
}

function displayNews (news) {
    let i = 0;
    let articles = news;
    let articleDisplay = document.querySelector('#news');

    while(articleDisplay.lastChild) {
        articleDisplay.removeChild(articleDisplay.lastChild)
    }
    while(i < articles.length) {
        if (articles[i].description === null || articles[i].urlToImage === null || articles[i].title === '[Removed]') {
            i++;
            continue;
        }
        let container = document.createElement('article');
        container.className = 'articleContainer';

        let articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        // create a div for the article headlines and description
       
        let h1 = document.createElement('h1');
        h1.className = "articleHeadline";
        let a = document.createElement('a');
        a.className = "articleLink"
        a.href = articles[i].url;
        a.target = "_blank"
        a.innerHTML = articles[i].title;
        h1.appendChild(a)
        
        // Creates a h1 that has text wrapped in an anchor

        let p = document.createElement('p');
        p.textContent = articles[i].description;

     
        let articleImgDiv = document.createElement('div');
        articleImgDiv.className = 'image';

        let img = document.createElement('img');
        img.src = articles[i].urlToImage;
        img.alt = articles[0].title;
        img.className = 'articleImg';

        articleDiv.appendChild(h1);
        articleDiv.appendChild(p);
        articleImgDiv.appendChild(img);

        container.appendChild(articleDiv);
        container.appendChild(articleImgDiv);
       
        articleDisplay.appendChild(container);
        i++;
    }
}

document.getElementById('newsBtn').addEventListener('click', fetchNews)
