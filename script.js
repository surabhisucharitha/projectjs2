
let data = []
let cardid;

let plusbutton = document.getElementById("plus")
let popup1 = document.getElementById("popup1")
plusbutton.addEventListener("click", () =>{
    popup1.style.display = "block"
    console.log("its me");
})
let btn2 = document.getElementById("btn2")
btn2.addEventListener("click", () =>{
    popup1.style.display = "none"
    console.log("its me2");
})


console.log("data", data);
let btn1 = document.getElementById("btn1")
btn1.addEventListener("click", () =>{
    popup1.style.display = "none"
    console.log("its me");
    let mytext = document.getElementById("inp").value

    let mytodo = {
        id: new Date().getTime().toString(),
        text: mytext,
        content: []  
    }
    if(mytext){
        data.push(mytodo)
        addtask()
    }else{
        alert("please enter your destination")
    }
    document.getElementById("inp").value = ""; 
})
function rendercontent(){
    for(let i = 0; i<data.length; i++){
        const ulelement = document.getElementById(`idforcard_${data[i].id}`);
        let child = "";
        for(let j = 0; j<data[i].content.length; j++){
            let content = data[i].content[j]
            child += `<li class="${content.done ? "checked" : ""}" id="content_${content.id}" onclick="doneTask(${content.id}, ${data[i].id})">${content.contenttext}</li>`
        }
        ulelement.innerHTML = child
    }
}
let cardcontainer = document.querySelector("#card")
 let addtask = () =>{
    let child = ""
    for(let i = 0; i<data.length; i++){
        console.log(data);
       child += `<div id = "card_${data[i].id}" class="popup2">
       <p value="${data[i].text}" onclick="showcard(${data[i].id}, this.getAttribute('value'))" class="p2">${data[i].text}</p>
       <hr>
       <ul id="idforcard_${data[i].id}">
       </ul>
       <div class="container2">
       <Button class="delete" onclick="removesecondpopup(${data[i].id})">D</Button>
       <Button class="add" onclick = "thirdpopup(${data[i].id})">+</Button>
       </div>
       </div>`
       
       console.log(data[i].id);
       console.log(data[i].text);
    }
    cardcontainer.innerHTML = child
    rendercontent()
}

function removesecondpopup(id){
    let cardcontainer = document.querySelector("#card")
    let cardsid = `${id}`
    let cards = document.getElementById(cardsid)
    cards.parentNode.removeChild(cards)
    data = data.filter(item => item.id !=id)
}
function thirdpopup(id){
    let popup3 = document.getElementById("popup3")
    popup3.style.display = "block"
    cardid = id
}

function removethirdpopup(){
    let popup3 = document.getElementById("popup3")
    popup3.style.display = "none"
}

function addcontenttopopup2() {
    let contentlistid = `idforcard_${cardid}`
    let list = document.getElementById(contentlistid)
    let contenttext = document.getElementById("inp2").value
    if(!contenttext){
    alert("please add your Task");
    }else{
        
        document.getElementById("inp2").value = "";
    const linode = document.createElement("li");
    const listId=new Date().getTime().toString();
    linode.innerHTML = contenttext
    linode.id=`content_${listId}`;
    linode.onclick = function(){
        doneTask(listId,cardid)
    }
    
    list.appendChild(linode);
    removethirdpopup()
    for(let i = 0; i<data.length; i++){
        if(data[i].id == cardid){
            const content = {
                id:listId,
                contenttext: contenttext,
                done: false,
            }
            data[i].content.push(content);
        }
    }
}
}

function doneTask(listId,cardid){
            const contentId=`content_${listId}`
             const liElement=document.getElementById(contentId);
             liElement.classList.toggle("checked");
             for(let i=0;i<data.length;i++){
                            if(data[i].id==cardid){
                                for(let j=0;j<data[i].content.length;j++){
                                    const content=data[i].content[j];
                                    if(content.id==listId){
                                        data[i].content[j].done=!data[i].content[j].done;
                                    
                                    }
                                }
                            }
                        }
                
                     } 
    
    function showcard(id, value){
        const cardheading=document.getElementById('heading');
        cardheading.innerHTML=value;
        const back=document.getElementById('back');
        back.style.display='block';
        const arrow=document.getElementById('ba');
        arrow.style.display='block';
        // const topleft=document.getElementById('topleft');
        // topleft.style.display='none';
        const singlecard=document.getElementById(`card_${id}`);
        const cards=document.querySelectorAll('.popup2');
        cards.forEach((allcards) =>{
            allcards.style.display='none';
        
        });
         singlecard.style.display='block';
        
    }
    function back(){
        const cardheading=document.getElementById('heading');
        cardheading.innerHTML="";
        const back=document.getElementById('back');
        back.style.display='none';
        const arrow=document.getElementById('ba');
        arrow.style.display='none';
        // const topleft=document.getElementById('topleft');
        // topleft.style.display='block';
        const cards=document.querySelectorAll('.popup2');
        cards.forEach((allcards) =>{
            allcards.style.display='block';

        });
    }      