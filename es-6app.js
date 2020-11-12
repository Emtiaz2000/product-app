class Profile {
    constructor(id, name, email, profession) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profession = profession;
    }
}
class UI {


    //add new tr
    addProfile({
        id,
        name,
        email,
        profession
    }) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="text text-center">${name}</td>
        <td class="text text-center">${email}</td>
        <td class="text text-center">${profession}</td>
        <input type="hidden" data-id="${id}">
        <td><i class="fas fa-trash" id="trash"></i></td>`
        document.querySelector('#addProfile').appendChild(tr)
        document.querySelector('#Name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#profession').value = '';

    }
    //alert massage after add profile
    alerting(msg, className) {
        const container = document.querySelector('.container')
        const form = document.querySelector("form");
        const div = document.createElement('div');
        div.className = `alert alert-${className} text-center`;
        div.textContent = `${msg}`
        container.insertBefore(div, form);
        setTimeout(() => {
            div.remove()
        }, 3000)
    }

    getId() {
        return document.querySelectorAll('tr').length;
    } 

}

class Store {
    static addToLocalstorage(profile) {
        let profiles;
        if (localStorage.getItem('profiles') === null) {
            profiles = [];
        } else {
            profiles = JSON.parse(localStorage.getItem('profiles'));
        }
        profiles.push(profile)
        localStorage.setItem('profiles', JSON.stringify(profiles))
    }


//get profile in localstorage
    static getProfile() {
        let profiles;
        if (localStorage.getItem('profiles') === null) {
            profiles = []
        } else {
            profiles = JSON.parse(localStorage.getItem('profiles'));
        }
        return profiles;
    }

    static displayingToUi() {
        const profiles = Store.getProfile();
        profiles.forEach(element => {
            const ui = new UI();
            ui.addProfile(element);

        });
    }
    //delete from local storage
    static DeleteProfile(id){
        const profiles = Store.getProfile();
        profiles.forEach((element,index) => {
            if(element.id === id){
                profiles.splice(index,1)
            }
            localStorage.setItem('profiles',JSON.stringify(profiles))
        })
    }
}


window.addEventListener('DOMContentLoaded', Store.displayingToUi)

//check and add profile after submit
document.querySelector('#button').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.querySelector('#Name').value;
    const email = document.querySelector('#email').value;
    const profession = document.querySelector('#profession').value;
    const ui = new UI();
    if (name === '' || email === '' || profession === "") {
        ui.alerting('please fill the input', 'danger')
    } else {
        const id = ui.getId();
        const profile = new Profile(id, name, email, profession);
        ui.addProfile(profile);
        Store.addToLocalstorage(profile);
        ui.alerting('profile added successfully', 'success')
    }


})

//deleting profile
document.querySelector("#addProfile").addEventListener('click', (e) => {
    //console.log(e.target)
    const ui = new UI()
    const id =Number(e.target.parentElement.previousElementSibling.dataset.id);
    //console.log(id)
    Store.DeleteProfile(id);
    if (e.target.id === "trash") {
        e.target.parentElement.parentElement.remove();
        ui.alerting('profile deleted successfully', 'success')
    }
})