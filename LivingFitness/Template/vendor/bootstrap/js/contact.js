function sendMail() {
    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
            'key': 'baee0f2242203a4dbfa5e157c485094b-us18',
            'message': {
                'from_email': 'sambrunner96@gmail.com',
                'to': [
                    {
                        'email': 'sambrunner96@gmail.com',
                        'name': 'Sam',
                        'type': 'to'
                    }
                ],
                'autotext': 'true',
                'subject': 'Contact info from',
                'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
            }
        }
    }).done(function (response) {
        console.log(response); // if you're into that sorta thing
    });
}