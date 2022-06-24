//Model
function GetData() {
    const name_file = document.getElementById('img').value
    const description = document.getElementById('desc_input').value
    const value_view = document.getElementById('valor_exibindo').value = 0

    if (!name_file || !description){
        MessageError('Preencha o formulario para continuar!')
    }else {
        Register(name_file,description)
        getItems()
        MessageSuccess('Dados Cadastrados com sucesso!')
    }
}

function MessageSuccess(message_text) {
    const conatiner_success = document.querySelector('#message_success')
    const message = document.createElement('h3')
    if (message_text){
        message.innerHTML = `${message_text}`
        message.style.cssText = `
        color: #4BB543;
        font-size: 20px;
        font-weight: 600;
        `
        conatiner_success.appendChild(message)
    }else{
        conatiner_success.remove()
    }
}

function MessageError(message_text) {
    const conatiner_error = document.querySelector('#message_error')
    const message = document.createElement('h3')
    if (message_text){
        message.innerHTML = `${message_text}`
        message.style.cssText = `
        color: red;
        font-size: 20px;
        font-weight: 600;
        `
        conatiner_error.appendChild(message)
    }
    else {
        conatiner_error.remove();
    }
}

async function Register(name,description){
    const files = {
        name,
        description
    }
    var obj = JSON.parse(localStorage.getItem('@files'))
    if (!obj){
        localStorage.setItem('@files',JSON.stringify([files]))   
    }
    await localStorage.setItem(
        '@files',
        // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
        JSON.stringify([
        ...JSON.parse(await localStorage.getItem('@files')),
        files
        ])
    ); 
    renderItem(files)
}

function SubmitFunction(event) {
    event.preventDefault();
    GetData()
    getItems();
}


//View
function renderItem(item) {
    const conatiner = document.querySelector('#view_form')
    const img = document.createElement('img')
    img.src = item.name.replace('C:\\fakepath\\', './assets/')
    img.width = 200
    img.height = 210
    img.style.cssText = `
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 200px;
    margin-top: 8px;
    padding: 1rem 1.5rem;
    border-radius: 8px 8px 0px 0px;
    max-height: 468px;
    box-shadow: 0px 4px 8px rgb(133, 130, 130);;
    `
    conatiner.appendChild(img)

}


function getItems() {
    // Pegando o array do localstorage

    const files = JSON.parse(localStorage.getItem('@files'))
    // Para cada item do array, é renderizado no html
    files.forEach(item => {
        if (JSON.stringify(item).length <0) {
            renderItem(item);
        }
        
    });
}
getItems();