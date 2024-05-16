console.log('script loaded')

document.addEventListener('DOMContentLoaded', () => {

const submitQuestion = async (event) => {
    event.preventDefault();

const question_body = document.querySelector('#question').value;
const choice_a = document.querySelector('#answer-a').value;
const choice_b = document.querySelector('#answer-b').value;
const choice_c = document.querySelector('#answer-c').value;
const choice_d = document.querySelector('#answer-d').value;
const category_id = document.querySelector('#category').value;
const answer_value = document.querySelector('#answer').value;
const answer = document.querySelector(`#answer-${answer_value}`).value;

    if (question_body && choice_a && choice_b && choice_c && choice_d && category_id && answer) {
        try {
            const response = await fetch('api/questions/profile', {
                method: 'POST',
                body: JSON.stringify({ question_body, choice_a, choice_b, choice_c, choice_d, category_id, answer }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to Submit Question')
            }
        } catch (error) {
            console.error('Error during submission', error);
        }
    }
};

document.querySelector('#question-form').addEventListener('click', submitQuestion);

});