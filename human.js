/* Initialization of datatable */
$(document).ready(function () {
    $('#tableID').DataTable({});
});


let myFunctionCount = 0;
let myFunction1Count = 0;

function myFunction() {
    const getById = id => document.getElementById(id);
    getById("checkBox").style.display = "none";
    getById("myDIV1").style.display = "none";
    getById("checkBox1").style.display = "block";
    getById("myDIV").style.display = "block";

    myFunctionCount++;
    if (myFunctionCount > 2) {
        displayAdminMessage();
    }
}

function myFunction1() {
    const getById = id => document.getElementById(id);
    getById("checkBox").style.display = "block";
    getById("myDIV1").style.display = "block";
    getById("checkBox1").style.display = "none";
    getById("myDIV").style.display = "none";

    myFunction1Count++;
    if (myFunction1Count > 2) {
        displayAdminMessage();
    }
}

function displayAdminMessage() {
    const getById = id => document.getElementById(id);
    getById("warning-msg").style.display = "inline-block";
    getById("back-btn").style.display = "block";
    getById("myDIV1").style.display = "none";
    getById("myDIV").style.display = "none";
    getById("checkBox1").style.display = "none";
    getById("checkBox").style.display = "none";
}

function backBtn() {
    location.reload();
}

// NIC validation

var d_array = [
    { month: 'January', days: 31 },
    { month: 'February', days: 29 },
    { month: 'March', days: 31 },
    { month: 'April', days: 30 },
    { month: 'May', days: 31 },
    { month: 'June', days: 30 },
    { month: 'July', days: 31 },
    { month: 'August', days: 31 },
    { month: 'September', days: 30 },
    { month: 'October', days: 31 },
    { month: 'November', days: 30 },
    { month: 'December', days: 31 },
];

var d_monht = [
    { month: 'January', id: 1 },
    { month: 'February', id: 2 },
    { month: 'March', id: 3 },
    { month: 'April', id: 4 },
    { month: 'May', id: 5 },
    { month: 'June', id: 6 },
    { month: 'July', id: 7 },
    { month: 'August', id: 8 },
    { month: 'September', id: 9 },
    { month: 'October', id: 10 },
    { month: 'November', id: 11 },
    { month: 'December', id: 12 },
];


function nicCalc() {
    var nicNumber = $('#NIC').val();
    console.log(validation(nicNumber));

    if (validation(nicNumber)) {
        var extractedData = extractData(nicNumber);
        var days = extractedData.dayList;
        var foundData = findDayANDGender(days, d_array);

        var month = foundData.month;
        var year = extractedData.year;
        var day = foundData.day;
        var gender = foundData.gender;
        var bday = day + '-' + month + '-' + year;
        console.table('"0' + day + '"');

        document.getElementById("checkBox").style.display = "none";
        document.getElementById("warning-msg").style.display = "none";

        // Show elements
        document.getElementById("dob").style.display = "block";
        document.getElementById("gender").style.display = "block";
        document.getElementById("title").style.display = "block";
        document.getElementById("name").style.display = "block";
        document.getElementById("next-btn").style.display = "block";


        // Set selected gender in dropdown
        $('#gender_').val(gender);

        // Set day value
        document.getElementById("day").value = (day < 10) ? '0' + day : day;

        let c = d_monht.filter((x) => x.month == month);
        console.log(month, c);

        // Set month value
        document.getElementById("month").value = (c[0].id < 10) ? '0' + c[0].id : c[0].id;

        // Set year value
        document.getElementById("year").value = (year < 2000) ? '19' + year : year;

        // Display gender and birthday
        document.getElementById("gender_").value = gender;
        console.log(document.getElementById("gender_").value = gender);
        var birthday = new Date(bday.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        var birthday = getFormattedDate(birthday);
        $('.nic-birthday').html(birthday);
        $('.nic-gender').html('Gender:' + gender);

        // Clear any previous validation error message
        $('.nic-validate-error').html('');
    } else {
        // Hide elements when NIC number is invalid or empty
        document.getElementById("dob").style.display = "none";
        document.getElementById("gender").style.display = "none";
        document.getElementById("title").style.display = "none";
        document.getElementById("name").style.display = "none";
        document.getElementById("create-customer").style.display = "none";
        document.getElementById("next-btn").style.display = "none";


        // Show validation error message
        $('.nic-validate-error').html('You Entered NIC Number Is wrong');
    }
}

function validation() {
    var nicNumber = $('#NIC').val();
    var result = false;
    if (nicNumber.length === 0) {
        document.getElementById("message1").style.display = "block";
        document.getElementById("message1").innerHTML = "NIC Number is required";
        result = false;
    } else if (nicNumber.length === 10 && !isNaN(nicNumber.substr(0, 9)) && isNaN(nicNumber.substr(9, 1).toLowerCase()) && ['x', 'v'].includes(nicNumber.substr(9, 1).toLowerCase())) {
        document.getElementById("message1").style.display = "none";
        result = true;
    } else if (nicNumber.length === 12 && !isNaN(nicNumber)) {
        document.getElementById("message1").style.display = "none";
        result = true;
    } else {
        document.getElementById("message1").innerHTML = "Please Enter Valid NIC Number";
        document.getElementById("message1").style.display = "block";
        result = false;
    }
    return result;
}

function findDayANDGender(days, d_array) {
    var dayList = days;
    var month = '';
    var result = { day: '', month: '', gender: '' };

    if (dayList < 500) {
        result.gender = 'Male';
    } else {
        result.gender = 'Female';
        dayList = dayList - 500;
    }

    for (var i = 0; i < d_array.length; i++) {
        if (d_array[i]['days'] < dayList) {
            dayList = dayList - d_array[i]['days'];
        } else {
            month = d_array[i]['month'];
            break;
        }
    }
    result.day = dayList;
    result.month = month;
    return result;
}

function extractData(nicNumber) {
    var nicNumber = nicNumber;
    var result = { year: '', dayList: '', character: '' };

    if (nicNumber.length === 10) {
        result.year = nicNumber.substr(0, 2);
        result.dayList = nicNumber.substr(2, 3);
        result.character = nicNumber.substr(9, 10);
    } else if (nicNumber.length === 12) {
        result.year = nicNumber.substr(0, 4);
        result.dayList = nicNumber.substr(4, 3);
        result.character = 'no';
    }
    return result;
}

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + ' ' + month + ' ' + year;
}


