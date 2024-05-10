from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/respuesta', methods=['GET','POST'])
def respuestaP():

    res = None
    operacion = None
    num1 = None
    num2 = None
    nombreOpe = None

    if request.method == 'POST':
        numero1 = float(request.form['num1'])
        numero2 = float(request.form['num2'])
        option = request.form['op']
        
        if option == 'suma':
            res = numero1 + numero2
            operacion = f'{numero1} + {numero2}'
            nombreOpe = 'Suma'
        elif option == 'resta':
            res = numero1 - numero2
            operacion = f'{numero1} - {numero2}'
            nombreOpe = 'Resta'
        elif option == 'mul':
            res = numero1 * numero2
            operacion = f'{numero1} * {numero2}'
            nombreOpe = 'Multiplicación'
        elif option == 'dev':
            operacion = f'{numero1} / {numero2}'
            res = numero1 / numero2
            nombreOpe = 'División'

        num1 = numero1
        num2 = numero2

    return render_template('resultado.html', resa=res, operation=operacion, num1=num1, num2=num2, nombreOpe=nombreOpe)
if __name__=='__main__':
    app.run(debug=True, port=5000)

