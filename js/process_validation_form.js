var processValidatorForm = {
    errorContainers: 'is-error',

    showErrors: function (validateResult, object) {
        for (var key in validateResult) {
            var validateNameError = key,
                errorMessage = validateResult[validateNameError].join(''),
                errorElementName = object.elements[validateNameError],
                containerErrorMessages = document.createElement('span');

            errorElementName.className += ' error';
            containerErrorMessages.className += ' ' + this.errorContainers;
            containerErrorMessages.textContent = '*' + errorElementName.name + ': ' + errorMessage;
            errorElementName.parentNode.insertBefore(containerErrorMessages, errorElementName.nextSibling);
        }
    },

    removeErrors: function (object) {
        this.removeElementsHighLight(object);
        this.removeErrorsMassages(object);
    },

    getErrorContainers: function () {
        return this.errorContainers;
    },

    setErrorContainers: function (errorContainersName) {
        return this.errorContainers = errorContainersName;
    },

    removeElementsHighLight: function (form) {
        for (var i = 0; i < form.elements.length; i++) {
            form.elements[i].classList.remove('error');
        }
    },

    removeErrorsMassages: function (object) {
        var containersErrors = object.querySelectorAll('.' + this.errorContainers);

        if (containersErrors.length) {
            for (var i = 0; i < containersErrors.length; i++) {
                containersErrors[i].parentNode.removeChild(containersErrors[i]);
            }
        }
    }
};