function compute()
{
    var principal = Number(document.getElementById("principal").value);
    var rate = Number(document.getElementById("rate").value);
    var years = Number(document.getElementById("years").value);
    var interest = principal * years * rate / 100;
    var amount = principal + interest;
    var year = new Date().getFullYear() + parseInt(years);
    if (principal <= 0) {
    alert("Please enter a positive amount");
    document.getElementById("principal").focus();
    return;
    }

    if (years <= 0) {
    alert("Please enter valid years");
    document.getElementById("years").focus();
    return;
    }else {
       document.getElementById("result").innerHTML = `
        <h3>Investment Summary</h3> <br>

        <p>Principal: <mark>$${principal}</mark></p> <br>

        <p>Interest Earned: <mark>$${interest.toFixed(2)}</mark></p> <br>

        <p>Total Amount: <mark>$${amount.toFixed(2)}</mark></p> <br>

        <p>Maturity Year: <mark>${year}</mark></p>
        `;
    }
    
}

function updateRate() {
    var rateval = document.getElementById("rate").value;
    document.getElementById("rate_val").innerText = rateval;
}

function resetForm(){
    document.getElementById("principal").value = "";
    document.getElementById("years").value = "";
    document.getElementById("result").innerHTML = "";
}
        