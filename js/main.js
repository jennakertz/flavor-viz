$(document).ready(function(){

    var statsSentence = function(course){
	var currentCourse = course;
	var sample = document.getElementById('select-'+currentCourse).getAttribute('data-sample-size');
	var course = document.getElementById('select-'+currentCourse).getAttribute('data-course');
	var spicy = document.getElementById('select-'+currentCourse).getAttribute('data-piquant');
	var sour = document.getElementById('select-'+currentCourse).getAttribute('data-sour');
	var sweet = document.getElementById('select-'+currentCourse).getAttribute('data-sweet');
	var savory = document.getElementById('select-'+currentCourse).getAttribute('data-meaty');
	var bitter = document.getElementById('select-'+currentCourse).getAttribute('data-bitter');
	var salty = document.getElementById('select-'+currentCourse).getAttribute('data-salty');

	// console.log(salty);
	
	$('#stats-sentence').removeClass(' hide');
	document.getElementById('stats-sentence').innerHTML = "";
	document.getElementById('stats-sentence').innerHTML = "<h3>There</h3><h3>were</h3><h2>" + sample + "</h2><h3>recipes</h3><h3>sampled</h3><h3>from</h3><h3>the</h3><h2>" + course + "</h2><h3>category.</h3><h3>The</h3><h3>flavor</h3><h3>averages</h3><h3>were:</h3>"

	document.getElementById('stats-box').innerHTML = "";
	document.getElementById('stats-box').innerHTML='<div class="box"><h2>' + Math.floor(spicy) + '</h2><p>Spicy</p></div><div class="box"><h2>' + Math.floor(sour) + '</h2><p>Sour</p></div><div class="box"><h2>' + Math.floor(sweet) + '</h2><p>Sweet</p></div><div class="box"><h2>' + Math.floor(savory) + '</h2><p>Savory</p></div><div class="box"><h2>' + Math.floor(bitter) + '</h2><p>Bitter</p></div><div class="box"><h2>' + Math.floor(salty) + '</h2><p>Salty</p></div><div class="box">'

    }; 

    function showElements(){
    	$('.show-elements')[0].addEventListener('click', function(){
    	    var notActiveCourseNodes = $('.flavor-wheel .node').not('.active-course');
    	    var notActiveCourseLines = $('.flavor-wheel .line').not('.active-course');

	    var allClicked = $('.btnClicked');
	    var allClickedViz = $('.active-course');

	    $('#stats-sentence').addClass(' hide');
	    $('#select-prompt').addClass(' hide');
	    $('#stats-box').addClass(' hide')
	    
	    for(i=0;i<allClicked.length;i++){
		$('#' + allClicked[i].id).removeClass('btnClicked').addClass('btn');
	    }

	    // for(i=0;i<allClickedViz.length;i++){
	    // 	this.attr('style', 'stroke-width:2px;');
	    // }

    	    for(i=0; i<notActiveCourseNodes.length; i++){
    		notActiveCourseNodes.eq(i).show(600);
    	    };
    	    for(i=0; i<notActiveCourseLines.length; i++){
    		notActiveCourseLines.eq(i).show(600);
    	    };

	    $('#select-prompt').removeClass(' hide');
	    $('.active-course').removeClass(' active-course');
    	});
    };

    var onClick = function(currentCourse){
	var currentCourse = currentCourse;
	var courseElements = document.querySelectorAll('[data-course = "' + currentCourse + '"]');
	var notCourseElementNodes = $('.flavor-wheel .node').not('[data-course = "' + currentCourse + '"]');
	var notCourseElementLines = $('.flavor-wheel .line').not('[data-course = "' + currentCourse + '"]');

	$('#select-prompt').addClass(' hide');

	for(i=0; i<courseElements.length;i++){
	    courseElements[i].classList += ' active-course'
	    $(courseElements[i]).show(600);
	    $(courseElements[i]).attr('style','stroke-width:5px;');
	}

	for(i=0; i<notCourseElementNodes.length; i++){
	    notCourseElementNodes.eq(i).hide(600);
	};
	for(i=0; i<notCourseElementLines.length; i++){
	    notCourseElementLines.eq(i).hide(600);
	};

	statsSentence(currentCourse);
    };
    
    var click = function(elements){
	elements.forEach(function(el){
	    el.addEventListener('click', function(){
		var currentCourse = this.getAttribute('data-course');
		$('#select-' + currentCourse).removeClass('btn').addClass('btnClicked');
		onClick(currentCourse);
		
		$('.show-elements')[0].setAttribute('style','pointer-events:visible');		
	    })
	})
	$('.btn').on('click',function(){
	    $('.active-course').removeClass(' active-course');
	    $('.btnClicked').removeClass('btnClicked').addClass('btn');
	    $('#' + this.id).removeClass('btn').addClass('btnClicked');

	    var currentCourse = this.getAttribute('data-course');
	    onClick(currentCourse);

	    $('.show-elements')[0].setAttribute('style', 'pointer-events:visible');
	});
    };

    
    var hover = function(elements){
	elements.forEach(function(el){
	    el.addEventListener('mouseover', function(){
		// console.log('it was clicked!');
		var currentCourse = this.getAttribute('data-course');
		var courseElements = document.querySelectorAll('[data-course = "' + currentCourse + '"]');

		for(i=0;i<courseElements.length;i++){
		    courseElements[i].setAttribute('style', 'stroke-width:5px;');
		    courseElements[i].classList += ' active-course'
		}
	    })
	    el.addEventListener ('mouseout',function(){
		var currentCourse = this.getAttribute('data-course');
		var courseElements = document.querySelectorAll('[data-course = "' + currentCourse + '"]');

		for(i=0;i<courseElements.length;i++){
		    courseElements[i].setAttribute('style', 'stroke-width:2px;');
		}
		$('.active-course').removeClass(' active-course');
	    })
	})
    };

    var waitForClick = function(){
	var nodeElements = Array.from(document.querySelectorAll('svg .node'));
	var lineElements = Array.from(document.querySelectorAll('svg .line'));

	hover(nodeElements);
	hover(lineElements);

	click(nodeElements);
	click(lineElements);
    }

    // DRAW LINKS BETWEEN NODES
    
    var drawLinks = function(category, course, color){
	var currentColor = color;
	console.log('links' + currentColor);
	var currentCourse = course;
	
	// loop through the nodemap object which identifies the sources and targets by id
	for(i=0; i<nodeMap.length; i++){

	    // grab the position for each source and target
	    var source = $(nodeMap[i].source).filter('.' + currentCourse).position();
	    var target = $(nodeMap[i].target).filter('.' + currentCourse).position();

	    // create variables for the start and end of the lines
	    // make an adjustment based on the offset created by node size and padding
	    var x1 = source.left + 3;
	    var y1 = source.top + 2;
	    var x2 = target.left + 3;
	    var y2 = target.top + 2;

	    // only create new svg if svg doesn't already exist for this particular nodelink
	    if (document.getElementById('js-nodelink-' + i) === null){
		var svg = d3.select('.flavor-wheel')
	    	    .append("svg")
	    	    .attr("width", '100%')
	    	    .attr("height", '100%')
	    	    .attr("class", "svg-nodelink")
		    .attr("id", "js-nodelink-" + i);
	    }else{
		var svg = d3.select('#js-nodelink-' + i);
	    }

	    // create a path between the start and end positions
	    var line = svg.append("g")
		.attr("width", "100%")
		.attr("height","100%")
		.append("path")
		.attr("d", "M" + x1 + "," + y1 + "L" + x2 + "," + y2)
		.attr("class", "line " + currentCourse)
		.attr("data-course", currentCourse)
		.attr("stroke", currentColor);
  	};
    };


    // PLOT FLAVOR NODES
    
    var plotFlavors = function(category, course, color){

	var currentColor = color;
	var currentCourse = course.replace(/[\s+-]/g, '-').replace(/[^\w-]/g, '').toLowerCase();
	
	// grab the flavor average for this flavor category
	// this will be the x value when we plot the average on the axis we created
	var xValue = flavorAvg;

	// create a data variable that we'll use to plot the circle on the axis
	var data = [{x: xValue, y:0}];
	
	// grab the axis width
	var width = $('.js-axis').attr('width');

	// grab the axis height
	var height = $('.js-axis').attr('height');
	
	// append new svg to the flavor-wheel class
	// for plotting flavor averages on axes

	// but only create svg if it doesn't already exist for all six flavors
	if ($('.js-node-svg').length < 6){
	    var svg = d3.select(".flavor-wheel")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "js-node-svg " + "js-" + flavorCat);
	}else{
	    var svg = d3.selectAll(".js-"+flavorCat).filter(".js-node-svg");
	};

	// append circles to the svg
	svg.append("circle")
	     // grab the data we defined earlier
	    .data(data)
	     // grab the x and y attributes from the data object to plot the circle
	    .attr("cx", function(d) { return d.x; })
	    .attr("cy", function(d) { return d.y; }) 
	    .attr("r", 3)
	     // assign this circle an id to identify that it is a node for a particular flavor
	    .attr("id", "js-node-" + flavorCat)
	    .attr("data-course", currentCourse)
	    .attr("class","node " + currentCourse + ' js-node-' + flavorCat)
	     // assign this circle a data value equal to its flavor average so that we can display this on hover
	    .attr("data-value", flavorAvg)
	    .attr('style', 'fill:' + 'white' + '; stroke:' + 'white');
    };

    // PLOT FLAVOR AXES
    
    var plotAxes = function(category, color){
	
 	// define a scale
	var scale = d3.scaleLinear()
	    .domain([0,300])
	    .range ([0,300]);

	// create an svg layer that we can append the axes to
	var svg = d3.select(".flavor-wheel")
	    .append("svg")
	    .attr("class", "js-axis " + "js-"+category)
	    .attr("width", '300px')
	    .attr("height", '50px');
	
	// ** i don't think these are needed here
	var xValue = flavorAvg;
	var data = [{x: xValue, y:0}];

	// add an axis to the .axis class for each flavor category
	d3.select(".js-"+category)
	    .call(d3.axisBottom(scale)
		  .tickArguments([5, ".1f"]))
	    .append('text')
	    .style("text-anchor", "middle")
	    .attr('font-size', '32px')
	    .attr('class', 'axis-label')
	    .attr('x', '250')
	    .attr('y','40')
	          // .parentElement.appendChild(this)
	    .text(category);

    };

    // RETURN FLAVOR STATS
    
    var returnFlavorStats = function(data, category, course, color){
	
	// start the flavor total for this category at zero
	var flavorTotal = 0;
	var recipeTotal = 0;
	
	// what is the current category?
	var currentCat = category;

	// what is the current course?
	var currentCourse = course;

	// what is the current color?
	var currentColor = color;
	
	// create a for loop to cycle through all of the requested recipes
	// and calculate the average for each flavor category
	for (i=0; i< data.matches.length;i++){

	    // this is the response for the flavors object. sometimes it's null or undefined
	    var flavorDetails = data.matches[i].flavors;

	    // this is the value of the current category for which we're calculating the average
	    var currentCatStats = 'data.matches[i].flavors.'+currentCat;

	    // check to see whether there are flavor details for this recipe
	    if(typeof flavorDetails != 'undefined' && flavorDetails != null){

		// check to see whether the current category has a value.
		// if it does, that value will be have a number datatype
		if(typeof eval(currentCatStats) === 'number'){

		    // add each recipe's current category value to the flavor total
		    flavorTotal += eval(currentCatStats);

		    // count the number of recipes that had a category value
		    recipeTotal += 1;
		};
 	    };
	};

	// calculate the flavor average
	// as the sum of the recipes' flavor values for the current category
	// divided by the number of recipes that had a flavor value for the current category
	// then scale the result to the length of the axis

	flavorAvg = (flavorTotal / recipeTotal) * 300;
	flavorCat = category;

	// if we haven't plotted axes yet, plot axes!
	if($('.js-'+flavorCat).length === 0){
	    plotAxes(flavorCat);
	};

	// LOGGING (for good measure)
	
	// // what's the current course?
	// console.log('currentCourse = ' + currentCourse)
	// // what's the flavor category we're calculating?
	// console.log('flavorCat = ' + flavorCat);
	// // what's the flavor average we've calculated for this flavor category?
	// console.log('flavorAvg (percentage) = ' + (flavorAvg / 300) * 100);
	// // how many recipes have a value for this flavor category?
	// console.log('recipeTotal = ' + recipeTotal);
	
	var addData = function(course, cat, avg, total){
	    course = course.replace(/[\s+-]/g, '-').replace(/[^\w-]/g, '').toLowerCase();
	    // console.log(course);
	    avg = (avg / 300) * 100;
	    dataCat = 'data-' + cat;
	    total = total;
	    
	    document.getElementById('select-' + course)
		.setAttribute('data-course', course)

	    document.getElementById('select-' + course)
		.setAttribute(dataCat, avg)

	    document.getElementById('select-' + course)
		.setAttribute('data-sample-size', total);
	}

	addData(currentCourse, flavorCat, flavorAvg, recipeTotal);
	
	plotFlavors(flavorCat, currentCourse, currentColor);

	
    };

    var getRecipes = function(data){

	// first clear all existing elements from the recipes container
	var recipeContainer = document.getElementById('get-recipes');
	console.log(recipeContainer);
	// recipeContainer.innerHTML = "";
	
	for(i=0;i<20;i++){
    	    var currentRecipe = data.matches[i].id;
	    var getRecipeURL = 'http://api.yummly.com/v1/api/recipe/' + currentRecipe + '?_app_id=b56772db&_app_key=8ceed2111cabd45c1913f3ca070945c5';	    
    	    $.ajax({
    		type: 'GET',
    		url: getRecipeURL
    	    }).done(function(data){
		// add elements to the recipeContainer
		// console.log(data.attribution.html);
    	    }).fail(function(error){
    		console.log('error msg: ', error);
    	    });
	}
    };

    var categoryButtons = function(courseLower, course){
    	document.getElementById('select-category').innerHTML += '<button id="select-' + courseLower + '" class="btn" data-course="' + courseLower + '"  data-sample-size="" data-sour="" data-salty="" data-sweet="" data-meaty="" data-piquant="" data-bitter="">' + course + '</div>';
    };


    var returnRecipes = function(){

	// create base url for accessing recipes by course type
	var courseBaseURL = 'https://api.yummly.com/v1/api/recipes?_app_id=b56772db&_app_key=8ceed2111cabd45c1913f3ca070945c5&q=&requirePictures=true&maxResult=500&allowedCourse[]=course^course-';

	// **
	// loop through courses to get data for each course type
	for(var i = 0; i<courses.length; ++i){
	    function courseCycle (i){
		var currCourse = courses[i];
		// console.log(currCourse);
		$.ajax({
    		    type: 'GET',
		    url: courseBaseURL + currCourse
    		}).done(function(data, flavor, course){
		    var colors = ['#26547C', '#EF476F', '#FFD166', '#06D6A0', '#88498F']
		    var randColor = colors[Math.floor(Math.random() * colors.length)];
		    var currCourseLower = currCourse.replace(/[\s+-]/g, '-').replace(/[^\w-]/g, '').toLowerCase();

		    categoryButtons(currCourseLower, currCourse);
    		    returnFlavorStats(data, 'salty', currCourse, randColor);
    		    returnFlavorStats(data, 'sweet', currCourse, randColor);
    		    returnFlavorStats(data, 'bitter', currCourse, randColor);
    		    returnFlavorStats(data, 'meaty', currCourse, randColor);
    		    returnFlavorStats(data, 'sour', currCourse, randColor);
    		    returnFlavorStats(data, 'piquant', currCourse, randColor);
    		    drawLinks(flavorCat, currCourseLower, randColor);
		    console.log('done loading!');
		    waitForClick();
		    showElements();
		    // use getRecipes to get the recipe details so i can display them at the bottom of the page
		    getRecipes(data);
		    // debugger;
    		}).fail(function(error){
    		    console.log('error msg: ', error);
    		});
		
	    };
	    
	    courseCycle(i);

	};
	
    };

    // get json data from the nodemap file, which maps relations between
    // source and target nodes 
    $.getJSON("https://github.com/jennakertz/flavor-viz/blob/master/js/nodes.json", function(json) {
	// console.log(json); // this will show the info it in firebug console
	nodeMap = json.links
    });

    // create a variable called set_metadata
    // the jsonp response from yummly's metadata api is wrapped in "set_metadata();"
    // so using a variable with this name, we can evaluate the response directly
    // without wrapping it in a function
    var set_metadata = function(type,data) {

	// get the course metadata so we can allow filtering / selction by course type
	if (type === 'course'){
	    var courses = [];
	    for(var i = 0; i < data.length; ++i) {
		courses.push(data[i].description);
	    }
	    // define global var named courses
	    window.courses = courses;

	    returnRecipes();
	    // console.log(courses[0]);
	    
	}
    };

    // call the yummly api to get course metadata
    $.getJSON('https://api.yummly.com/v1/api/metadata/course?_app_id=b56772db&_app_key=8ceed2111cabd45c1913f3ca070945c5?callback=set_metadata', null, function(data) {
	//Callback function set_metadata is called upon success
    }).fail(function(error){
	// this seems to consistently fail, but we can get the response text from the response error
	// evaluate the error response text using the set_metadata function defined above
	eval(error.responseText);
    });


    $( window ).resize(function(i) {
	// debugger;
	console.log('resizing!');
	$('g').remove();
	// redrawLinks();
	for(i=0;i<courses.length;i++){
	    var currCourse = courses[i];
	    var colors = ['#26547C', '#EF476F', '#FFD166', '#06D6A0', '#88498F']
	    var randColor = colors[Math.floor(Math.random() * colors.length)];

	    drawLinks(flavorCat, currCourse.replace(/[\s+-]/g, '-').replace(/[^\w-]/g, '').toLowerCase(), randColor);
	}
	waitForClick();
    });

});


