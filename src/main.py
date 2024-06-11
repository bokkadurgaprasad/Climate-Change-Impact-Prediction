from flask import Flask, render_template, request
import numpy as np
import joblib

app = Flask(__name__)

model = joblib.load('Climate-Change-Impact-Prediction/model/Climate_Change_Model.pkl')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/input')
def input_page():
    return render_template('input.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        date = request.form['date']
        dewptm = float(request.form['_dewptm'])
        fog = int(request.form['_fog'])
        hail = int(request.form['_hail'])
        heatindexm = float(request.form['_heatindexm'])
        hum = float(request.form['_hum'])
        pressurem = float(request.form['_pressurem'])
        tempm = float(request.form['_tempm'])

        import datetime
        date = datetime.datetime.strptime(date, '%Y-%m-%d')
        year = date.year
        month = date.month
        day = date.day

        features = np.array([[dewptm, fog, hail, heatindexm, hum, pressurem, tempm, year, month, day]])

        prediction = model.predict(features)

        prediction_text = prediction[0]
        
        return render_template('result.html', prediction=prediction_text)

if __name__ == '__main__':
    app.run(debug=True)
