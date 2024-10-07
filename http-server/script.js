const retrieveEntries = ()=>{
    let entries = localStorage.getItem("user-entries")
    if(entries){
        entries = JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
}
let userEntries = retrieveEntries();
const displayEntries = ()=>{
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry)=>{
        const nameCell = `<td class = "border px-4 py-2">${entry.name}</td>`
        const emailCell = `<td class = "border px-4 py-2">${entry.email}</td>`
        const passwordCell = `<td class = "border px-4 py-2">${entry.password}</td>`
        const dobCell = `<td class = "border px-4 py-2">${entry.dob}</td>`
        const acceptTermsCell = `<td class = "border px-4 py-2">${entry.acceptedTermsAndConditions}</td>`

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;

        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full">
                        <tr>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Email</th>
                            <th class="px-4 py-2">Password</th>
                            <th class="px-4 py-2">Dob</th>
                            <th class="px-4 py-2">Accepted terms?</th>
                        </tr>
                        ${tableEntries}
                    </table>`;


    let tableContent = document.getElementById("user-entries");
    tableContent.innerHTML = table;
}
const validateDate = ()=>{
    const dobInput = document.getElementById("dob").value;
    const dob = new Date(dobInput);
    const today = new Date();

    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()); 
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); 

    if(dob >= minDate && dob <= maxDate){
        return true;
    }
    else{
        return false;
    }

}
const setMinMAxDate = ()=>{
    const dob = document.getElementById("dob");
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()); 
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); 
    const formattedMinDate = minDate.toISOString().split('T')[0];
    const formattedMaxDate = maxDate.toISOString().split('T')[0];

    dob.setAttribute("max",formattedMaxDate);
    dob.setAttribute("min",formattedMinDate);
}
const saveUserForm = (event)=>{
    event.preventDefault();

    if(validateDate()){
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTermsAndConditions
        }

        userEntries.push(entry);

        localStorage.setItem("user-entries",JSON.stringify(userEntries));
        displayEntries();
    }
    
}


setMinMAxDate();
const userForm = document.getElementById("user_form");
userForm.addEventListener("submit",saveUserForm);
retrieveEntries();
displayEntries();