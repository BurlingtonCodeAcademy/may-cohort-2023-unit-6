const vehicles = document.getElementById('display-vehicles');

const displayVehicles = (obj) => {
    //Display Cards
    console.log(obj)

    obj.results.map((v, i) => {
        // Create Elements
        const card = document.createElement('div');
        const make = document.createElement('h2');
        const model = document.createElement('h3');
        const year = document.createElement('h5');
        const tasks = document.createElement('p');

        // Assign
        card.id = `${v._id}`;
        card.className = "card";
        card.style = `
            color: ${
                v.color === "white" ? "black" : "white"
            };
            margin: .5em;
            padding: .5em;
            text-align: center;
            background-color: ${v.color};
            border: black solid 5px;
        `;
        make.textContent = v.make;
        model.textContent = v.model;
        year.textContent = v.year;
        tasks.textContent = `Tasks: ${v.tasks.length}`;

        // Attach
        card.appendChild(make);
        card.appendChild(model);
        card.appendChild(year);
        card.appendChild(tasks);
        vehicles.appendChild(card);

    })

}

const getData = async () => {
    //Fetch
    const res = await fetch('/vehicle');
    const data = await res.json();
    const info = data;

    displayVehicles(info)

}

getData();