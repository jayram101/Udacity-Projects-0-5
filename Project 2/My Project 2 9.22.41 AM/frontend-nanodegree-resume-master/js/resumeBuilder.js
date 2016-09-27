// You can enter any Javascript you want to try out in here //

/*
This is empty on purpose! Your code to build the resume will go here.
 */

/*Validated JSON*/


var bioj =
{
    "bio": {
        "name": "Jay Ramanathan",
        "role": "Data Scientist",
        "contacts": {
            "mobile": "614-565-4187",
            "email": "jayram101@gmail.com",
            "github": "jayram101",
            "location": "Columbus, U.S."
        },
        "welcomeMessage": "Welcome to my site",
        "skills": [
            "workflow innovation",
            "data science",
            "project-based teaching"
        ],
        "biopic": "images/app.jpg",
        "display": "bio function taking no parameters"
    },
    "education": {
        "schools": [
            {
                "name": "Purdue",
                "location": "Lafayette",
                "degree": "M.S",
                "majors": [
                    "Physics",
                    "Math",
                    "Computer Science"
                ],
                "dates": "1972",
                "url": "https://www.en.wikipedia.org/wiki/Purdue_University"
            },
            {
                "name": "Rice",
                "location": "Houston",
                "degree": "Ph.D.",
                "majors": [
                    "Computer Science"
                ],
                "dates": "1977",
                "url": "https://www.en.wikipedia.org/wiki/Rice_University"
            }
        ],
        "onlineCourses": [
            {
                "title": "Front-end Apprentice",
                "School": "Udacity",
                "date": "2016",
                "url": "https://www.udacity.com/"
            }
        ],
        "display": "education function taking no parameters"
    },
    "work": {
        "jobs": [
            {
                "employer": "University of Houston",
                "title": "Asst. Prof.",
                "location": "Houston",
                "dates": "1977-1979",
                "description": "Researcher"
            },
            {
                "employer": "Concentus",
                "title": "Founder",
                "location": "Columbus",
                "dates": "1986-2000",
                "description": "Entreprenuer"
            }
        ],
        "display": "jobs function taking no parameters"
    },
    "projects": {
        "project": [
            {
                "title": "Raytheon",
                "dates": "1997-1999",
                "description": "CORBA Workflow",
                "images": ["images/Cosmos03.jpg"]
            },
            {
                "title": "CHASE",
                "dates": "1996-1997",
                "description": "Client-server workflows",
                "images": ["images/loanWorkflow.jpg"]
            }
        ],
        "display": "project function taking no parameters"
    }
}


bioj.bio.display = function ()
{
var formattedName = HTMLheaderName.replace("%data%", bioj.bio.name);
var formattedRole =  HTMLheaderRole.replace("%data%", bioj.bio.role);
var formattedcontactGeneric = HTMLcontactGeneric.replace("%contact%","Get in touch");
var formattedcontactGeneric = HTMLcontactGeneric.replace("%data%","2015");
var formattedmobile = HTMLmobile.replace("%data%", bioj.bio.contacts.mobile);
var formattedemail = HTMLemail.replace("%data%", bioj.bio.contacts.email);
var formattedtwitter = HTMLtwitter.replace("%data%",bioj.bio.contacts.twitter);
var formattedgithub = HTMLgithub.replace("%data%",bioj.bio.contacts.github);
var formattedblog = HTMLblog.replace("%data%",bioj.bio.contacts.blog);
var formattedlocation = HTMLlocation.replace("%data%", bioj.bio.contacts.location);
var formattedbioPic = HTMLbioPic.replace("%data%",bioj.bio.biopic);
var formattedwelcomeMsg = HTMLwelcomeMsg.replace("%data%", bioj.bio.welcomeMessage);
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);
$("#topContacts").append(formattedmobile);
$("#topContacts").append(formattedemail);
$("#topContacts").append(formattedtwitter);
$("#topContacts").append(formattedgithub);
$("#topContacts").append(formattedblog);
$("#topContacts").append(formattedlocation);
$("#topContacts").append(formattedbioPic);
$("#topContacts").append(formattedwelcomeMsg);


