function addData() {
    var description = document.getElementById("descrip").value;
    var severity = document.getElementById("severe").value;
    var assignTo = document.getElementById("assign").value;
    var id = Math.floor(Math.random() * 100000000) ;
    var newObject = { ticketId: id, description: description, severity: severity, assignTo: assignTo, phase: 'New' };

    ValueAdd(newObject);

    document.getElementById("descrip").value = "";
    document.getElementById("assign").value = "";

}


function ValueAdd(newObject) {
    const mainDiv = document.querySelector(".divContainer")
    console.log(mainDiv);
    const card = document.createElement("div");
    card.classList = 'card';

    const state1 = document.querySelector("#state1");
    const ticketCard = `
    <div class="text textbtn">
        <p>Issue Id: </p><span id="ticketID">${newObject.ticketId}</span>
    </div>
    <div class="btn openbtn">open</div>
    <div class="textbtn" id="status">New</div>
    <div class="textbtn" id="severityText">${newObject.description}</div>
    <div class="textbtn" id="severityText">${newObject.severity}</div>
    <div class="textbtn" id="assignedToText">${newObject.assignTo}</div>
    <div class="btn closebtn">close</div>
    <div class="btn deletebtn" id="delete">delete</div>
    <div class="btn prevbtn" id="previous">Prev</div>
    <div class="btn nextbtn" id="next">Next</div>
    `;

    card.innerHTML += ticketCard;
    state1.appendChild(card);

    let prevBtn = card.querySelector("#previous");
    let nextBtn = card.querySelector("#next");
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline-block";

    const deleteBtn = card.querySelector("#delete");
    deleteBtn.addEventListener("click", () => {
        // Remove the card from the DOM
        card.remove();
    });

    const issueStatus = card.querySelector("#status");



    const openBtn = card.querySelector(".openbtn");
    openBtn.addEventListener("click", () => {
        // Remove the card from the DOM
        if (issueStatus.textContent == "New") {
            state1.appendChild(card);
            prevBtn.style.display = "none";
            nextBtn.style.display = "inline-block";
        }
        else if (issueStatus.textContent == "In Development") {
            state2.appendChild(card);
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
        }
        else if (issueStatus.textContent == "QA") {
            state3.appendChild(card);
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
        }
        else if (issueStatus.textContent == "Done") {
            state4.appendChild(card);
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "none";
        }

        //card.remove();
    });

    const closeBtn = card.querySelector(".closebtn");
    closeBtn.addEventListener("click", () => {
        const openBtn = card.querySelector(".openbtn");
        openBtn.innerHTML = `closed`;
        openBtn.style.background = "red";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    });

    nextBtn.addEventListener("click", () => {
        if (state1.contains(card)) {
            prevBtn.style.display = "inline-block";
            issueStatus.textContent = "In Development";
            state1.removeChild(card);
            state2.appendChild(card);
        } else if (state2.contains(card)) {
            issueStatus.textContent = "QA";
            state2.removeChild(card);
            state3.appendChild(card);
        } else if (state3.contains(card)) {
            issueStatus.textContent = "Done";
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "none";

            state3.removeChild(card);
            state4.appendChild(card);
        } else if (state4.contains(card)) {
            prevBtn.style.display = "inline-block";
            
        }
    });

    prevBtn.addEventListener("click", () => {

        if (state2.contains(card)) {
            prevBtn.style.display = "none";
            issueStatus.textContent = "New"
            state2.removeChild(card);
            state1.appendChild(card);
        } else if (state3.contains(card)) {
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
            issueStatus.textContent = "In Development"
            state3.removeChild(card);
            state2.appendChild(card);
        } else if (state4.contains(card)) {
            state4.removeChild(card);
            state3.appendChild(card);
            issueStatus.textContent = "QA"
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
        }
    });
}
