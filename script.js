const clickhere = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => NewsCategories(data.data.news_category))
        .catch(error => console.log(error))
}
const NewsCategories = (categories) => {
    const getCategory = document.getElementById('categories');
    categories.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = `
        <a onclick="clickCategory(${element.category_id})">${element.category_name ? element.category_name : 'Not Found'}</a>
        `
        getCategory.appendChild(li)
    });
}
const clickCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => loadNews(data.data))
        .catch(error => console.log(error))
    const spin = document.getElementById("spin")
    spin.classList.remove("hidden")
}
const loadNews = (newses) => {
    console.log(newses)
    spin.classList.add("hidden")
    const getNews = document.getElementById('news-container');
    getNews.innerHTML = ''
    newses.forEach(news => {
        const { author, thumbnail_url, title, details, total_view } = news;
        const div = document.createElement('div');
        div.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl');
        div.innerHTML = `
        <figure><img class="h-64 w-52" src="${thumbnail_url}" alt="Movie" /></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p class="card-p-style">${details ? details.slice(0, 100) : "no text found"}</p>

            <div class="card-actions justify-between items-center">
                <div class="flex">
                    <img class="w-9 mr-3" src="${author.img}" alt="">
                    <div>
                        <p>${author.name ? author.name : "Not Found"}</p>
                        <p>${author.published_date ? author.published_date : "not found"} </p>
                    </div>
                </div>
                <div>
                    <p><i class="fa-solid fa-eye"></i>${total_view ? total_view : "N/A"}</p>
                </div>
                <label for="my-modal-4" class="btn modal-button" onclick="getModal('${news._id}')">Watch</label>
            </div>

           

          
        `
        getNews.appendChild(div);
        // console.log(news);
    })

}

const getModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => setModal(data.data))
        .catch(error => console.log(error))
}
const setModal = modalData => {
    const modalCon = document.getElementById('modal-contain')
    modalCon.innerHTML = ""
    modalData.forEach(single => {
        console.log(single)
        const { author, thumbnail_url, title, details, total_view } = single;
        const div = document.createElement('div')
        div.classList.add("modal-box", "relative")
        div.innerHTML = `
        <label class="" for="">
                <img class="h-64 w-52" src="${thumbnail_url}" alt="Movie" />
                <h2 class="card-title">${title}</h2>
                <p>${details}</p>
                <div class="flex justify-evenly items-center">
                    <div class="flex">
                        <img class="w-9 mr-3" src="${author.img}" alt="">
                        <div>
                            <p>${author.name ? author.name : "Not Found"}</p>
                            <p>${author.published_date ? author.published_date : "not found"} </p>
                        </div>
                    </div>
                    <div>
                        <p><i class="fa-solid fa-eye"></i>${total_view ? total_view : "N/A"}</p>
                    </div>
                </div>
            </label>
        `
        modalCon.appendChild(div);
    })
}
clickhere()
clickCategory(08)