var j = bioj.bio.skills.length;
if (j>0)
    {
        $("#header").append(HTMLskillsStart);
        for (var i = 0; i<j; i++)
            { var formattedskills = HTMLskills.replace("%data%",bioj.bio.skills[i])
        $("#skills").append(formattedskills);
    };
};

};


bioj.work.display = function ()
{
var job =  bioj.work.jobs.length;
if (job > 0) {
$("#workExperience").append(HTMLworkStart);

for (joball in bioj.work.jobs)
{
var formattedworkEmployer = HTMLworkEmployer.replace("%data%", bioj.work.jobs[joball].employer).concat(HTMLworkTitle.replace("%data%", bioj.work.jobs[joball].title));
$("#workExperience").append(formattedworkEmployer);
var formattedworkDates = HTMLworkDates.replace("%data%", bioj.work.jobs[joball].dates);
$("workExperience").append(formattedworkDates);
var formattedworkLocation = HTMLworkLocation.replace("%data%",bioj.work.jobs[joball].location);
$("workExperience").append(formattedworkLocation);
var formattedworkDescription = HTMLworkDescription.replace("%data%",bioj.work.jobs[joball].description);
$("workExperience").append(formattedworkDescription);
};
};
};

bioj.education.display = function () {
var j = bioj.education.schools.length;

if (j>0) {

$("#education").append(HTMLschoolStart);

for (school in bioj.education.schools)
{
var formattedschoolName = HTMLschoolName.replace("%data%", bioj.education.schools[school].name);
$("#education").append(formattedschoolName);
var formattedschoolLocation = HTMLschoolLocation.replace("%data%", bioj.education.schools[school].location);
$("#education").append(formattedschoolLocation);
var formattedschoolDegree = HTMLschoolDegree.replace("%data%", bioj.education.schools[school].degree);
$("#education").append(formattedschoolDegree);
var formattedschoolMajor = HTMLschoolMajor.replace("%data%", bioj.education.schools[school].majors);
$("#education").append(formattedschoolMajor);
var formattedschoolDates = HTMLschoolDates.replace("%data%", bioj.education.schools[school].dates);
$("#education").append(formattedschoolDates);
};
};
for (course in bioj.education.onlineCourses)
{
$("#education").append(HTMLonlineClasses);
var formattedonlineTitleSchool = HTMLonlineTitle.replace("%data%", bioj.education.onlineCourses[course].title).concat(HTMLonlineSchool.replace("%data%",bioj.education.onlineCourses[course].School));
$("#education").append(formattedonlineTitleSchool);
var formattedonlineDates = HTMLonlineDates.replace("%data%", bioj.education.onlineCourses[course].date);
$("#education").append(formattedonlineDates);
var formattedonlineURL = HTMLonlineURL.replace("%data%", bioj.education.onlineCourses[course].url);
$("#education").append(formattedonlineURL);
};
};

bioj.projects.display = function () {
    if (bioj.projects.project.length > 0) {
    $("#projects").append(HTMLprojectStart);
    //proceed if there are projects
    for (project_i in bioj.projects.project) {
    var formattedprojectTitle = HTMLprojectTitle.replace("%data%", bioj.projects.project[project_i].title);
    $("#projects").append(formattedprojectTitle);
    var formattedprojectDates = HTMLprojectDates.replace("%data%", bioj.projects.project[project_i].dates);
    $("#projects").append(formattedprojectDates);
    var formattedprojectDescription = HTMLprojectDescription.replace("%data%", bioj.projects.project[project_i].description);
    $("#projects").append(formattedprojectDescription);
    var formattedprojectImage = HTMLprojectImage.replace("%data%",bioj.projects.project[project_i].images);
     $("#projects").append(formattedprojectImage);
};
};
};



function inName () {
    var name = bioj.bio.name;
    name = name.trim().split(" ");
    name[1] = name[1].toUpperCase();
    name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();
    return name[0] + " " + name[1];
};



bioj.bio.display ();

bioj.education.display ();

bioj.work.display ();

bioj.projects.display ();

$("#main").append(internationalizeButton);


$("#mapDiv").append(googleMap);





