if (!Util)
    function Util() {};

Util.addClass = function(element: any, className: any) {
    let classList = className.split(' ');
    
    element.classList.add(classList[0]);

    if (classList.length > 1)
        Util.addClass(element, classList.slice(1).join(' '));
};

Util.removeClass = function(element: any, className: any) {
    let classList = className.split(' ');

    element.classList.remove(classList[0]);

    if (classList.length > 1)
        Util.removeClass(element, classList.slice(1).join(' '));
};

Util.toggleClass = function(element: any, className: any, bool: boolean) {
    if (bool)
        Util.addClass(element, className);
    else
        Util.removeClass(element, className);
};

Util.moveFocus = function(element: any) {
    if (!element)
        element = document.getElementsByTagName('body')[0];

    element.focus();

    if (document.activeElement !== element) {
        element.setAttribute('tabindex', '-1');
        element.focus();
    }
};

Util.getIndexInArray = function(array: any, element: any) {
    return Array.prototype.indexOf.call(array, element);
};

let Picker = function(this: any, element: any) {
    this.element = element;
    this.select = this.element.getElementsByTagName('select')[0];
    this.options = this.select.getElementsByTagName('option');
    this.selectedOption = getSelectedOptionText(this);
    this.pickerId = this.select.getAttribute('id');
    this.trigger = false;
    this.dropdown = false;
    this.firstLanguage = false;
    this.arrowSvgPath = '<svg viewBox="0 0 16 16"><polygon points="3,5 8,11 13,5 "></polygon></svg>';
    this.globeSvgPath = '<svg viewBox="0 0 16 16"><path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M13.9,7H12c-0.1-1.5-0.4-2.9-0.8-4.1 C12.6,3.8,13.6,5.3,13.9,7z M8,14c-0.6,0-1.8-1.9-2-5H10C9.8,12.1,8.6,14,8,14z M6,7c0.2-3.1,1.3-5,2-5s1.8,1.9,2,5H6z M4.9,2.9 C4.4,4.1,4.1,5.5,4,7H2.1C2.4,5.3,3.4,3.8,4.9,2.9z M2.1,9H4c0.1,1.5,0.4,2.9,0.8,4.1C3.4,12.2,2.4,10.7,2.1,9z M11.1,13.1 c0.5-1.2,0.7-2.6,0.8-4.1h1.9C13.6,10.7,12.6,12.2,11.1,13.1z"></path></svg>';

    initLanguagePicker(this);
    initLanguagePickerEvents(this);
}

function initLanguagePicker(picker: any) {
    picker.element.insertAdjacentHTML(
        'beforeend', 
        initButtonPicker(picker) + initListPicker(picker)
    );
    picker.dropdown = picker.element.getElementsByClassName('language-pick-dropdown')[0];
    picker.languages = picker.dropdown.getElementsByClassName('language-pick-item');
    picker.firstLanguage = picker.languages[0];
    picker.trigger = picker.element.getElementsByClassName('language-pick-button')[0];
}

function initLanguagePickerEvents(picker: any) {
    let svgs = picker.trigger.getElementsByTagName('svg');
    
    Util.addClass(svgs[0], 'li4-icon');
    Util.addClass(svgs[1], 'li4-icon');
    initLanguageSelection(picker);

    picker.trigger.addEventListener('click', function() {
        toggleLanguagePicker(picker, false);
    });
    picker.dropdown.addEventListener('keydown', function(event: any) {
        if (event.key && event.key.toLowerCase() == 'arrowup')
            keyboardNavigatePicker(picker, 'prev');
        else if (event.key && event.key.toLowerCase() == 'arrowdown')
            keyboardNavigatePicker(picker, 'next');
    });
}

function toggleLanguagePicker(picker: any, bool: boolean) {
    let ariaExpanded = false;

    if (bool)
        ariaExpanded = bool;
    else
        ariaExpanded = picker.trigger.getAttribute('aria-expanded') == 'true' ? false : true;

    picker.trigger.setAttribute('aria-expanded', ariaExpanded);

    if (ariaExpanded) {
        picker.firstLanguage.focus();
        picker.dropdown.addEventListener('transitionend', function cb() {
            picker.firstLanguage.focus();
            picker.dropdown.removeEventListener('transitionend', cb);
        });

        placeDropdown(picker);
    }
}

function placeDropdown(picker: any) {
    let triggerBoundingRect = picker.trigger.getBoundingClientRect();

    Util.toggleClass(picker.dropdown, 'language-pick-dropdown-right', (window.innerWidth < triggerBoundingRect.left + picker.dropdown.offsetWidth));
    Util.toggleClass(picker.dropdown, 'language-pick-dropdown-up', (window.innerHeight < triggerBoundingRect.bottom + picker.dropdown.offsetHeight));
}

