const questionSubmitFormHandler = async(event) => {
        event.preventDefault();

        //Collect the values from the submission form

        const category = document.querySelector('#category-input').value.trim();
        const question = document.querySelector('#question-input').value.trim();
        const answer = document.querySelector('#answer-input').value.trim();
        const choiceA = document.querySelector('#choice-a-input').value.trim();
        const choiceB = document.querySelector('#choice-b-input').value.trim();
        const choiceC = document.querySelector('#choice-c-input').value.trim();
        const choiceD = document.querySelector('#choice-d-input').value.trim();

        //if any fields are missing values throw error
        if (!category || !question || !answer || !choiceA || !choiceB || !choiceC || !choiceD) {
                console.error("Please complete all fields");
                return;
        } else {
              const response = await fetch('/api/question', {
                method: 'POST',
                body: JSON.stringify({
                        category, question, answer, choiceA, choiceB, choiceC, choiceD }),
                        headers: {
                                'Content-Type': 'appication/json',
                        },
              });
              
              if (response.ok) {
                document.location.replace('/question');
              } else {
                alert('Failed to create question');
              }
        }
};

document.querySelector('.new-question-form').addEventListener('submit', newFormHandler);
