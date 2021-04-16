const searchBtn = document.getElementById('search-btn');
const carList = document.getElementById('car');
const carDetailsContent = document.querySelector('.car-details-content');
const carCloseBtn = document.getElementById('car-close-btn');

// event listeners
searchBtn.addEventListener('click', getCarList);
carList.addEventListener('click', getCarContent);
carCloseBtn.addEventListener('click', () => {
    carDetailsContent.parentElement.classList.remove('showCar');
});

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');

let VendorCode = [];
let VendorName = [];
let VehicleStatus = [];
let VehicleAirconditioned = [];
let VehicleTransamissionType = [];
let VehicleFuelType = [];
let VehicleDriveType = [];
let VehiclePassengerQuantity = [];
let VehicleBaggageQuantity = [];
let VehicleCode = [];
let VehicleCodeContext = [];
let VehicleDoorCount = [];
let VehicleMakeModel = [];
let VehiclePictureURL = [];
let TotalChargeRateTotalAmount = [];
let TotalChargeEstimatedTotalAmount = [];
let TotalChargeCurrencyCode = [];
let PickUpDate = [];
let ReturnDate = [];
let PickUpLocation = [];
let ReturnLocation = [];


// For Car List
function getCarList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch('http://www.cartrawler.com/ctabe/cars.json')
    .then(response => response.json())
    .then(data => {
        let VehVendorAvails = data[0].VehAvailRSCore.VehVendorAvails;
        let VehRentalCore = data[0].VehAvailRSCore.VehRentalCore;

        console.log(VehRentalCore["@PickUpDateTime"]);
        console.log(VehRentalCore["@ReturnDateTime"]);
        PickUpDate.push(VehRentalCore["@PickUpDateTime"])
        ReturnDate.push(VehRentalCore["@ReturnDateTime"])
        PickUpLocation.push(VehRentalCore.PickUpLocation["@Name"])
        ReturnLocation.push(VehRentalCore.ReturnLocation["@Name"])
        console.log(VehRentalCore.ReturnLocation["@Name"]);
        console.log(VehRentalCore.PickUpLocation["@Name"]);
       
        
        let html = "";

        console.log(VehVendorAvails);
        if(VehVendorAvails){
            VehVendorAvails.forEach(VehVendorAvail => {
                for (j = 0; j < VehVendorAvail.VehAvails.length; j++) {
                    VendorCode.push(VehVendorAvail.Vendor["@Code"]);
                    VendorName.push(VehVendorAvail.Vendor["@Name"]);                
                }
                VehVendorAvail.VehAvails.forEach(VehAvail => {

                    VehicleStatus.push(VehAvail["@Status"]);
                    VehicleAirconditioned.push(VehAvail.Vehicle["@AirConditionInd"]);
                    VehicleTransamissionType.push(VehAvail.Vehicle["@TransmissionType"]);
                    VehicleFuelType.push(VehAvail.Vehicle["@FuelType"]);
                    VehicleDriveType.push(VehAvail.Vehicle["@DriveType"]);
                    VehiclePassengerQuantity.push(VehAvail.Vehicle["@PassengerQuantity"]);
                    VehicleBaggageQuantity.push(VehAvail.Vehicle["@BaggageQuantity"]);
                    VehicleCode.push(VehAvail.Vehicle["@Code"]);
                    VehicleCodeContext.push(VehAvail.Vehicle["@CodeContext"]);
                    VehicleDoorCount.push(VehAvail.Vehicle["@DoorCount"]);
                    VehicleMakeModel.push(VehAvail.Vehicle.VehMakeModel["@Name"]);
                    VehiclePictureURL.push(VehAvail.Vehicle["PictureURL"]);
                    TotalChargeRateTotalAmount.push(VehAvail.TotalCharge["@RateTotalAmount"]);
                    TotalChargeEstimatedTotalAmount.push(VehAvail.TotalCharge["@EstimatedTotalAmount"]);
                    TotalChargeCurrencyCode.push(VehAvail.TotalCharge["@CurrencyCode"]);
                    

                }) });

                for (i = 0; i < VehicleStatus.length; i++) {
                    html += `
                    <div class = "car-item" id = "${i}">
                        <div class = "car-img">
                            <img src = "${VehiclePictureURL[i]}" alt = "car">
                        </div>
                        <div class = "car-name">
                            <h3>${VehicleMakeModel[i]}</h3>
                            <a href = "#" class = "car-btn">Car Details</a>
                        </div>
                    </div>
                `;
    
                  }
              
        } 

        carList.innerHTML = html;
    });
}


// get Car Content
    function getCarContent(e){
        e.preventDefault();
        if(e.target.classList.contains('car-btn')){
            let Item = e.target.parentElement.parentElement.id;
            console.log(Item);
            let html = `
                <h2 class = "car-title">${VehicleMakeModel[Item]}</h2>
                <p class = "car-category">${VehicleStatus[Item]}</p>
                <div class = "car-instruct">
                    <h3>Vendor:</h3>
                    <p>${VendorName[Item]} (Code: ${VendorCode[Item]})</p>

                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">Fuel :${VehicleFuelType[Item]}</h5>
                    </div>
                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">Vehicle Code : ${VehicleCode[Item]} (${VehicleCodeContext[Item]})</h5>
                    </div>
                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">Transmission : ${VehicleTransamissionType[Item]}</h5>
                    </div>
                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">Passenger Quantity : ${VehiclePassengerQuantity[Item]}</h5>
                    </div>
                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">AC : ${VehicleAirconditioned[Item]}</h5>
                    </div>
                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">Baggage Quantity : ${VehicleBaggageQuantity[Item]}</h5>
                    </div>
                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">Door Count : ${VehicleDoorCount[Item]}</h5>
                    </div>
                    <div class = "car-details-left" style="text-align:left;">
                    <h5 style="text-align:left;">Driver Type : ${VehicleDriveType[Item]}</h5>
                    </div>
                    <div class = "car-details-price" style="text-align:left;">
                    <h5 style="text-align:left;">Rate Total Amount: ${TotalChargeRateTotalAmount[Item]} ${TotalChargeCurrencyCode[Item]} </h5>
                    </div>
                    <div class = "car-details-price" style="text-align:left;">
                    <h5 style="text-align:left;">Estimated Total Amount: ${TotalChargeEstimatedTotalAmount[Item]} ${TotalChargeCurrencyCode[Item]} </h5>
                    </div>
                    
 

                </div>
                <div class = "car-img">
                    <img src = "${VehiclePictureURL[Item]}" alt = "">
                </div>
                
                <div class = "car-legend" style="float:;">
                    <h5 style="text-align:left;">Pickup date: ${PickUpDate[0]} </h5>
                    </div>

                <div class = "car-legend" style="float:;">
                   <h5 style="text-align:left;">Return date: ${ReturnDate[0]} </h5>
                </div>
                
                <div class = "car-legend" style="float:;">
                   <h5 style="text-align:left;">Pick Up Location: ${PickUpLocation[0]} </h5>
                </div>

                <div class = "car-legend" style="float:;">
                   <h5 style="text-align:left;">Return Location: ${ReturnLocation[0]} </h5>
                </div>
            `;
            carDetailsContent.innerHTML = html;
            carDetailsContent.parentElement.classList.add('showCar');
            
        }
    }




    



