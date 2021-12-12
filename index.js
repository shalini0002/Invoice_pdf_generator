const add = document.querySelector('.add-invoice-item');
const itemList = document.querySelector('.invoice-item-body');
const form = document.querySelector('form');
const totalAmount = document.querySelector('.total-amount');
const printPdf = document.querySelector('.print-pdf');

let count = 1;
let total = 0;

add.addEventListener('click',incrementItemList);
form.addEventListener('change',printTotal);
form.addEventListener('submit',printTotal);
printPdf.addEventListener('click',generatePDF);

function incrementItemList(){
    const ul = document.querySelector('.invoice-item-body');
    count = count+1;

    const li = document.createElement('li');
    li.setAttribute("class","invoice-item item-list");

    const divSerial = document.createElement('div');
    divSerial.setAttribute("class","serial-no");
    divSerial.textContent = count;
    li.appendChild(divSerial);

    const divName = document.createElement('div');
    divName.setAttribute("class","item-name");
    const inputName = document.createElement('input');
    inputName.setAttribute("type","text");
    inputName.setAttribute("name","product-name");
    inputName.setAttribute("class","body-input");
    inputName.setAttribute("id","product-name");
    divName.appendChild(inputName);
    li.appendChild(divName);

    const divQuantity = document.createElement('div');
    divQuantity.setAttribute("class","product-num");
    const inputQuantity = document.createElement('input');
    inputQuantity.setAttribute("type","number");
    inputQuantity.setAttribute("name","product-num");
    inputQuantity.setAttribute("class","body-input");
    inputQuantity.setAttribute("id","product-num");
    divQuantity.appendChild(inputQuantity);
    li.appendChild(divQuantity);

    const divPrice = document.createElement('div');
    divPrice.setAttribute("class","item-price");
    const inputPrice = document.createElement('input');
    inputPrice.setAttribute("type","number");
    inputPrice.setAttribute("name","product-price");
    inputPrice.setAttribute("class","body-input");
    inputPrice.setAttribute("id","product-price");
    divPrice.appendChild(inputPrice);
    li.appendChild(divPrice);

    const divAddItem = document.createElement('div');
    divAddItem.setAttribute("class","add-invoice-item");
    divAddItem.textContent = '+';
    divAddItem.addEventListener('click',incrementItemList);
    li.appendChild(divAddItem);

    // console.log(li);


    ul.appendChild(li);
    
}

// var list = document.querySelector('.invoice-item-body').getElementsByTagName('li');
// for (var i=0; i<list.length; i++) {
//     console.log(list[i].childeren[1].textContent);
// }


function printTotal(event){
    event.preventDefault();
    total = 0;

    var list = document.querySelector('.invoice-item-body').getElementsByTagName('li');
    for (var i=0; i<list.length; i++) {
        const items = list[i].children;
        const qty = items[2].children[0].value;
        const price = items[3].children[0].value;
        const result = qty*price;
        total += result;
    }
    totalAmount.innerHTML = total;
}

// function generatePDF(){
//     const element = document.querySelector(".customer-container");
//     var opt = {
//         margin: 1,
//         filename: 'myfile.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
//     };
//     html2pdf().from(element).set(opt).save();
// }

async function generatePDF() {

    //Downloading
    var downloading = document.querySelector(".customer-container");
    var doc = new jsPDF('l', 'pt','a4');

    await html2canvas(downloading, {
        //allowTaint: true,
        //useCORS: true,
        width: 900
    }).then((canvas) => {
        //Canvas (convert to PNG)
        doc.addImage(canvas.toDataURL("image/png"), 'PNG', 5, 5);
    })

    doc.save("Document.pdf");

}