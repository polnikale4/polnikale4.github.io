'use strict';

var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

var nav = document.getElementsByTagName('nav')[0];
var scrollNav = document.querySelector('.navbar-fake nav');
var navBar = document.querySelector('.navbar-fake');
var navElem = document.querySelectorAll('.navbar a');
var scrollNavElem = document.querySelectorAll('.navbar-fake a');
var navListContainer = document.querySelector('.navbar ul');
var scrollNavListContainer = document.querySelector('.navbar-fake ul');
var navListElem = document.querySelectorAll('.navbar li');
var scrollNavListElem = document.querySelectorAll('.navbar-fake li');
var scrollBtn = document.querySelector('#scroll');
var span = document.querySelectorAll('span');
var openingNav = document.querySelectorAll('.opening');
var closingNav = document.querySelectorAll('.closing');
var slider = document.querySelector('.slider');
var slides = document.getElementsByClassName('slide');
var slideCounter = 0;

nav.addEventListener('click', scroll);
scrollNav.addEventListener('click', scroll);
scrollBtn.addEventListener('click', scroll);
window.addEventListener('scroll', navChangePos);
window.addEventListener('scroll', changeNavActive);
span.forEach(function (e) {
    if (e.classList.contains('opening') || e.classList.contains('closing')) e.addEventListener('click', showNav);
    if (e.classList.contains('leftArrow')) e.addEventListener('click', slideTurnLeft);
    if (e.classList.contains('rightArrow')) e.addEventListener('click', slideTurnRight);
});
window.addEventListener('resize', hideNavBtn);

function slideTurnRight() {
    slides[slideCounter].classList.remove('slide-shown');
    setTimeout(slides[slideCounter].classList.add('slide-not-displayed'), 500);
    slideCounter++;
    setTimeout(function () {
        slides[slideCounter].classList.remove('slide-not-displayed');
        setTimeout(slides[slideCounter].classList.add('slide-shown'), 250);
    }, 250);
}

function slideTurnLeft() {}

function hideNavBtn() {
    if (document.body.offsetWidth >= 960) {
        openingNav.forEach(function (e) {
            e.style.display = '';
        });
        closingNav.forEach(function (e) {
            e.style.display = '';
        });
        navListContainer.classList.remove('show');
        scrollNavListContainer.classList.remove('show');
    }
}

function showNav(event) {
    if (event.target.classList.contains('fa-bars')) {
        navListContainer.classList.add('show');
        scrollNavListContainer.classList.add('show');
        setTimeout(function () {
            openingNav.forEach(function (e) {
                e.style.display = 'none';
            });
            closingNav.forEach(function (e) {
                e.style.display = 'block';
            });
        }, 400);

        ;
    } else {
        navListContainer.classList.remove('show');
        scrollNavListContainer.classList.remove('show');
        setTimeout(function () {
            openingNav.forEach(function (e) {
                e.style.display = 'block';
            });
            closingNav.forEach(function (e) {
                e.style.display = 'none';
            });
        }, 200);
    }
}

function navChangePos() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 200) {
        navBar.classList.add('fixed');
    } else {
        navBar.classList.remove('fixed');
    }
}

function changeNavActive(event) {
    for (var i = navListElem.length - 1; i >= 0; i--) {
        if (window.pageYOffset < document.getElementById(navElem[i].getAttribute('href').slice(1)).offsetTop) continue;
        Array.prototype.forEach.call(navListElem, function (link) {
            link.classList.remove('active');
        });
        Array.prototype.forEach.call(scrollNavListElem, function (link) {
            link.classList.remove('active');
        });
        navListElem[i].classList.add('active');
        scrollNavListElem[i].classList.add('active');
        break;
    }
}

function scroll(event) {
    if (Array.prototype.indexOf.call(navElem, event.target) !== -1 || Array.prototype.indexOf.call(scrollNavElem, event.target) !== -1 || event.target.classList.contains('scroll')) {
        event.preventDefault();
        var elemScroll = document.getElementById(event.target.getAttribute('href').slice(1)).offsetTop;
        scrollingTo(window.pageYOffset, elemScroll);
    }
}

function scrollingTo(startPos, finishPos) {
    var dist = finishPos - startPos;
    var distMiddle = dist * 1 / 2;
    var distCounter = 0;

    var scrollCounter = 0;
    var counter = 1;

    var scrolling = setInterval(function () {
        window.scrollBy(0, scrollCounter);
        distCounter += scrollCounter;
        if (dist > 0) {
            if (distCounter > distMiddle) {
                scrollCounter -= 3;
            } else {
                scrollCounter += counter;
                counter++;
            }

            if (distCounter + scrollCounter >= dist && distCounter < dist) {
                scrollCounter = dist - distCounter;
            }
            if (distCounter >= dist) clearInterval(scrolling);
        } else {
            if (distCounter < distMiddle) {
                scrollCounter += 3;
            } else {
                scrollCounter -= counter;
                counter++;
            }

            if (distCounter + scrollCounter <= dist && distCounter > dist) {
                scrollCounter = dist - distCounter;
            }
            if (distCounter <= dist) clearInterval(scrolling);
        }
    }, 25);
}