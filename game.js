const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdown=document.querySelectorAll("#dropdown select");//yaha par hmne html m jo dropdoen banaya h usse access kiya hai

const btn=document.querySelector("button");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const msg=document.querySelector(".msg")
//  for (data  in countryList)
//  console.log(data,countryList[data])


for (let select of dropdown){     // yaha par hmne kya kiyaki ek loop chalaya h jisme hamne dropdown k anadr ki chhezo ko access kiya phir uske andar 
                                  //chalaay jaha par hm countrtylist k indexes ko access kar rhe hai
for( list in countryList)          {//  yaha par hmne countrylist k andar k indexes ko choose kiya
    let newOptions=document.createElement("option"); //ab yaha par hmne js mai hi ek naya node bana rhe hai jo ko hoge options 
    newOptions.innerText=list;      // jo bhi countrylist k indexes m hai wo hi newoptions mai dikhayi dega
    newOptions.value=list;//
    select.append(newOptions)         //phis isse hm html k select m append kar denge yahi ki last m add kar denge
    

}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target)

})

}




const updateFlag=(element)=>{
  let list=element.value;
  let countryCode=countryList[list];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img= element.parentElement.querySelector("img");
  img.src= newSrc;
}



btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value;
    if(amtVal===""||amtVal<0){
    amtVal=1;
    amount.value=1;
   
    }
     



    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmt=amtVal * rate;
    msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmt}${toCurr.value}`;
});

