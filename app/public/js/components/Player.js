class Player {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.birthdate = params.birthdate;
        this.nationality = params.nationality;
        this.teamId = params.teamId;
        this.position = params.position;
        this.number = params.number;

    }

    render() {
        const div = document.createElement('div');
        div.classList.add('playerRow');

        const name = document.createElement('p');
        name.classList.add('fs-13');
        name.innerText = this.name;

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btnContainer');


        const editBtn = document.createElement('a');
        editBtn.classList.add('editBtn');
        editBtn.setAttribute('href', `/api/players/edit/${this.id}`);
        editBtn.innerText = 'Editar';

        const form = document.createElement('form');
        form.classList.add();
        form.setAttribute('action', '/api/players');
        form.setAttribute('method', 'get');

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBtn');
        removeBtn.innerText = 'Eliminar';
        removeBtn.addEventListener('click', (e) => {
            fetch(`/api/players/remove/${this.id}`)
            .then(res => res.json())
            .then(data => console.log(data));
        });

        form.appendChild(removeBtn);

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(form);
        div.appendChild(name);
        div.appendChild(btnContainer);

        this.elem = div;
        return div;
    }
}

export default Player;