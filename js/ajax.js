var ajaxManager = {
    sendAjax: function (form, handleData, handleErrors) {
        $.ajax({
            url: form.action,
            type: form.method ? form.method : 'POST',
            data: $(form).serialize(),
            dataType: 'json',
            cache: false,

            beforeSend: function () {
                var button = document.querySelector('button');
                button.textContent = 'SENDING...';
            },

            success: function (data) {
                handleData(data);
            },

            error: function () {
                handleErrors();
            },

            complete: function () {
                var button = document.querySelector('button');
                button.textContent = 'REGISTRATION';
            }
        });
    }
};
