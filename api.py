from flask import Flask, request, render_template
app = Flask(__name__)

from chatbot import *

import speech_recognition as sr
import pyttsx3


def answer(ques):

    answer = chat(ques)

    return answer

def speechh():     
    r = sr.Recognizer()

    with sr.Microphone() as source:
        print("Speak Anything :")
        audio = r.listen(source)
        try:
            text = r.recognize_google(audio)
            return text
        except:
            return "Sorry could not recognize what you said"
@app.route("/speechToText",methods = ["POST","GET"])
def speechToText():
    print("agagagagagagga")
    x = speechh()

    question = x
    print("x",x)
    
    getAnswer = answer(question)
    engine = pyttsx3.init() 
    engine.say(str(getAnswer))
    engine.runAndWait()
    return {"ques":question,"ans":getAnswer}


@app.route("/send_and_receive", methods=["POST"])
def send_answer():
    question = request.form['text']
    getAnswer = answer(question)
    engine = pyttsx3.init() 
    engine.say(str(getAnswer))
    engine.runAndWait()
    return getAnswer

@app.route('/')
def home():
    return  render_template('chatbot.html')

@app.route('/doctors', methods=["GET"])
def doctors():
    return  render_template('doctors.html')

@app.route('/lab', methods=["GET"])
def lab():
    return  render_template('laboratory.html')

@app.route('/instructions', methods=["GET"])
def instructions():
    return  render_template('instructions.html')

   
    
if __name__ == '__main__':
    app.run(debug=True, port = 5050)
