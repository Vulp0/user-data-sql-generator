import './App.css';
import './normalize.css';
import NameInput from './NameInput';
import DataInput from './DataInput';

let Textbox: HTMLTextAreaElement | null;
let resultQuery: string;
let url: string;
let userData: any;

let TableNameInput: HTMLInputElement | null;

let columnNamesInput: NodeListOf<HTMLInputElement> | null;
let columnNames: string[] = [];
let columnDataInput: NodeListOf<HTMLSelectElement> | null;
let columnData: string[] = [];

let resultAmount: HTMLInputElement | null;
let minAmount = 1;
let maxAmount = 40;


function process() {
  Textbox = document.querySelector("textarea");
  TableNameInput = document.querySelector(".TableNameInput");

  columnNamesInput = document.querySelectorAll(".TextInput");
  columnDataInput = document.querySelectorAll(".SelectInput");
  resultAmount = document.querySelector(".ResultAmountInput");
  //clear them just in case
  columnNames = [];
  columnData = [];
  resultQuery = "INSERT INTO ";

  //get values from left column
  if(columnNamesInput) {
    columnNamesInput.forEach((elem) => {
      if(elem.value) {
        columnNames.push(elem.value);
      }
    });
  }

  //get values from right column
  if(columnDataInput) {
    columnDataInput.forEach((elem) => {
      if(elem.value) {
        columnData.push(elem.value);
      }
    });
  }


  //check if the inputs are empty
  if(checkInputs()) {
    buildQuery();
  } else {
    resultQuery = "ERROR: Either not enough inputs (min. 1 per column) or unbalanced inputs (eg. 2 on left, 1 on right)";
    displayQuery();
  }
}

async function callSaul() {
  userData = [];
  url = "https://randomuser.me/api/?results=1&inc=name,location,city,state,country,postcode,timezone,email,login,dob,phone,cell&noinfo";

  if(resultAmount) {
    url = url.replace("1", resultAmount.value);
  }

  let res = await fetch(url);
  let data = (await res.json()).results;

  // console.log(data); //this is for testing
  data.forEach((currentUser: any) => {
    let arr: string | number [] = [];
    
    columnData.forEach((propName) => {
      switch(propName) {
        case "firstName":
          arr.push(currentUser.name.first);
        break;
        case "lastName":
          arr.push(currentUser.name.last);
        break;
        case "streetNumber":
          arr.push(currentUser.location.street.number);
        break;
        case "streetName":
          arr.push(currentUser.location.street.name);
        break;
        case "city":
          arr.push(currentUser.location.city);
        break;
        case "state":
          arr.push(currentUser.location.state);
        break;
        case "country":
          arr.push(currentUser.location.country);
        break;
        case "postCode":
          arr.push(currentUser.location.postcode);
        break;
        case "timezoneOffset":
          arr.push(currentUser.location.timezone.offset);
        break;
        case "email":
          arr.push(currentUser.email);
        break;
        case "username":
          arr.push(currentUser.login.username);
        break;
        case "password":
          arr.push(currentUser.login.password);
        break;
        case "birthDate":
          arr.push(currentUser.dob.date);
        break;
        case "age":
          arr.push(currentUser.dob.age);
        break;
        case "phone":
          arr.push(currentUser.phone);
        break;
        case "cell":
          arr.push(currentUser.cell);
        break;
        default:
        break;
      }
    });

    userData.push(arr);
  });

  resultQuery += "VALUES ";

  for(let i = 0; i < userData.length - 1; i++) {
    resultQuery += ` (${userData[i]}),\n\t\t`;
  }
  
  resultQuery += ` (${userData[userData.length - 1]})`;

  displayQuery();
};

function checkInputs(): boolean {
  if(resultAmount) {
    if(parseInt(resultAmount.value) < minAmount) {
      resultAmount.value = minAmount.toString();
    }
    if(parseInt(resultAmount.value) > maxAmount) {
      resultAmount.value = maxAmount.toString();
    }
  }

  //inputs must be greater than 0, and also have the same number of arguments
  return ( (columnNames.length > 0 && columnData.length > 0) && columnNames.length == columnData.length );
}

function buildQuery() {
  if(TableNameInput) {
    if(TableNameInput.value) {
      resultQuery += TableNameInput.value + " (";
    } else {
      resultQuery += "my_table (";
    }
  }

  resultQuery += columnNames + ")\n\t";

  callSaul();
}

function displayQuery() {
  //display result in the textarea
  if(Textbox) {
    Textbox.value = resultQuery;
  }
}

function copyToClipboard(): void{
  let CopyButton: HTMLButtonElement | null = document.querySelector(".CopyButton");

  Textbox = document.querySelector("textarea");
  Textbox?.select();
  Textbox?.setSelectionRange(0, 99999999);

  let text: string = Textbox?.value as string;

  navigator.clipboard.writeText(text);
 
  if(CopyButton) {
    CopyButton.textContent = "Text has been copied";
    setTimeout(() => {
      CopyButton.textContent = "Copy query";
    }, 3000);
  }
}

function App() {

  return (
    <>
    <div className='TitleBar'>
      <h1>Random data generator 1.0</h1>
    </div>

    <div className='InputContainer'>
      <div className='TableInputContainer'>
        <input className='TableNameInput' type="text" placeholder='Your table name here '/>
      </div>

      <div className='DataInputContainer'>
        <div className='ColumnNames'>
          <NameInput name='one'/>
          <NameInput name='two'/>
          <NameInput name='three'/>
          <NameInput name='four'/>
          <NameInput name='five'/>
          <NameInput name='six'/>
          <NameInput name='seven'/>
          <NameInput name='eight'/>
          <NameInput name='nine'/>
          <NameInput name='ten'/>
          <NameInput name='eleven'/>
          <NameInput name='twelve'/>
          <NameInput name='thirteen'/>
          <NameInput name='fourteen'/>
          <NameInput name='fifteen'/>
          <NameInput name='sixteen'/>
        </div>
        <div className='ColumnData'>
          <DataInput name='one' />
          <DataInput name='two' />
          <DataInput name='three' />
          <DataInput name='four' />
          <DataInput name='five' />
          <DataInput name='six' />
          <DataInput name='seven'/>
          <DataInput name='eight'/>
          <DataInput name='nine'/>
          <DataInput name='ten'/>
          <DataInput name='eleven'/>
          <DataInput name='twelve'/>
          <DataInput name='thirteen'/>
          <DataInput name='fourteen'/>
          <DataInput name='fifteen'/>
          <DataInput name='sixteen'/>
        </div>
      </div>

      <div className='ResultAmountContainer'>
        <label htmlFor="resultAmount">How many results do you want? (1 - 40)</label>
        <input className='ResultAmountInput' name='resultAmount' type="number" placeholder='Number of users/results' defaultValue={1} min={1} max={40}/>
        <button onClick={process} className='TheButton'>Get query</button>
      </div>
    </div>

    <div className='OutputContainer'>
      <button onClick={copyToClipboard} className='CopyButton'>Copy query</button>
      <textarea readOnly className="ResultTextbox" value="Your query will go here"/>
    </div>
    </>
  )
}

export default App;