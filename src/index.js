document.addEventListener('DOMContentLoaded', () => {
  getDogs();
})

const getDogs = async () => {
  const res = await fetch("http://localhost:3000/dogs")
  const dogsData = await res.json()
  dogsData.forEach(renderDog);
}

const renderDog = (dog) => {
  tbody = document.querySelector('#table-body');

  let tr = document.createElement('tr');
  
  let td1 = document.createElement('td');
  td1.innerText = dog.name;
  
  let td2 = document.createElement('td');
  td2.innerText = dog.breed;
  
  let td3 = document.createElement('td');
  td3.innerText = dog.sex;
  
  let td4 = document.createElement('td');
  
  let button = document.createElement('button');
  button.innerText = "Edit Dog";
  button.addEventListener('click', () => edit_form(dog))

  td4.appendChild(button);
  tr.append(td1,td2,td3,td4)
  tbody.append(tr)

}

const edit_form = (dog) => {
  form = document.querySelector('#dog-form')
  form.childNodes[1].value = dog.name
  form.childNodes[3].value = dog.breed
  form.childNodes[5].value = dog.sex

  form.addEventListener('submit', event => updateDog(dog, event));
}

const updateDog = (dog, event) => {

  reqPackage = {
    headers: {"Content-Type": "application/json"},
    method: "PATCH",
    body: JSON.stringify({
      name: event.target.name.value,
      breed: event.target.breed.value,
      sex: event.target.sex.value
    })
  }
  fetch(`http://localhost:3000/dogs/${dog.id}`, reqPackage)
  .then(req => req.json())
  .then(renderDog)

}
