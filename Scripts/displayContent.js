function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getContent(i_path, container){
    contentPath = i_path+"/content.json";
    readTextFile(contentPath, function(text){
        contentList = JSON.parse(text);
        for (content in contentList){
            if (contentType in content) switch (content.contentType){
                case 'article':
                    if (id in content){
                        let id=content.id;
                        newArticle = document.createElement("div");
                        newArticle.className = "article";
                        newArticle.id=content.id;
                        if(title in content){
                            titleElement = document.createElement("h2");
                            titleElement.className = "article-title";
                            newArticle.appendChild(titleElement);
                        }
                        newArticleContent = document.createElement("div");
                        newArticle.className = "article-content";
                        getContent(i_path+"/"+id,newArticleContent);
                        newArticle.appendChild(newArticleContent);
                        container.appendChild(newArticle);
                    }
                    break;
                case 'chapter':
                    if (id in content){
                        let id=content.id;
                        newChapter = document.createElement("div");
                        newChapter.className = "article-chapter";
                        newChapter.id=content.id;
                        if(date in content){
                            let dateElement = document.createElement("p");
                            dateElement.className = "article-date";
                            newChapter.appendChild(dateElement);
                        }
                        if(title in content){
                            let dateElement = document.createElement("h3");
                            titleElement.className = "article-chapter-title";
                            newChapter.appendChild(titleElement);
                        }
                        let chapterPath = i_path+"/"+id+".txt";
                        readTextFile(chapterPath, function(chapterText){
                            paragraphs = chapterText.split('\n');
                            for (paragraph in paragraphs){
                                let pElement = document.createElement("p");
                                pElement.innerHTML = paragraph;
                                newChapter.appendChild(pElement);
                            }
                            container.appendChild(newChapter);
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    });
};

let path = "/Content";
let contentContainer = document.getElementById("content");

getContent(path, contentContainer);