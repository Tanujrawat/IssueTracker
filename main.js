function addData() {
    var description = document.getElementById("descrip").value;
    var severity = document.getElementById("severe").value;
    var assignTo = document.getElementById("assign").value;
    var id = Math.floor(Math.random() * 100000000) ;
    var newObject = { ticketId: id, description: description, severity: severity, assignTo: assignTo, phase: 'New' };

    if ((description.length == 0) || (assignTo.length == 0)) {
        alert("Please fill all fields with required data.");
    }
    else{
        ValueAdd(newObject);
    }

    document.getElementById("descrip").value = "";
    document.getElementById("assign").value = "";

}


function ValueAdd(newObject) {
    const mainDiv = document.querySelector(".divContainer")
    console.log(mainDiv);
    const card = document.createElement("div");
    card.classList = 'card';

    const newCard = document.querySelector("#newCard");
    const ticketCard = `
    <div class="text textbtn">
        <p>Issue Id: </p><span id="ticketID">${newObject.ticketId}</span>
    </div>
    <div class="btn openbtn">open</div>
    <div class="textbtn" id="status">New</div>
    <div class="textbtn" id="severityText">${newObject.description}</div>
    <div class="textbtn" id="severityText">${newObject.severity}</div>
    <div class="textbtn" id="assignedToText">${newObject.assignTo}</div>
    <div class="btn exitBtn">close</div>
    <div class="btn delBtn" id="delete">delete</div>
    <div class="btn prevbtn" id="previous">Prev</div>
    <div class="btn nextbtn" id="next">Next</div>
    `;

    card.innerHTML += ticketCard;
    newCard.appendChild(card);

    let prevBtn = card.querySelector("#previous");
    let nextBtn = card.querySelector("#next");
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline-block";

    const delBtn = card.querySelector("#delete");
    delBtn.addEventListener("click", () => {
        // Remove the card from the DOM
        card.remove();
    });

    const issueStatus = card.querySelector("#status");



    const openBtn = card.querySelector(".openbtn");
    openBtn.addEventListener("click", () => {
        // Remove the card from the DOM
        if (issueStatus.textContent == "New") {
            newCard.appendChild(card);
            prevBtn.style.display = "none";
            nextBtn.style.display = "inline-block";
        }
        else if (issueStatus.textContent == "In Development") {
            inDev.appendChild(card);
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
        }
        else if (issueStatus.textContent == "QA") {
            qa.appendChild(card);
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
        }
        else if (issueStatus.textContent == "Done") {
            done.appendChild(card);
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "none";
        }

        //card.remove();
    });

    const exitBtn = card.querySelector(".exitBtn");
    exitBtn.addEventListener("click", () => {
        const openBtn = card.querySelector(".openbtn");
        openBtn.innerHTML = `closed`;
        openBtn.style.background = "red";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    });

    nextBtn.addEventListener("click", () => {
        if (newCard.contains(card)) {
            prevBtn.style.display = "inline-block";
            issueStatus.textContent = "In Development";
            newCard.removeChild(card);
            inDev.appendChild(card);
        } else if (inDev.contains(card)) {
            issueStatus.textContent = "QA";
            inDev.removeChild(card);
            qa.appendChild(card);
        } else if (qa.contains(card)) {
            issueStatus.textContent = "Done";
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "none";

            qa.removeChild(card);
            done.appendChild(card);
        } else if (done.contains(card)) {
            prevBtn.style.display = "inline-block";
            
        }
    });

    prevBtn.addEventListener("click", () => {

        if (inDev.contains(card)) {
            prevBtn.style.display = "none";
            issueStatus.textContent = "New"
            inDev.removeChild(card);
            newCard.appendChild(card);
        } else if (qa.contains(card)) {
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
            issueStatus.textContent = "In Development"
            qa.removeChild(card);
            inDev.appendChild(card);
        } else if (done.contains(card)) {
            done.removeChild(card);
            qa.appendChild(card);
            issueStatus.textContent = "QA"
            prevBtn.style.display = "inline-block";
            nextBtn.style.display = "inline-block";
        }
    });
}
