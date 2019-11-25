const cities=[];
fetch('https://danepubliczne.imgw.pl/api/data/synop')
.then(content=>content.json())
.then(data=>cities.push(...data));

function findMatches(wordToMatch, cities) { /*znalezienie pasujących sugesti do podanej frazy*/
    return cities.filter(place =>{
        const regex= new RegExp(wordToMatch,'gi')
        return place.stacja.match(regex);

    });
}

function displayMatches() { /*wyświetlenie sugesti*/
    const matchArray= findMatches(this.value, cities);
    const html=matchArray.map(place =>{
        return `
        <li class="options"> 
        <span>${place.stacja}</span>
        <span>${place.temperatura}°C</span>
        </li>`
    }).join('');
    suggestions.innerHTML=html;
}
function DisplayInfo(info){ /*wyswietlenie informacji w boxie */
    document.querySelector('.middle').style.display="unset";
    document.getElementById("stacja").innerHTML=info.stacja;
    document.getElementById("temp").innerHTML=info.temperatura;
    document.getElementById("cisn").innerHTML=info.cisnienie;
    document.getElementById("data").innerHTML=info.data_pomiaru;
    document.getElementById("godz").innerHTML=info.godzina_pomiaru;
    document.getElementById('inp').value=info.stacja; /*uzupelnienie inputa wybraną przez nas miejscowością*/
}
function display(e){   /*wyswietlenie tabelki z danymi o pogodzie*/
    const miejscowosc=e.target.textContent;
    const x=document.getElementsByClassName("options");
    return cities.map(sa=>{
        if(sa.stacja==miejscowosc){ 
            DisplayInfo(sa); 
            
             for(let i=0; i<x.length;i++){ /*Czyszczenie sugestii*/
             document.querySelector('.suggestions').children[i].style.display='none';
              }  }
    });}
   
const searchInput= document.querySelector('.search');
const suggestions=document.querySelector('.suggestions');
const najcieplej=document.querySelector('.hottestDay');
const najzimniej=document.querySelector('.coldestDay');
searchInput.addEventListener('change',displayMatches);
searchInput.addEventListener('keyup',displayMatches);
suggestions.addEventListener('mouseup',display);
najcieplej.addEventListener('click',hottestDay);
najzimniej.addEventListener('click',coldestDay);

function hottestDay(){
    let max=-55;
   cities.map(miasta=>{
       if(miasta.temperatura>max) max=miasta.temperatura;});

   cities.map(miasta=>{
       if (miasta.temperatura==max) DisplayInfo(miasta);});
};

function coldestDay(){
    let min=55;
   cities.map(miasta=>{
       if(min>miasta.temperatura) min=Math.min(min,miasta.temperatura);});

   cities.map(miasta=>{
       if (miasta.temperatura==min) DisplayInfo(miasta);});
};