
function toast(status, time, message) {
    try {
        if (message != undefined || message != null) {
            toastr.options.newestOnTop = true;
            toastr.options.timeOut = time;
            toastr.options.extendedTimeOut = 0;
            toastr.options.progressBar = true;
            toastr.options.rtl = false;
            toastr.options.closeButton = true;
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.options.preventDuplicates = true;

            if (status == 'success') {
                toastr.success(message);
                playSuccessAudio();
            } else if (status == 'warning') {
                toastr.warning(message);
                playWarningAudio();
            } else if (status == 'info') {
                toastr.info(message);
            } else if (status == 'error') {
                toastr.error(message);
                playErrorAudio();
            }
        }
    } catch (error) {
        console.log('Toast Error: ' + error);
    }
}

// Function to play success audio
function playSuccessAudio() {
    var successAudio = document.getElementById('success-audio');
    if (documentContains(successAudio)) {
        successAudio.play();
    }
}

// Function to play error audio
function playErrorAudio() {
    var errorAudio = document.getElementById('error-audio');
    if (documentContains(errorAudio)) {
        errorAudio.play();
    }
}

// Function to play warning audio
function playWarningAudio() {
    var warningAudio = document.getElementById('warning-audio');
    if (documentContains(warningAudio)) {
        warningAudio.play();
    }
}

function cloneNodeElement(element) {
    var newElement = null;
    if (documentContains(element)) {
        newElement = element.cloneNode(true);
        element.replaceWith(newElement);
    }

    return newElement;
}

function goBack() {
    window.history.back();
}

/**
 * Appends HTML content to an element without replacing existing content.
 * @param {string} content - The HTML content to append.
 * @param {HTMLElement} element - The element to which the content will be appended.
 */
function __append_html(content, element) {
    element.innerHTML = content;
}

function documentContains(target) {
    if (target && document.body.contains(target)) {
        return true;
    }

    return false;
}

function urlParams(url = window.location.href) {
    const searchParams = new URL(url).searchParams;
    const params = {};

    for (const [key, value] of searchParams) {
        params[key] = value;
    }

    return params;
}

function paramsToQueryString(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

function UrlQueryParams(url = window.location.href) {
    const queryParams = urlParams(url); 
    const queryString = paramsToQueryString(queryParams);
    
    return queryString ? `?${queryString}` : '';
}

function win_route (route) {
    if (window.location.pathname && route == window.location.pathname) {
        return true
    }

    return false;
}

function routepath () {
    return window.location.pathname;
}

function route(path, params = null) {
    if (path.length == 0) {
        return false;
    } else {
        var queryString = '';
        if (params !== null && typeof params === 'object') {
            queryString = '?' + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
        }
        window.location.href = `${path}${queryString}`;
    }
}


