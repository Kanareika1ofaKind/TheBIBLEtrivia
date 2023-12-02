const paginationNumbers = document.getElementById("pagination-numbers");
const listContainer = document.getElementById('quiz');
const listBlocks = listContainer.querySelectorAll(".questionBlock");


const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const resultBtn = document.getElementById("resultBtn")

const paginationLimit = 3;
const blockCount = listBlocks.length;


//-- sets the page count
let pageCount = 0;


//-- sets the start and end range for array
const pageStartRange = [0]
const pageEndRange = [0]


listBlocks.forEach((item, idx) => {
    let itemCount = Math.ceil(item.querySelectorAll(".question").length / paginationLimit)

    pageCount += itemCount

    pageStartRange[idx] = pageCount - (pageStartRange[idx] || itemCount)
    pageEndRange[idx] = pageCount
})

//current page
let currentPage = 1;


const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
};

const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
};


//set current page function
const setCurrentPage = (questionSets, pageNum) => {
    currentPage = pageNum;


    handlePageButtonsStatus();


    listBlocks.forEach((blockItem, index) => {

        blockItem.classList.add("hidden")

        let items = blockItem.querySelectorAll(".question")

        items.forEach((item, idx) => {
            item.classList.add("hidden");
        })

        if (pageEndRange[index] >= pageNum && pageStartRange[index] < pageNum) {

            blockItem.classList.remove("hidden")


            let pageNo = pageNum - pageStartRange[index]

            questionareTitle.innerHTML = `${questionSets[index].title}`
            questionaireImage.src = questionSets[index].image

            const testPrivRange = (pageNo - 1) * paginationLimit
            const testCurrRange = pageNo * paginationLimit;

            items.forEach((item, idx) => {
                item.classList.add("hidden");

                if (idx >= testPrivRange && idx < testCurrRange) {
                    item.classList.remove("hidden");
                }


            })



        }
       

        
    });
};

window.addEventListener("load", () => {

    setCurrentPage(quizData, 1);

    

    prevButton.addEventListener("click", () => {
        setCurrentPage(quizData, currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(quizData, currentPage + 1);
    });

    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage(quizData, pageIndex);
            });
        }
    });
});
