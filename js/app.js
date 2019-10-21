//Variables
var courses = document.querySelector('#courses-list');
var shoppingCartContent = document.querySelector('#cart-content tbody');
var clearCart = document.querySelector("#clear-cart");






//Listeners
loadEventListeners();

function loadEventListeners(){
    //Listener when a new course is added.
    courses.addEventListener('click', buyCourse);
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCart.addEventListener('click', clearFromCart);
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}




//Functions

function buyCourse(e){
    e.preventDefault();
  //Use delegation to find course that was added to shopping cart.  
    if(e.target.classList.contains('add-to-cart')){
        //read course values
        var course = e.target.parentElement.parentElement;
        
        //read course values
        getCourseInfo(course);
    }
};

function getCourseInfo(course){
  //Create course data object
    var courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    
    //Insert into shopping cart
    addIntoCart(courseInfo);
};

//Display selected course in shopping cart
function addIntoCart(courseInfo){
    var row = document.createElement('tr');
    
    //Build template
    row.innerHTML = `
        <tr>
            <td>
                <img src = "${courseInfo.image}" width = 100>
            </td>
            <td>
                ${courseInfo.title}
            </td>
            <td>
                ${courseInfo.price}
            </td>
            <td>
                <a href="#" class = "remove" data-id = "${courseInfo.id}">X</a>
            </td>
        </tr>
    `;
    
    shoppingCartContent.appendChild(row);
    
    //Add course to local storage
    saveIntoStorage(courseInfo);
};

//Save into storage
function saveIntoStorage(courseInfo){
    var courses = getCoursesFromStorage();
    
    //add course to the array returned.
    courses.push(courseInfo);
    
    localStorage.setItem('courses', JSON.stringify(courses));
}

//Get courses from storage
function getCoursesFromStorage(){
    var courses;
    
    if(localStorage.getItem('courses') === null){
        courses = [];
    }
    else{
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

//Remove course from dom
function removeCourse(e){     
    
    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
        
        var coursesLocalStorage = getCoursesFromStorage();
    
    coursesLocalStorage.forEach(function(courseLS, index){
        var courseParent = e.target.parentElement.parentElement;
        console.log(courseParent.querySelector('a').getAttribute('data-id'));
       if(courseLS.id === courseParent.querySelector('a').getAttribute('data-id')){
           coursesLocalStorage.splice(index, 1);
       } 
    });
    
    localStorage.setItem('courses', JSON.stringify(coursesLocalStorage));
    }   
}

//Clear cart
function clearFromCart(){
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    
    //clear from localstorage
    localStorage.clear();
}

//Get courses from storage and print into cart
function getFromLocalStorage(){
    var coursesLocalStorage = getCoursesFromStorage();
    
    coursesLocalStorage.forEach(function(courseLS){
        var row = document.createElement('tr');
    
    //Build template
    row.innerHTML = `
        <tr>
            <td>
                <img src = "${courseLS.image}" width = 100>
            </td>
            <td>
                ${courseLS.title}
            </td>
            <td>
                ${courseLS.price}
            </td>
            <td>
                <a href="#" class = "remove" data-id = "${courseLS.id}">X</a>
            </td>
        </tr>
    `;
    
    shoppingCartContent.appendChild(row);
    });
    
}