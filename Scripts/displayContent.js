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
    let contentPath = i_path+"/content.json";
    readTextFile(contentPath, function(text){
        let contentList = JSON.parse(text);
        for (i in contentList){
            let content = contentList[i];
            if ("contentType" in content) switch (content.contentType){
                case 'article':
                    if ("id" in content){
                        let id=content.id;
                        let newArticle = document.createElement("div");
                        newArticle.className = "article";
                        newArticle.id=content.id;
                        if("title" in content){
                            titleElement = document.createElement("h2");
                            titleElement.className = "article-title";
                            titleElement.innerHTML = content.title;
                            newArticle.appendChild(titleElement);
                        }
                        let newArticleContent = document.createElement("div");
                        newArticleContent.className = "article-content";
                        getContent(i_path+"/"+id,newArticleContent);
                        newArticle.appendChild(newArticleContent);
                        container.appendChild(newArticle);
                        let newhr = document.createElement("hr");
                        container.appendChild(newhr);
                    }
                    break;
                case 'chapter':
                    if ("id" in content){
                        let id=content.id;
                        let newChapter = document.createElement("div");
                        newChapter.className = "article-chapter";
                        newChapter.id=content.id;
                        if("date" in content){
                            let dateElement = document.createElement("p");
                            dateElement.className = "article-date";
                            dateElement.innerHTML = content.date;
                            newChapter.appendChild(dateElement);
                        }
                        if("title" in content){
                            let dateElement = document.createElement("h3");
                            titleElement.className = "article-chapter-title";
                            titleElement.innerHTML = content.title;
                            newChapter.appendChild(titleElement);
                        }
                        let chapterPath = i_path+"/"+id+".txt";
                        readTextFile(chapterPath, function(chapterText){
                            paragraphs = chapterText.split('\n');
                            for (j in paragraphs){
                                let paragraph = paragraphs[j];
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