window.onload = () => {
    const button = document.querySelector('#btn');
    button.addEventListener('click', calculateBmi);
}

function calculateBmi() {
    const age = document.querySelector('#age').value;
    const gender = document.querySelector('#gender').value;
    const height = document.querySelector('#height').value;
    const weight = document.querySelector('#weight').value;
    const resultText = document.querySelector('#resultText');
    const bmiValue = document.querySelector('#bmiValue');
    const caloriesValue = document.querySelector('#caloriesValue');
    const advice = document.querySelector('#advice');
    const progress = document.querySelector('#progress');

    if (!age || isNaN(age) || age < 0 || !height || isNaN(height) || height < 0 || !weight || isNaN(weight) || weight < 0) {
        resultText.innerText = "Please provide valid input for all fields.";
        bmiValue.innerText = "Your BMI: ";
        caloriesValue.innerText = "Calories per day: ";
        advice.innerText = "";
        progress.style.width = '0';
        return;
    }

    const bmi = calculateBmiByGender(height, weight, age, gender).toFixed(2);
    const calories = calculateCaloriesPerDay(weight, height, age, gender);
    const bmiCategory = getBmiCategory(bmi);

    bmiValue.innerText = `Your BMI: ${bmi}`;
    caloriesValue.innerText = `Calories per day: ${calories.toFixed(0)}`;
    advice.innerText = getAdvice(bmiCategory);
    setProgressBarWidth(bmi);

    if (bmi < 18.5) {
        resultText.innerText = `Under Weight`;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultText.innerText = `Normal`;
    } else if (bmi >= 25 && bmi < 29.9) {
        resultText.innerText = `Over Weight`;
    } else if (bmi >= 30 && bmi < 34.9) {
        resultText.innerText = `Obesity (Class I)`;
    } else if (bmi >= 35.5 && bmi < 39.9) {
        resultText.innerText = `Obesity (Class II)`;
    } else {
        resultText.innerText = `Extreme Obesity`;
    }
}

function calculateBmiByGender(height, weight, age, gender) {
    return weight / ((height * height) / 10000);
}

function calculateCaloriesPerDay(weight, height, age, gender) {
    const bmr = (gender === 'male')
        ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    const caloriesPerDay = bmr * 1.55;

    return caloriesPerDay;
}

function getBmiCategory(bmi) {
    if (bmi < 18.5) {
        return 'underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'normal';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'overweight';
    } else if (bmi >= 30 && bmi < 34.9) {
        return 'obese1';
    } else if (bmi >= 35.5 && bmi < 39.9) {
        return 'obese2';
    } else {
        return 'extremeObese';
    }
}

function getAdvice(bmiCategory) {
    switch (bmiCategory) {
        case 'underweight':
            return 'You are underweight. It is important to consult with a healthcare professional to determine the cause and develop a plan to reach a healthy weight.';
        case 'normal':
            return 'Congratulations! You have a normal BMI. Maintain a balanced diet and regular physical activity to stay healthy.';
        case 'overweight':
            return 'You are overweight. Consider making lifestyle changes, including a balanced diet and regular exercise, to achieve and maintain a healthy weight.';
        case 'obese1':
            return 'You are in Obesity Class I. It is recommended to consult with a healthcare professional to discuss weight management strategies and make positive lifestyle changes.';
        case 'obese2':
            return 'You are in Obesity Class II. Consult with a healthcare professional for personalized advice on weight management and improving overall health.';
        case 'extremeObese':
            return 'You are in the category of extreme obesity. It is crucial to seek medical guidance for a comprehensive weight management plan.';
        default:
            return '';
    }
}

function setProgressBarWidth(bmi) {
    const progress = document.querySelector('#progress');
    const percentage = Math.min(bmi, 40) / 40 * 100; // Limiting to 40 for a better visual range
    progress.style.width = `${percentage}%`;
}