function ValidatePassportNumber() {
    var passportNumber = document.getElementById("business").value;
    var lblError = document.getElementById("lblError");
    lblError.innerHTML = "";
    var expr = /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/;
    if (!expr.test(passportNumber)) {
        lblError.innerHTML = "Invalid Passport Number.";
    } else {
        // Show elements
        document.getElementById("dob").style.display = "block";
        document.getElementById("gender").style.display = "block";
        document.getElementById("title").style.display = "block";
        document.getElementById("name").style.display = "block";
        document.getElementById("next-btn").style.display = "block";
    }
}

$(document).ready(function () {
    function breakname() {
        var name = $('#fullname').val();
        var temp = name.split(" ");
        var options = "";
        var options1 = "<option value='0' selected disabled>Select First Name</option>";
        var otherNames = "";

        for (let i in temp) {
            var word = temp[i];
            options += "<option value='" + word + "'>" + word + "</option>";
            options1 += "<option value='" + word + "'>" + word + "</option>";

            if ($('#sur').val() != word && $('#first').val() != word) {
                otherNames += word + " ";
            }
        }

        document.getElementById("sur").innerHTML = options;
        document.getElementById("first").innerHTML = options1;

        $('#othername').val(otherNames.trim());
    }

    function updateOtherNames() {
        var selectedOptions = $('#sur').val() + ' ' + $('#first').val();
        var allNames = $('#fullname').val().split(" ");
        var otherNames = allNames.filter(name => !selectedOptions.includes(name)).join(" ");
        $('#othername').val(otherNames.trim());
    }

    $('#fullname').on('input', function () {
        breakname();
        updateOtherNames();
    });

    $('#sur').change(function () {
        updateOtherNames();
        var selectedVal = $(this).val();
        var firstVal = $('#first').val();
        $('#first option').show();
        $('#first').val("0"); // Reset first name dropdown to default
        $('#first option[value="0"]').prop("selected", true); // Select default option
        $('#first option[value="' + selectedVal + '"]').hide();
        if (firstVal !== "0" && firstVal !== selectedVal) {
            $('#first option[value="' + firstVal + '"]').hide();
        }
        document.getElementById("other-name").style.display = "none";
    });

    $('#first').change(function () {
        updateOtherNames();
        var selectedVal = $(this).val();
        var surVal = $('#sur').val();
        $('#sur option').show();
        document.getElementById("other-name").style.display = "block";
        document.getElementById("next-btn-two").style.display = "block";
    });

    function showCreatebtn() {
        var dobFilled = $('#day').val() && $('#month').val() && $('#year').val();
        var genderFilled = $('#gender_').val() !== '0';
        var titleFilled = $('#modId').val() !== '0';
        var fullnameFilled = $('#fullname').val();
        document.getElementById("fullname").disabled = true;

        if (dobFilled && genderFilled && titleFilled && fullnameFilled) {
            var elements = ["next-btn", "surname", "first-name", "dob", "gender", "title", "myDIV1", "modId", "back_btn"];

            elements.forEach(function (id) {
                document.getElementById(id).style.display = (["next-btn", "dob", "gender", "title", "myDIV1", "modId"].includes(id)) ? "none" : "block";
            });




            document.getElementById("required-fields-message").style.display = "none";
        } else {
            document.getElementById("required-fields-message").style.display = "block";
        }
    }


    $('#next-btn').click(function () {
        showCreatebtn();
    });

    breakname();
});

(function () {
    let year_satart = 1940;
    let year_end = (new Date).getFullYear(); // current year
    // let year_selected = 1992;

    let option = '';
    option = '<option>Year</option>'; // first option

    for (let i = year_satart; i <= year_end; i++) {
        // let selected = (i === year_selected ? ' selected' : '');
        option += '<option value="' + i + '"' + '>' + i + '</option>';
    }

    document.getElementById("year").innerHTML = option;
})();


