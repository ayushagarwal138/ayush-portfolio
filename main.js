var audio=document.getElementById("audioPlayer"),loader=document.getElementById("preloader");function settingtoggle(){document.getElementById("setting-container").classList.toggle("settingactivate"),document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow"),document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow")}function playpause(){!1==document.getElementById("switchforsound").checked?audio.pause():audio.play()}function visualmode(){document.body.classList.toggle("light-mode"),document.querySelectorAll(".needtobeinvert").forEach(function(e){e.classList.toggle("invertapplied")})}window.addEventListener("load",function(){loader.style.display="none",document.querySelector(".hey").classList.add("popup")});let emptyArea=document.getElementById("emptyarea"),mobileTogglemenu=document.getElementById("mobiletogglemenu");function hamburgerMenu(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu"),document.getElementById("burger-bar1").classList.toggle("hamburger-animation1"),document.getElementById("burger-bar2").classList.toggle("hamburger-animation2"),document.getElementById("burger-bar3").classList.toggle("hamburger-animation3")}function hidemenubyli(){document.body.classList.toggle("stopscrolling"),document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu"),document.getElementById("burger-bar1").classList.remove("hamburger-animation1"),document.getElementById("burger-bar2").classList.remove("hamburger-animation2"),document.getElementById("burger-bar3").classList.remove("hamburger-animation3")}const sections=document.querySelectorAll("section"),navLi=document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),mobilenavLi=document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");window.addEventListener("scroll",()=>{let e="";sections.forEach(t=>{let o=t.offsetTop;t.clientHeight,pageYOffset>=o-200&&(e=t.getAttribute("id"))}),mobilenavLi.forEach(t=>{t.classList.remove("activeThismobiletab"),t.classList.contains(e)&&t.classList.add("activeThismobiletab")}),navLi.forEach(t=>{t.classList.remove("activeThistab"),t.classList.contains(e)&&t.classList.add("activeThistab")})}),document.querySelectorAll('.navbar-tabs-ul a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.navbar-tabs-ul li').forEach(li => li.classList.remove('activeThistab'));
    this.parentElement.classList.add('activeThistab');
  });
}),console.log("%c Designed and Developed by Ayush Agarwal ","background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");let mybutton=document.getElementById("backtotopbutton");function scrollFunction(){document.body.scrollTop>400||document.documentElement.scrollTop>400?mybutton.style.display="block":mybutton.style.display="none"}function scrolltoTopfunction(){document.body.scrollTop=0,document.documentElement.scrollTop=0}window.onscroll=function(){scrollFunction()},document.addEventListener("contextmenu",function(e){"IMG"===e.target.nodeName&&e.preventDefault()},!1);let Pupils=document.getElementsByClassName("footer-pupil"),pupilsArr=Array.from(Pupils),pupilStartPoint=-10,pupilRangeX=20,pupilRangeY=15,mouseXStartPoint=0,mouseXEndPoint=window.innerWidth,currentXPosition=0,fracXValue=0,mouseYEndPoint=window.innerHeight,currentYPosition=0,fracYValue=0,mouseXRange=mouseXEndPoint-mouseXStartPoint;const mouseMove=e=>{fracXValue=(currentXPosition=e.clientX-mouseXStartPoint)/mouseXRange,fracYValue=(currentYPosition=e.clientY)/mouseYEndPoint;let t=pupilStartPoint+fracXValue*pupilRangeX,o=pupilStartPoint+fracYValue*pupilRangeY;pupilsArr.forEach(e=>{e.style.transform=`translate(${t}px, ${o}px)`})},windowResize=e=>{mouseXEndPoint=window.innerWidth,mouseYEndPoint=window.innerHeight,mouseXRange=mouseXEndPoint-mouseXStartPoint};window.addEventListener("mousemove",mouseMove),window.addEventListener("resize",windowResize);

// Contact form submission handler
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });
        
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField.call(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showMessage("Please fix the errors above.", "error");
                return;
            }
            
            // Show loading state
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            
            // Get form data
            const formData = new FormData(contactForm);
            const fullName = formData.get("full-name");
            const email = formData.get("email");
            const description = formData.get("description");
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                submitBtn.textContent = "Message Sent!";
                submitBtn.style.backgroundColor = "#28a745";
                submitBtn.style.opacity = "1";
                
                // Clear form
                contactForm.reset();
                clearAllErrors();
                showMessage("Thank you! Your message has been sent successfully.", "success");
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = "";
                    hideMessage();
                }, 3000);
                
                // You can add actual form submission logic here
                // For example: send to an API endpoint, email service, etc.
                console.log("Form submitted:", {fullName, email, description});
            }, 1500);
        });
        
        function validateField() {
            const field = this;
            const value = field.value.trim();
            let isValid = true;
            
            // Remove existing error
            clearFieldError(field);
            
            // Required field validation
            if (field.hasAttribute('required') && !value) {
                showFieldError(field, 'This field is required.');
                return false;
            }
            
            // Specific validations
            switch (field.type) {
                case 'email':
                    if (value && !isValidEmail(value)) {
                        showFieldError(field, 'Please enter a valid email address.');
                        isValid = false;
                    }
                    break;
                case 'text':
                    if (field.hasAttribute('minlength') && value.length < field.getAttribute('minlength')) {
                        showFieldError(field, `Minimum ${field.getAttribute('minlength')} characters required.`);
                        isValid = false;
                    }
                    break;
            }
            
            // Textarea validation
            if (field.tagName === 'TEXTAREA') {
                if (field.hasAttribute('minlength') && value.length < field.getAttribute('minlength')) {
                    showFieldError(field, `Minimum ${field.getAttribute('minlength')} characters required.`);
                    isValid = false;
                }
            }
            
            return isValid;
        }
        
        function clearErrors() {
            clearFieldError(this);
        }
        
        function showFieldError(field, message) {
            field.style.borderColor = '#ff4757';
            let errorElement = field.parentNode.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.style.color = '#ff4757';
                errorElement.style.fontSize = '0.9rem';
                errorElement.style.marginTop = '5px';
                errorElement.style.display = 'block';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }
        
        function clearFieldError(field) {
            field.style.borderColor = '';
            const errorElement = field.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
        
        function clearAllErrors() {
            inputs.forEach(clearFieldError);
        }
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        function showMessage(message, type) {
            let messageElement = document.querySelector('.form-message');
            if (!messageElement) {
                messageElement = document.createElement('div');
                messageElement.className = 'form-message';
                messageElement.style.padding = '10px 15px';
                messageElement.style.borderRadius = '5px';
                messageElement.style.marginTop = '15px';
                messageElement.style.textAlign = 'center';
                contactForm.appendChild(messageElement);
            }
            
            messageElement.textContent = message;
            messageElement.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
            messageElement.style.color = type === 'success' ? '#155724' : '#721c24';
            messageElement.style.border = type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
            messageElement.style.display = 'block';
        }
        
        function hideMessage() {
            const messageElement = document.querySelector('.form-message');
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }
    }
});