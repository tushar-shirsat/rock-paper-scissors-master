const AppUiController = (function(){
    const htmlClassesAndIds = {
        selectItem: ".card",
        gameLobby: ".game",
        yourSelected: ".your-game-result",
        computerSelected: ".computer-game-result",
        gameStart: ".game-start",
        mainResult: '.result',
        resultTitle: ".result-title",
        resultBtn: '.btn',
        scoreId: "#my-score",
        backgroundRules: ".background-rules",
        rules :  ".rules",
        rulesBtn: ".rulesBtn",
        closeRules: ".close"
    }

    const computerPick = ['your-paper','your-scissor','your-rock'];
    let score = 0;

    return{
        htmlClassAndId: function(){
            return htmlClassesAndIds;
        },
        gameStart: function(id){
            document.querySelector(htmlClassesAndIds.gameLobby).classList.remove("show");
            document.querySelector(htmlClassesAndIds.gameStart).classList.add("game-start-show");
            let yourMarkup,coumputerMarkup,mySelected,compSelected;
            yourMarkup = `
            <div class="your-${id}">
            <div class="img"></div>
            </div>
            `
            let your = document.querySelector(htmlClassesAndIds.yourSelected);
            your.innerHTML = yourMarkup;
            mySelected = your.firstElementChild.className;

            let compRandom = Math.round(Math.random()*2);
            
            coumputerMarkup = `
            <div class="${computerPick[compRandom]}">
            <div class="img"></div>
            </div>
            `

            console.log(computerPick[compRandom]);
            setTimeout(()=>{
                   let comp = document.querySelector(htmlClassesAndIds.computerSelected);
                   let resultContent = document.querySelector(htmlClassesAndIds.resultTitle);
                   comp.innerHTML = coumputerMarkup;
                   compSelected = comp.firstElementChild.className;
                   if(mySelected === compSelected){
                    resultContent.textContent = 'match tied';
                    document.querySelector(htmlClassesAndIds.resultBtn).style.color = "hsl(229, 25%, 31%)";
                   }
                   else if((mySelected === "your-paper" && compSelected === "your-rock") || 
                           (mySelected === "your-rock" && compSelected === "your-scissor") ||
                           (mySelected === "your-scissor" && compSelected === "your-paper")
                   ){
                    resultContent.textContent = "you win";
                    document.querySelector(htmlClassesAndIds.resultBtn).style.color = "hsl(229, 25%, 31%)";
                    score++;
                    document.getElementById('my-score').textContent = score;
                }
                else{
                    resultContent.textContent = "you lose";
                    document.querySelector(htmlClassesAndIds.resultBtn).style.color = "red";
                }
            },1000)
            
            setTimeout(() => {
                document.querySelector(htmlClassesAndIds.mainResult).classList.add('show')
            }, 1500);

            document.querySelector(htmlClassesAndIds.resultBtn).addEventListener("click", () =>{
                document.querySelector(htmlClassesAndIds.mainResult).classList.remove('show')
                document.querySelector(htmlClassesAndIds.gameLobby).classList.add("show");
                document.querySelector(htmlClassesAndIds.gameStart).classList.remove("game-start-show");
                document.querySelector(htmlClassesAndIds.computerSelected).innerHTML = `<div class="start"></div>`;
            })
        }
    }
})();

const MainController = (function(AppUIctrl){
    let htmlClassesAndIds = AppUIctrl.htmlClassAndId();
    document.querySelectorAll(htmlClassesAndIds.selectItem).forEach((item) =>{
        item.addEventListener('click',(e) =>{
            let id = e.target.id;
            if(id === ""){
                id = e.target.parentNode.id
            }
            AppUIctrl.gameStart(id)
        })
    })

    document.querySelector(htmlClassesAndIds.rulesBtn).addEventListener("click",() =>{
        document.querySelector(htmlClassesAndIds.rules).classList.add('show');
        document.querySelector(htmlClassesAndIds.backgroundRules).classList.add('show');
    })
    document.querySelector(htmlClassesAndIds.closeRules).addEventListener("click",() =>{
        document.querySelector(htmlClassesAndIds.rules).classList.remove('show');
        document.querySelector(htmlClassesAndIds.backgroundRules).classList.remove('show');
    })


    return{
        initial: function(){
            document.getElementById('my-score').textContent = 0;
        }
    }
})(AppUiController);

MainController.initial();