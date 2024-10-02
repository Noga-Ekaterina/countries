(async function () {
   const res = await fetch("https://restcountries.com/v3.1/all")
   const data = await res.json()

   const sortedDataName= sortedArray([...data], "name", "common")
   const sortedDataRegion= sortedArray([...data], "region")

   showCountries(sortedDataName)
   filterData(sortedDataName)
   fillingSelect(sortedDataRegion)
})()

const sortedArray=(arr, sortAttr, sortAttr2) =>{
   let result = arr.sort((a, b) => {
      console.log(a)
      const textA = sortAttr2? a[sortAttr][sortAttr2].toLowerCase(): a[sortAttr].toLowerCase();
      const textB = sortAttr2? b[sortAttr][sortAttr2].toLowerCase(): b[sortAttr].toLowerCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
   });
   return result;
}

const showCountries = (data) => {
   data.forEach(country => {
      const capital = country.capital && Array.isArray(country.capital) ? country.capital[0] : "Не   console.log(data)\n данных";
      console.log(capital);
      document.querySelector("#countries").insertAdjacentHTML("beforeend", `
         <article class="card col-12 col-md-5 col-lg-3 pb-4 text-bg-light">
            <div class="w-100 ratio ratio-16x9">
               <img src="${country.flags.svg}" alt="${country.flags.alt}" style="object-fit: cover">
            </div>
            <h3 class="mb-2 mt-1">${country.name.common}</h3>
            <div><b>Population:</b> ${country.population}</div>
            <div><b>Region:</b> ${country.region}</div>
            <div><b>Capital:</b> ${capital}</div>
         </article>
     `);
   });
}


const filterData = (data) => {
   let namesResult = data.slice()
   let regionResult = data.slice()
   let result = data.slice()
   const filter = (value, parameter) => {
      switch (parameter) {
         case "name":
            namesResult = data.filter(item => item.name.common.toLowerCase().startsWith(value.toLowerCase()))
            break
         case "region":
            if (value=="all")
               regionResult=data
            else
               regionResult= data.filter(item=> item.region==value)
      }

      result=[]

      namesResult.forEach(iten=>{
         if (regionResult.includes(iten))
            result.push(iten)
      })

      document.querySelector("#countries").innerHTML = ''
      showCountries(result)
   }

   document.querySelector("#search-input").addEventListener("input", (e) => filter(e.target.value, "name"))
   document.querySelector("#search-select").addEventListener("change", (e) => filter(e.target.value, "region"))

}

const fillingSelect = (data) => {
  const options=[]
   data.forEach(country => {
      const region= country.region
      if (!options.includes(region))
         options.push(region)
   })

   options.forEach(option=>{
      document.querySelector("#search-select").innerHTML+= `<option value="${option}">${option}</option>`
   })
}