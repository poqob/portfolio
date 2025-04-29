from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='assets',  # This tells Flask where static files are located
            template_folder='templates')  # This tells Flask where templates are located

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cv')
def download_cv():
    # Assuming you have a CV file in a 'files' directory
    return send_from_directory('content', 'cv.pdf')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)