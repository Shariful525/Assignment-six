const loadNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showNews(data.data.news_category));
}

const showNews = (allNews) => {
    
    const newsContainer = document.getElementById('news-section');

    allNews.forEach(news => {
        
        
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-category');
        newsDiv.innerHTML = `
        <button onclick="newsByCategories('${news.category_id}')" style="border: none; background: transparent;" class="text-decoration-none text-dark">${news.category_name}</button>
        `;
        newsContainer.appendChild(newsDiv)
    })

}


const newsByCategories = (categoryId = '08') => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;

        fetch(url)
        .then(res => res.json())
        .then(data => displayNewsByCategory(data.data))
    
}


const displayNewsByCategory = (data) => {
    const allNewsContainer = document.getElementById('all-news-container');
    allNewsContainer.style.marginTop = '100px';

    allNewsContainer.innerHTML = ``;

    const noNews = document.getElementById('no-news');

    if (data.length === 0) {
        noNews.classList.remove('d-none');
    }

    else {
        noNews.classList.add('d-none');
    }


    data.forEach(breakNews => {
console.log(breakNews);
        const newsDetails = breakNews.details;


        const shortDetails = newsDetails.slice(0, 200);
        const publishDate = breakNews.author.published_date;
        const shortDate = publishDate.slice(0, 10);

        const breakingNewsDiv = document.createElement('div');

        breakingNewsDiv.classList.add('break-news-div');
        breakingNewsDiv.innerHTML = `
                    <div class="card mb-3 my-5" style="max-width: 90%;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                 <img src="${breakNews.image_url}" class="img-fluid rounded-start" alt="author-img">
                             </div>
                    <div class="col-md-8">
                        <div class="card-body">
                                    <h5 class="card-title">${breakNews.title}</h5>
                                    <p class="card-text" id="news-detail">${shortDetails}</p>

                            <div class="d-flex align-items-center justify-content-between mt-5">
                                        <div class="author">
                                            <img style="width: 40px; height: 40px; border-radius: 155px" src="${breakNews.author.img}" alt="">
                                            <small style="font-size: 16px; font-weight: 400px;">${breakNews.author.name}</small>
                                            <br>
                                            <span class="text-primary ms-5">${shortDate}</span>
                                        </div>


                                        <div class="total-views ms-5">
                                            <i class="fa-solid fa-eye"></i>
                                            <span class="ms-2">${breakNews.total_view}</span>
                                        
                                        </div>

                                        <div class="ratings">
                                            <span>${breakNews.rating.number}</span>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star-half-stroke"></i>
                                            
                                        </div>

                                 </div>
                            </div>
                    </div>
                    </div>
                    </div>
        `;

        allNewsContainer.appendChild(breakingNewsDiv);
    }) 
}


newsByCategories();

loadNews();