(function () {
    let day_selected = (new Date).getDate(); // current day
    let option = '';
    option = '<option>Day</option>'; // first option

    for (let i = 1; i < 32; i++) {
        // value day number with 0. 01 02 03 04..
        let day = (i <= 9) ? '0' + i : i;

        // or value day number 1 2 3 4..
        // let day = i;

        // let selected = (i === day_selected ? ' selected' : '');
        option += '<option value="' + day + '"' + '>' + day + '</option>';
    }
    document.getElementById("day").innerHTML = option;
})();

(function () {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month_selected = (new Date).getMonth(); // current month
    var option = '';
    option = '<option>Month</option>'; // first option

    for (let i = 0; i < months.length; i++) {
        let month_number = (i + 1);

        // value month number with 0. [01 02 03 04..]
        let month = (month_number <= 9) ? '0' + month_number : month_number;

        // or value month number. [1 2 3 4..]
        // let month = month_number;

        // or value month names. [January February]
        // let month = months[i];

        // let selected = (i === month_selected ? ' selected' : '');
        option += '<option value="' + month + '"' + '>' + months[i] + '</option>';
    }
    document.getElementById("month").innerHTML = option;
})();

window.onload = function () {
    // Function to clear form data
    function clearForm() {
        // Loop through all form elements
        document.querySelectorAll('input, textarea, select').forEach(function (element) {
            // Clear the value of each element
            element.value = '';
        });
    }

    // Call clearForm function when the page is refreshed
    window.onbeforeunload = clearForm;
};


function enableDisabledFields() {
    // Enable the disabled fields
    document.getElementById("gender_").disabled = false;
    document.getElementById("fullname").disabled = false;
    document.getElementById("othername").disabled = false;
    document.getElementById("year").disabled = false;
    document.getElementById("month").disabled = false;
    document.getElementById("day").disabled = false;
}

// Add event listener to the form submission
document.getElementById("humanForm").addEventListener("submit", function () {
    // Before form submission, enable disabled fields
    enableDisabledFields();
});

function validateName() {
    var surValue = document.getElementById("sur").value;
    var firstValue = document.getElementById("first").value;

    if (surValue.trim() === "" || firstValue.trim() === "") {
        alert("Please fill in both Surname and First Name fields.");
        return false;
    }
    return true;
}

function toggleDisplay() {
    const elementsToHide = ["first-name", "surname", "back_btn", "other-name", "create-customer"];
    const elementsToShow = ["modId", "myDIV1", "dob", "gender", "title", "next-btn"];

    elementsToHide.forEach(id => document.getElementById(id).style.display = "none");
    elementsToShow.forEach(id => document.getElementById(id).style.display = "block");
}

document.getElementById('province').addEventListener('change', function () {
    var selectedProvince = this.value;
    var districtMain = document.getElementById('district_main');

    // If a province is selected, display the district select
    if (selectedProvince !== '') {
        districtMain.style.display = 'block';
        document.getElementById('skip_btn').style.display = 'none';
        document.getElementById('create-customer').style.display = 'block';
    } else {
        // Otherwise, hide the district select
        districtMain.style.display = 'none';
    }
});

document.getElementById('district').addEventListener('change', function () {
    var selectedDistrict = this.value;
    var gndivisionMain = document.getElementById('gndivision_main');

    // If a district is selected, display the GN Division select
    if (selectedDistrict !== '') {
        gndivisionMain.style.display = 'block';
    } else {
        // Otherwise, hide the GN Division select
        gndivisionMain.style.display = 'none';
    }
});

document.getElementById('gndivision').addEventListener('change', function () {
    var selectedGNDivision = this.value;
    var addressOne = document.getElementById('address_one');
    var addressTwo = document.getElementById('address_two');

    // If a GN Division is selected, display the Address Line fields
    if (selectedGNDivision !== '') {
        addressOne.style.display = 'block';
        addressTwo.style.display = 'block';
    } else {
        // Otherwise, hide the Address Line fields
        addressOne.style.display = 'none';
        addressTwo.style.display = 'none';
    }
});

document.getElementById('next-btn-two').addEventListener('click', function () {
    // Show the Province select option and buttons
    document.getElementById('province_main').style.display = 'block';
    document.getElementById('skip_btn').style.display = 'block';
    document.getElementById('next-btn-two').style.display = 'none';
    document.getElementById('name').style.display = 'none';
    document.getElementById('surname').style.display = 'none';
    document.getElementById('first-name').style.display = 'none';
    document.getElementById('other-name').style.display = 'none';
});

function skip() {
    console.log("hi");
    document.getElementById('create-customer').style.display = 'block';
    document.getElementById('province_main').style.display = 'none';
    document.getElementById('skip_btn').style.display = 'none';
}

$(document).ready(function() {
    $('#sur')?.select2({
        placeholder: 'Select Grade',
        allowClear: true,
        dropdownCssClass: 'custom-dropdown'
    });
});