function checkLanguagePickerClick(picker: any, target: any) {
    if (!picker.element.contains(target))
        toggleLanguagePicker(picker, false);
}

function moveFocusToPickerTrigger(picker: any) {
    if (picker.trigger.getAttribute('aria-expanded') == 'false')
        return;
    if (document.activeElement?.closest('.language-pick-dropdown') == picker.dropdown)
        picker.trigger.focus();
}

function initButtonPicker(picker: any) {
    let customClasses = picker.element.getAttribute('data-trigger-class') ? ' ' + picker.element.getAttribute('data-trigger-class'): '';
    let button = '<button class="language-pick-button"' + customClasses + '" aria-label="' + picker.select.value + ' ' + picker.element.getElementsByTagName('label')[0].textContent + '" aria-expanded="false" aria-controls="' + picker.pickerId + '-dropdown">';

    button += '<span aria-hidden="true" class="language-pick-label language-pick-flag language-pick-flag-' + picker.select.value + '">' + picker.globeSvgPath + '<em>' + picker.selectedOption + '</em>';
    button += picker.arrowSvgPath + '</span>';

    return button + '</button>';
}

function initListPicker(picker: any) {
    let list = '<div class="language-pick-dropdown" aria-describedBy="' + picker.pickerId + '-description" id="' + picker.pickerId + '-dropdown">';

    list += '<p class="li4-sr-only" id="' + picker.pickerId + '-description">' + picker.element.getElementsByTagName('label')[0].textContent + '</p>';
    list += '<ul class="language-pick-list" role="listbox">';

    for (let i = 0; i < picker.options.length; i++) {
        let selected = picker.options[i].selected ? 'aria-selected="true"' : '',
            language = picker.options[i].getAttribute('lang');
        
        list += '<li><a lang="' + language + '" hreflang="' + language + '" href="' + getLanguageUrl(picker.options[i]) + '"' + selected + ' role="option" data-value="' + picker.options[i].value + '" class="language-pick-item language-pick-flag language-pick-flag-' + picker.options[i].value + '"><span>' + picker.options[i].text + '</span></a></li>';
    }

    return list;
}

function getSelectedOptionText(picker: any) {
    let label = '';

    if ('selectedIndex' in picker.select)
        label = picker.options[picker.select.selectedIndex].text;
    else
        label = picker.select.querySelector('option[selected]').text;

    return label;
}

function getLanguageUrl(_option: any) {
    return 'index.html';
}

function initLanguageSelection(picker: any) {
    picker.element.getElementsByClassName('language-pick-list')[0].addEventListener('click', function(event: any) {
        let language = event.target.closest('.language-pick-item');

        if (!language)
            return;

        if (language.hasAtribute('aria-selected') && language.getAttribute('aria-selected') == 'true') {
            event.preventDefault();
            picker.trigger.setAttribute('aria-expanded', 'false');
        } else {
            event.preventDefault();
            picker.element.getElementsByClassName('language-pick-list')[0].querySelector('[aria-selected="true"]').removeAttribute('aria-selected');
            language.setAttribute('aria-selected', 'true');
            picker.trigger.getElementsByClassName('language-pick-label')[0].setAttribute('class', 'language-pick-label language-pick-flag language-pick-flag-' + language.getAttribute('data-value'));
            picker.trigger.getElementsByClassName('language-pick-label')[0].getElementsByTagName('em')[0].textContent = language.textContent;
            picker.trigger.setAttribute('aria-expanded', 'false');
        }
    });
}

function keyboardNavigatePicker(picker: any, direction: string) {
    let index = Util.getIndexInArray(picker.languages, document.activeElement);

    index = (direction == 'next') ? index + 1 : index - 1;
    
    if (index < 0)
        index = picker.languages.length - 1;
    if (index >= picker.languages.length)
        index = 0;

    Util.moveFocus(picker.languages[index]);
}

let languagePicker = document.getElementsByClassName('js-language-pick');
let pickerArray: any = [];

if (languagePicker.length > 0) {
    for (let i = 0; i < languagePicker.length; i++) {
        (
            function(i: number) {
                pickerArray.push(new (Picker as any)(languagePicker[i]));
            }
        )(i);
    }

    window.addEventListener('keyup', function(event: any) {
        if (event.key && event.key.toLowerCase() == 'escape') {
            pickerArray.forEach(function(element : any) {
                moveFocusToPickerTrigger(element);
                toggleLanguagePicker(element, false);
            });
        }
    });
    
    window.addEventListener('click', function(event : any) {
        pickerArray.forEach(function(element : any) {
            checkLanguagePickerClick(element, event.target);
        });
    })

}