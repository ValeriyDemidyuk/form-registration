var validator = {
    functionPrefix: 'data-validate',
    errors: [],
    customValidators: {},
    errorMessages: {
        validateName: 'can consist of English and Russian letters',
        validateSurname: 'can consist of English and Russian letters',
        validateLastName: 'can consist of English and Russian letters',
        validatePassword: 'may contain letters and numbers',
        validateEmail: 'must contain the "@" symbol',
        validatePhone: 'number must begin with "(+38)',
        validateNumber: 'must contain only digits'
    },

    validate: function (obj) {
        var objectElements = obj.elements;
        this.errors = [];

        for (var i = 0; i < objectElements.length; i++) {
            var objectElement = objectElements[i];

            if (!this.hasValidateClass(objectElement)) {
                continue;
            }
            var validateElementResult = this.validateElement(objectElement);

            if (validateElementResult == true) {
                continue;
            }

            if (!Array.isArray(this.errors[objectElement.name])) {
                this.errors[objectElement.name] = [];
            }

            this.errors[objectElement.name] = validateElementResult;
        }
        //return true;
        return Object.keys(this.errors).length ? this.errors : true;
    },

    validateElement: function (element) {
        var validateFunctionNames = this.getValidateFunctionNames(element);
        var elementErrors = [];

        for (var validateFunctionName in validateFunctionNames) {
            var validateFunctionParam = validateFunctionNames[validateFunctionName];

            if (typeof (this[validateFunctionName]) === 'function') {

                if (this[validateFunctionName](element.value, validateFunctionParam) !== true) {
                    elementErrors.push(this[validateFunctionName](element.value, validateFunctionParam))
                }
            } else {
                if (typeof (this.customValidators[validateFunctionName]) === 'function') {

                    if (this.customValidators[validateFunctionName](element.value, validateFunctionParam) !== true) {
                        elementErrors.push(this.customValidators[validateFunctionName](element.value, validateFunctionParam));
                    }
                } else {
                    console.log('is not a function: ' + validateFunctionName)
                }
            }
        }

        return elementErrors.length ? elementErrors : true;
    },

    getValidateFunctionNames: function (element) {
        var validateFunctionNames = [];
        var validateClassNames = element.getAttribute(this.functionPrefix).split(' ');

        for (var i = 0; i < validateClassNames.length; i++) {
            var validateClassName = validateClassNames[i].split('-');
            var validateFunctionName = this.functionPrefix.slice(5);

            for (var y = 1; y < validateClassName.length; y++) {
                var functionSuffix = validateClassName[y];

                if (isNaN(functionSuffix)) {
                    validateFunctionName += functionSuffix[0].toUpperCase() + functionSuffix.slice(1);

                } else {
                    var validateFunctionParam = functionSuffix;
                }
            }
            validateFunctionNames[validateFunctionName] = validateFunctionParam || null;
        }

        return validateFunctionNames;
    },

    hasValidateClass: function (element) {
        return (!!(element.getAttribute(this.functionPrefix)));
    },

    validateName: function (name) {
        if (!(/^[a-zA-Zа-яА-Я]+$/.test(name))) {
            return this.errorMessages.validateName + '\n';
        }
        return true;
    },

    validateSurname: function (surname) {
        if (!(/^[a-zA-Zа-яА-Я]+$/.test(surname))) {
            return this.errorMessages.validateSurname + '\n';
        }
        return true;
    },

    validateLastName: function (surname) {
        if (!(/^[a-zA-Zа-яА-Я]+$/.test(surname))) {
            return this.errorMessages.validateLastName + '\n';
        }
        return true;
    },

    validatePassword: function (password) {
        if (!(/^[a-zA-Zа-яА-Я0-9]+$/.test(password))) {
            return this.errorMessages.validatePassword + '\n';
        }
        return true;
    },

    validateEmail: function (email) {
        if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email)) {
            return this.errorMessages.validateEmail + '\n';
        }
        return true;
    },

    validatePhone: function (phone) {
        if (!/^\+380[0-9]*$/.test(phone)) {
            return this.errorMessages.validatePhone + '\n';
        }
        return true;
    },

    validateMinLength: function (value, minValueLength) {
        if (value.length >= minValueLength) {
            return true;
        }
        return ' must contain at least ' + minValueLength + ' characters \n';
    },

    validateMaxLength: function (value, maxValueLength) {
        if (value.length <= maxValueLength) {
            return true;
        }
        return ' must not be longer than ' + maxValueLength + ' characters \n';
    },

    validateNumber: function (value) {
        if (isNaN(value) || !value.length) {
            return this.errorMessages.validateNumber + '\n';
        }
        return true;
    },

    addValidateFunction: function (nameValidateFunction, func) {
        if (typeof(func) === "function") {
            this.customValidators[nameValidateFunction] = func;
        } else {
            console.log('is not a function')
        }
    },

    addErrorMassage: function (nameFunction, errorMassage) {
        this.errorMessages[nameFunction] = errorMassage;
    }
};





