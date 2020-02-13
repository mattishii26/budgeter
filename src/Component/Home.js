import React, { useState} from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBDataTable,
    MDBInput,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
} from 'mdbreact';
import { Doughnut } from 'react-chartjs-2';

function Home() {


    const colors = ["#9A6324", "#f58231", "#bfef45", "#aaffc3", "$4363d8", "#e6194B", "#3cb44b"];

    let [Salary, setSalary] = useState(5000);
    let [Housing, setHousing] = useState(0);
    let [Transportation, setTransportation] = useState(0);
    let [Food, setFood] = useState(0);
    let [Utilities, setUtilities] = useState(0);
    let [Insurance, setInsurance] = useState(0);
    let [HealthCare, setHealthCare] = useState(0);
    let [Savings, setSavings] = useState(Salary - (Housing + Transportation + Food + Utilities + Insurance + HealthCare));
    let [budgetData, setBudgetData] = useState([]);

    let types = [`Housing - $${Housing}`, `Transportation - $${Transportation}`, `Food - $${Food}`, `Utilities - $${Utilities}`, `Insurance - $${Insurance}`, `Health Care - $${HealthCare}`, `Savings - $${Salary - (Housing + Transportation + Food + Utilities + Insurance + HealthCare)}`];


    const setSalaryHandler = (newSalary) => {
        setSalary(newSalary);
        if (newSalary <= (Housing + Transportation + Food + Utilities + Insurance + HealthCare)) {
            setSavings(0);
        } else {
            setSavings(newSalary);
        }
    }
    let dataDoughnut = {
        labels: types,
        datasets: [
            {
                data:
                    [
                        Housing,
                        Transportation,
                        Food,
                        Utilities,
                        Insurance,
                        HealthCare,
                        Savings
                    ],
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }
        ]
    }
    let typesRecommended = [`Housing - 25% @ $${(Savings * 0.25).toPrecision(2)}`, `Transportation - 10% @ $${(Savings * 0.10).toPrecision(2)}`, `Food - 10% @ $${(Savings * 0.10).toPrecision(2)}`, `Utilities - 15% @ $${(Savings * 0.15).toPrecision(2)}`, `Insurance - 10% @ $${(Savings * 0.10).toPrecision(2)}`, `Health Care - 10% @ $${(Savings * 0.10).toPrecision(2)}`, `Savings - 20% @ $${(Savings * 0.20).toPrecision(2)}`];
    const dataDoughnutRecommended = {
        labels: typesRecommended,
        datasets: [
            {
                data:
                    [
                        (Savings * 0.25).toPrecision(2),
                        (Savings * 0.10).toPrecision(2),
                        (Savings * 0.10).toPrecision(2),
                        (Savings * 0.15).toPrecision(2),
                        (Savings * 0.10).toPrecision(2),
                        (Savings * 0.10).toPrecision(2),
                        (Savings * 0.20).toPrecision(2)
                    ],
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }
        ]
    }
    const data = {
        columns: [
            {
                label: 'Description',
                field: 'desc',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Amount',
                field: 'amount',
                sort: 'asc',
                width: 100
            },
        ],
        rows: budgetData
    };

    let [modal, setModal] = useState(false);
    let [desc, setDesc] = useState("");
    let [type, setType] = useState("");
    let [amount, setAmount] = useState("");
    let option = ["Housing"];

    const addHandler = () =>{
        if(!desc || !type || !amount){
            alert("Enter values");
        }else{
            setBudgetData([...budgetData,
                {
                    desc: desc,
                    type: type,
                    amount: amount
                }
            ])
            amount = parseFloat(amount).toPrecision(2);
            if(type === "Housing"){ //Housing
                setHousing(Housing + amount);
            }else if(type === "Transportation"){ //Transportation
                setTransportation(Transportation + amount);
            }else if(type === "Food"){ //Food
                setFood(Food + amount);
            }else if(type === "Utilities"){ //Utilities
                setUtilities(Utilities + amount);
            }else if(type === "Insurance"){ //Insurance
                setInsurance(Insurance + amount);
            }else if(type === "Health Care"){ //Health Care
                setHealthCare(HealthCare + amount);
            }else if(type === "Savings"){ //Savings
                setSavings(Savings + amount);
            }
            setDesc("");
            setType("");
            setAmount(0);
            setModal(!modal);
            console.log(budgetData);
        }
    }
    return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol size="6">
                    <MDBContainer>
                        <h3 className="mt-2">Your Budget</h3>
                        <Doughnut data={dataDoughnut} options={{ responsive: true }} />
                    </MDBContainer>
                </MDBCol>
                <MDBCol size="6">
                <MDBContainer>
                        <h3 className="mt-2">Recommended Budget</h3>
                        <Doughnut data={dataDoughnutRecommended} options={{ responsive: true }} />
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol size="4">
                <MDBInput label="Monthly Post Tax Salary" value={Salary} onChange={(ev) => setSalaryHandler(ev.target.value)} />
                </MDBCol>
                <MDBCol size="8">

                        <MDBRow>
                        <MDBBtn color="primary" onClick={() => {setModal(!modal)}}>
                            Add Expenditure
                        </MDBBtn>
                        </MDBRow>
                        
                        <MDBDataTable
                            striped
                            bordered
                            hover
                            data={data}
                        />
                </MDBCol>
            </MDBRow>

            <MDBModal isOpen={modal} toggle={() => setModal(!modal)}>
        <MDBModalHeader toggle={() => setModal(!modal)}>Add Expenditure</MDBModalHeader>
        <MDBModalBody>
        <form>
        <div className="grey-text">
          <MDBInput label="Type Description" icon="edit" type="text" value={desc} onChange={(ev) =>setDesc(ev.target.value)}/>
          <select className="browser-default custom-select" value={type} onChange={(ev) => setType(ev.target.value)}>
          <option>Choose your option</option>
          <option value="Housing">Housing</option>
          <option value="Transportation">Transportation</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Insurance">Insurance</option>
          <option value="Health Care">Health Care</option>
          <option value="Savings">Savings</option>
        </select>
          <MDBInput label="Amount" type="number" icon="money-bill" value={amount} onChange={(ev)=> setAmount(ev.target.value)}/>
        </div>
      </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setModal(!modal)}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={() => addHandler()}>Add</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
        </MDBContainer>
    )
}

export default Home;